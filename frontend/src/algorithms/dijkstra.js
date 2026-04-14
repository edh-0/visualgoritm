/**
 * Алгоритм Дейкстры (поиск кратчайших путей во взвешенном графе)
 */
import { getCurrentWeightedGraph, getRandomStartNode } from './weightedRandomGraph';

export const dijkstraCode = [
  { line: 1, code: 'function dijkstra(graph, startNode) {' },
  { line: 2, code: '  const distances = {};' },
  { line: 3, code: '  const visited = new Set();' },
  { line: 4, code: '  const previous = {};' },
  { line: 5, code: '  const pq = new PriorityQueue();' },
  { line: 6, code: '  ' },
  { line: 7, code: '  for (let node in graph) {' },
  { line: 8, code: '    distances[node] = Infinity;' },
  { line: 9, code: '  }' },
  { line: 10, code: '  distances[startNode] = 0;' },
  { line: 11, code: '  pq.enqueue(startNode, 0);' },
  { line: 12, code: '  ' },
  { line: 13, code: '  while (!pq.isEmpty()) {' },
  { line: 14, code: '    const { node, dist } = pq.dequeue();' },
  { line: 15, code: '    if (visited.has(node)) continue;' },
  { line: 16, code: '    visited.add(node);' },
  { line: 17, code: '    ' },
  { line: 18, code: '    for (const neighbor of graph[node]) {' },
  { line: 19, code: '      const newDist = dist + neighbor.weight;' },
  { line: 20, code: '      if (newDist < distances[neighbor.node]) {' },
  { line: 21, code: '        distances[neighbor.node] = newDist;' },
  { line: 22, code: '        previous[neighbor.node] = node;' },
  { line: 23, code: '        pq.enqueue(neighbor.node, newDist);' },
  { line: 24, code: '      }' },
  { line: 25, code: '    }' },
  { line: 26, code: '  }' },
  { line: 27, code: '  return { distances, previous };' },
  { line: 28, code: '}' }
];

// Вспомогательная приоритетная очередь
class PriorityQueue {
  constructor() {
    this.items = [];
  }
  
  enqueue(node, priority) {
    this.items.push({ node, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }
  
  dequeue() {
    if (this.items.length === 0) return null;
    return this.items.shift();
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  peek() {
    return this.items[0];
  }
}

export function dijkstraSteps(graphData = null, startNode = null) {
  let graph, nodes;
  
  if (graphData) {
    graph = graphData.graph;
    nodes = graphData.nodes;
  } else {
    const current = getCurrentWeightedGraph();
    graph = current.graph;
    nodes = current.nodes;
  }
  
  const nodeCount = nodes.length;
  
  if (startNode === null || startNode >= nodeCount) {
    startNode = getRandomStartNode(nodeCount);
  }
  
  const steps = [];
  
  // Инициализация
  const distances = {};
  const visited = new Set();
  const previous = {};
  const pq = new PriorityQueue();
  
  for (let i = 0; i < nodeCount; i++) {
    distances[i] = Infinity;
    previous[i] = null;
  }
  distances[startNode] = 0;
  pq.enqueue(startNode, 0);
  
  // Начальное состояние
  steps.push({
    graph: { nodes, edges: graph },
    distances: { ...distances },
    visitedNodes: [],
    currentNode: null,
    previous: { ...previous },
    description: `🚀 Начинаем алгоритм Дейкстры с узла ${startNode} (${nodes[startNode].label})`,
    codeLine: 1,
    variables: { startNode, distances: { ...distances }, visited: [] }
  });
  
  steps.push({
    graph: { nodes, edges: graph },
    distances: { ...distances },
    visitedNodes: [],
    currentNode: null,
    previous: { ...previous },
    description: `📊 Устанавливаем расстояние до стартового узла = 0, остальным = ∞`,
    codeLine: 10,
    variables: { startNode, distances: { ...distances } }
  });
  
  while (!pq.isEmpty()) {
    const { node, priority: dist } = pq.dequeue();
    
    if (visited.has(node)) continue;
    
    visited.add(node);
    
    steps.push({
      graph: { nodes, edges: graph },
      distances: { ...distances },
      visitedNodes: [...visited],
      currentNode: node,
      previous: { ...previous },
      description: `📍 Извлекаем узел ${node} (${nodes[node].label}) с расстоянием = ${dist}`,
      codeLine: 14,
      variables: { currentNode: node, distance: dist, distances: { ...distances } }
    });
    
    const neighbors = graph[node] || [];
    
    for (const neighbor of neighbors) {
      const newDist = dist + neighbor.weight;
      const neighborId = neighbor.node;
      
      steps.push({
        graph: { nodes, edges: graph },
        distances: { ...distances },
        visitedNodes: [...visited],
        currentNode: node,
        previous: { ...previous },
        description: `🔍 Проверяем соседа ${neighborId} (${nodes[neighborId].label}): расстояние через ${node} = ${dist} + ${neighbor.weight} = ${newDist}`,
        codeLine: 18,
        variables: { currentNode: node, neighbor: neighborId, weight: neighbor.weight, newDist }
      });
      
      if (newDist < distances[neighborId]) {
        distances[neighborId] = newDist;
        previous[neighborId] = node;
        pq.enqueue(neighborId, newDist);
        
        steps.push({
          graph: { nodes, edges: graph },
          distances: { ...distances },
          visitedNodes: [...visited],
          currentNode: node,
          previous: { ...previous },
          description: `✅ Найден более короткий путь к ${neighborId} (${nodes[neighborId].label}): ${newDist}`,
          codeLine: 21,
          variables: { currentNode: node, neighbor: neighborId, newDistance: newDist, distances: { ...distances } }
        });
      } else {
        steps.push({
          graph: { nodes, edges: graph },
          distances: { ...distances },
          visitedNodes: [...visited],
          currentNode: node,
          previous: { ...previous },
          description: `⏭️ Расстояние ${newDist} не лучше текущего ${distances[neighborId]}, пропускаем`,
          codeLine: 24,
          variables: { currentNode: node, neighbor: neighborId }
        });
      }
    }
  }
  
  // Финальное состояние
  const distancesArray = Object.entries(distances).map(([id, d]) => ({
    node: nodes[parseInt(id)].label,
    distance: d === Infinity ? '∞' : d
  }));
  
  steps.push({
    graph: { nodes, edges: graph },
    distances: { ...distances },
    visitedNodes: [...visited],
    currentNode: null,
    previous: { ...previous },
    description: `✅ Алгоритм Дейкстры завершен! Кратчайшие расстояния от ${nodes[startNode].label}: ${distancesArray.map(d => `${d.node}:${d.distance}`).join(', ')}`,
    codeLine: 27,
    variables: { distances: { ...distances }, previous: { ...previous }, totalVisited: visited.size }
  });
  return steps;
}

export const dijkstraInfo = {
  name: "Алгоритм Дейкстры",
  type: "weightedGraph",
  timeComplexity: "O((V + E) log V)",
  spaceComplexity: "O(V)",
  description: "Находит кратчайшие пути от стартовой вершины до всех остальных во взвешенном графе с неотрицательными весами."
};

export const dijkstraTheory = {
  title: "🛣️ Алгоритм Дейкстры (Dijkstra's Algorithm)",
  principle: "Жадный алгоритм для поиска кратчайших путей от стартовой вершины до всех остальных во взвешенном графе с неотрицательными весами.",
  steps: [
    "1. Устанавливаем расстояние до стартовой вершины = 0, до остальных = ∞",
    "2. Помещаем стартовую вершину в приоритетную очередь",
    "3. Извлекаем вершину с наименьшим расстоянием",
    "4. Отмечаем её как посещённую",
    "5. Для каждого соседа вычисляем новое расстояние через текущую вершину",
    "6. Если новое расстояние меньше известного — обновляем и добавляем в очередь",
    "7. Повторяем шаги 3-6, пока очередь не опустеет"
  ],
  pros: [
    "✅ Находит кратчайшие пути во взвешенных графах",
    "✅ Оптимален для графов с неотрицательными весами",
    "✅ Широко используется в навигационных системах"
  ],
  cons: [
    "❌ Не работает с отрицательными весами",
    "❌ Требует приоритетную очередь для эффективной работы",
    "❌ Может быть медленным на очень больших графах"
  ],
  example: "Поиск кратчайшего пути от A до D: A→B(2)→D(3) = 5, а не A→D(10) = 10",
  whenToUse: "Навигаторы, маршрутизация в сетях, оптимизация путей, GPS-системы.",
  visualHint: "Зелёные узлы — посещены. Синий — текущий. Числа на рёбрах — веса. Числа над узлами — текущие расстояния."
};
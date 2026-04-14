/**
 * BFS (Обход в ширину) для графа
 */
import { getRandomStartNode, getCurrentGraph } from './randomGraph';

export const bfsCode = [
  { line: 1, code: 'function BFS(graph, startNode) {' },
  { line: 2, code: '  const visited = new Set();' },
  { line: 3, code: '  const queue = [startNode];' },
  { line: 4, code: '  visited.add(startNode);' },
  { line: 5, code: '  while (queue.length > 0) {' },
  { line: 6, code: '    const node = queue.shift();' },
  { line: 7, code: '    console.log(node);' },
  { line: 8, code: '    for (const neighbor of graph[node]) {' },
  { line: 9, code: '      if (!visited.has(neighbor)) {' },
  { line: 10, code: '        visited.add(neighbor);' },
  { line: 11, code: '        queue.push(neighbor);' },
  { line: 12, code: '      }' },
  { line: 13, code: '    }' },
  { line: 14, code: '  }' },
  { line: 15, code: '}' }
];

export function bfsSteps(graphData = null, startNode = null) {
  // Используем переданный граф или текущий
  let graph, nodes;
  
  if (graphData) {
    graph = graphData.graph;
    nodes = graphData.nodes;
  } else {
    const current = getCurrentGraph();
    graph = current.graph;
    nodes = current.nodes;
  }
  
  const nodeCount = nodes.length;
  
  if (startNode === null || startNode >= nodeCount) {
    startNode = getRandomStartNode(nodeCount);
  }
  
  const steps = [];
  const visited = new Set();
  const queue = [startNode];
  const visitedOrder = [];
  
  steps.push({
    graph: { nodes, edges: graph },
    visitedNodes: [],
    queueNodes: [startNode],
    currentNode: null,
    description: `🌲 Начинаем обход графа в ширину с узла ${startNode} (${nodes[startNode].label})`,
    codeLine: 1,
    variables: { startNode, queue: [startNode], visited: [], nodeCount }
  });
  
  visited.add(startNode);
  visitedOrder.push(startNode);
  
  steps.push({
    graph: { nodes, edges: graph },
    visitedNodes: [startNode],
    queueNodes: [startNode],
    currentNode: null,
    description: `📌 Помещаем узел ${startNode} (${nodes[startNode].label}) в очередь и отмечаем как посещенный`,
    codeLine: 4,
    variables: { startNode, queue: [startNode], visited: [startNode] }
  });
  
  while (queue.length > 0) {
    const node = queue.shift();
    
    steps.push({
      graph: { nodes, edges: graph },
      visitedNodes: [...visitedOrder],
      queueNodes: [...queue],
      currentNode: node,
      description: `🔄 Извлекаем узел ${node} (${nodes[node].label}) из очереди и обрабатываем его`,
      codeLine: 6,
      variables: { currentNode: node, queue: [...queue] }
    });
    
    const neighbors = graph[node] || [];
    
    for (const neighbor of neighbors) {
      steps.push({
        graph: { nodes, edges: graph },
        visitedNodes: [...visitedOrder],
        queueNodes: [...queue],
        currentNode: node,
        description: `🔍 Проверяем соседа ${neighbor} (${nodes[neighbor].label}) узла ${node} (${nodes[node].label})`,
        codeLine: 8,
        variables: { currentNode: node, neighbor, queue: [...queue] }
      });
      
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        visitedOrder.push(neighbor);
        queue.push(neighbor);
        
        steps.push({
          graph: { nodes, edges: graph },
          visitedNodes: [...visitedOrder],
          queueNodes: [...queue],
          currentNode: node,
          description: `✅ Добавляем узел ${neighbor} (${nodes[neighbor].label}) в очередь и отмечаем как посещенный`,
          codeLine: 10,
          variables: { currentNode: node, neighbor, queue: [...queue], visited: [...visitedOrder] }
        });
      } else {
        steps.push({
          graph: { nodes, edges: graph },
          visitedNodes: [...visitedOrder],
          queueNodes: [...queue],
          currentNode: node,
          description: `⏭️ Узел ${neighbor} (${nodes[neighbor].label}) уже посещен, пропускаем`,
          codeLine: 12,
          variables: { currentNode: node, neighbor, visited: [...visitedOrder] }
        });
      }
    }
  }
  
  steps.push({
    graph: { nodes, edges: graph },
    visitedNodes: visitedOrder,
    queueNodes: [],
    currentNode: null,
    description: `✅ Обход в ширину завершен! Посещено ${visitedOrder.length} из ${nodeCount} узлов. Порядок: ${visitedOrder.map(v => nodes[v].label).join(' → ')}`,
    codeLine: 14,
    variables: { visitedOrder, totalNodes: visitedOrder.length }
  });
  
  return steps;
}

export const bfsInfo = {
  name: "BFS (Обход в ширину)",
  type: "graph",
  timeComplexity: "O(V + E)",
  spaceComplexity: "O(V)",
  description: "Алгоритм обхода графа, который посещает все вершины, постепенно расширяя границу от стартовой вершины."
};

export const bfsTheory = {
  title: "🌐 BFS (Обход в ширину)",
  principle: "Обходит граф в ширину: сначала все соседи стартовой вершины, затем их соседи и так далее. Использует очередь.",
  steps: [
    "1. Помещаем стартовую вершину в очередь и отмечаем как посещённую",
    "2. Извлекаем вершину из очереди и обрабатываем её",
    "3. Все непосещённые соседи добавляются в очередь",
    "4. Отмечаем их как посещённые",
    "5. Повторяем шаги 2-4, пока очередь не опустеет"
  ],
  pros: [
    "✅ Находит кратчайший путь в невзвешенном графе",
    "✅ Полный обход (посетит все достижимые вершины)",
    "✅ Линейная сложность O(V+E)",
    "✅ Простая реализация"
  ],
  cons: [
    "❌ Требует много памяти (хранит всю очередь)",
    "❌ Не находит кратчайший путь во взвешенных графах",
    "❌ Может быть медленным в очень широких графах"
  ],
  example: "BFS находит кратчайший путь от стартовой вершины до всех остальных.",
  whenToUse: "Поиск кратчайшего пути в лабиринте, социальные сети (друзья друзей), веб-краулеры, анализ сетей.",
  visualHint: "Зелёные узлы — посещены. Жёлтые — в очереди. Синий — текущий обрабатываемый узел."
};

// Для обратной совместимости
const initialGraph = getCurrentGraph();
export const sampleGraph = initialGraph.graph;
export const graphNodes = initialGraph.nodes;
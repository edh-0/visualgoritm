/**
 * BFS (Обход в ширину) для графа
 */

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

// Пример графа для визуализации
export const sampleGraph = {
  0: [1, 2],
  1: [0, 3, 4],
  2: [0, 5],
  3: [1],
  4: [1, 5],
  5: [2, 4]
};

export const graphNodes = [
  { id: 0, label: 'A', x: 100, y: 100 },
  { id: 1, label: 'B', x: 300, y: 50 },
  { id: 2, label: 'C', x: 300, y: 200 },
  { id: 3, label: 'D', x: 500, y: 50 },
  { id: 4, label: 'E', x: 500, y: 150 },
  { id: 5, label: 'F', x: 500, y: 250 }
];

export function bfsSteps(graph = sampleGraph, startNode = 0) {
  const steps = [];
  const visited = new Set();
  const queue = [startNode];
  const visitedOrder = [];
  
  // Начальное состояние
  steps.push({
    graph: { nodes: graphNodes, edges: graph },
    visitedNodes: [],
    queueNodes: [startNode],
    currentNode: null,
    description: `Начинаем обход графа в ширину с узла ${startNode}`,
    codeLine: 1,
    variables: { startNode, queue: [startNode], visited: [] }
  });
  
  visited.add(startNode);
  visitedOrder.push(startNode);
  
  steps.push({
    graph: { nodes: graphNodes, edges: graph },
    visitedNodes: [startNode],
    queueNodes: [startNode],
    currentNode: null,
    description: `Помещаем узел ${startNode} в очередь и отмечаем как посещенный`,
    codeLine: 4,
    variables: { startNode, queue: [startNode], visited: [startNode] }
  });
  
  while (queue.length > 0) {
    const node = queue.shift();
    
    steps.push({
      graph: { nodes: graphNodes, edges: graph },
      visitedNodes: visitedOrder,
      queueNodes: [...queue],
      currentNode: node,
      description: `Извлекаем узел ${node} из очереди и обрабатываем его`,
      codeLine: 6,
      variables: { currentNode: node, queue: [...queue] }
    });
    
    // Получаем соседей
    const neighbors = graph[node] || [];
    
    for (const neighbor of neighbors) {
      steps.push({
        graph: { nodes: graphNodes, edges: graph },
        visitedNodes: visitedOrder,
        queueNodes: [...queue],
        currentNode: node,
        description: `Проверяем соседа ${neighbor} узла ${node}`,
        codeLine: 8,
        variables: { currentNode: node, neighbor, queue: [...queue] }
      });
      
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        visitedOrder.push(neighbor);
        queue.push(neighbor);
        
        steps.push({
          graph: { nodes: graphNodes, edges: graph },
          visitedNodes: visitedOrder,
          queueNodes: [...queue],
          currentNode: node,
          description: `✅ Добавляем узел ${neighbor} в очередь и отмечаем как посещенный`,
          codeLine: 10,
          variables: { currentNode: node, neighbor, queue: [...queue], visited: [...visitedOrder] }
        });
      } else {
        steps.push({
          graph: { nodes: graphNodes, edges: graph },
          visitedNodes: visitedOrder,
          queueNodes: [...queue],
          currentNode: node,
          description: `Узел ${neighbor} уже посещен, пропускаем`,
          codeLine: 12,
          variables: { currentNode: node, neighbor, visited: [...visitedOrder] }
        });
      }
    }
  }
  
  // Финальное состояние
  steps.push({
    graph: { nodes: graphNodes, edges: graph },
    visitedNodes: visitedOrder,
    queueNodes: [],
    currentNode: null,
    description: `✅ Обход в ширину завершен! Порядок обхода: ${visitedOrder.join(' → ')}`,
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
  
  example: "Старт A: A → B, C → D, E, F\n\n" +
    "Порядок обхода: A → B → C → D → E → F",
  
  whenToUse: "Поиск кратчайшего пути в лабиринте, социальные сети (друзья друзей), веб-краулеры, анализ сетей.",
  
  visualHint: "Зелёные узлы — посещены. Жёлтые — в очереди. Синий — текущий обрабатываемый узел."
};
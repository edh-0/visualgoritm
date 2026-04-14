/**
 * DFS (Обход в глубину) для графа
 */

export const dfsCode = [
  { line: 1, code: 'function DFS(graph, startNode, visited = new Set()) {' },
  { line: 2, code: '  visited.add(startNode);' },
  { line: 3, code: '  console.log(startNode);' },
  { line: 4, code: '  for (const neighbor of graph[startNode]) {' },
  { line: 5, code: '    if (!visited.has(neighbor)) {' },
  { line: 6, code: '      DFS(graph, neighbor, visited);' },
  { line: 7, code: '    }' },
  { line: 8, code: '  }' },
  { line: 9, code: '}' }
];

// Тот же граф, что и для BFS
export const dfsGraph = {
  0: [1, 2],
  1: [0, 3, 4],
  2: [0, 5],
  3: [1],
  4: [1, 5],
  5: [2, 4]
};

export const dfsNodes = [
  { id: 0, label: 'A', x: 100, y: 100 },
  { id: 1, label: 'B', x: 300, y: 50 },
  { id: 2, label: 'C', x: 300, y: 200 },
  { id: 3, label: 'D', x: 500, y: 50 },
  { id: 4, label: 'E', x: 500, y: 150 },
  { id: 5, label: 'F', x: 500, y: 250 }
];

export function dfsSteps(graph = dfsGraph, startNode = 0) {
  const steps = [];
  const visited = new Set();
  const visitedOrder = [];
  let stackTrace = [];
  
  function dfsRecursive(node, depth = 0) {
    visited.add(node);
    visitedOrder.push(node);
    
    steps.push({
      graph: { nodes: dfsNodes, edges: graph },
      visitedNodes: [...visitedOrder],
      currentNode: node,
      stack: [...stackTrace],
      description: `Посещаем узел ${node} на глубине ${depth}`,
      codeLine: 2,
      variables: { currentNode: node, depth, visited: [...visitedOrder], stack: [...stackTrace] }
    });
    
    const neighbors = graph[node] || [];
    
    for (const neighbor of neighbors) {
      steps.push({
        graph: { nodes: dfsNodes, edges: graph },
        visitedNodes: [...visitedOrder],
        currentNode: node,
        stack: [...stackTrace],
        description: `Проверяем соседа ${neighbor} узла ${node}`,
        codeLine: 4,
        variables: { currentNode: node, neighbor, depth }
      });
      
      if (!visited.has(neighbor)) {
        stackTrace.push(neighbor);
        steps.push({
          graph: { nodes: dfsNodes, edges: graph },
          visitedNodes: [...visitedOrder],
          currentNode: node,
          stack: [...stackTrace],
          description: `→ Рекурсивно обходим ${neighbor}`,
          codeLine: 6,
          variables: { currentNode: node, neighbor, depth: depth + 1 }
        });
        dfsRecursive(neighbor, depth + 1);
        stackTrace.pop();
      } else {
        steps.push({
          graph: { nodes: dfsNodes, edges: graph },
          visitedNodes: [...visitedOrder],
          currentNode: node,
          stack: [...stackTrace],
          description: `Узел ${neighbor} уже посещён, пропускаем`,
          codeLine: 7,
          variables: { currentNode: node, neighbor }
        });
      }
    }
  }
  
  // Начальное состояние
  steps.push({
    graph: { nodes: dfsNodes, edges: graph },
    visitedNodes: [],
    currentNode: null,
    stack: [],
    description: `Начинаем обход графа в глубину с узла ${startNode}`,
    codeLine: 1,
    variables: { startNode }
  });
  
  dfsRecursive(startNode);
  
  // Финальное состояние
  steps.push({
    graph: { nodes: dfsNodes, edges: graph },
    visitedNodes: visitedOrder,
    currentNode: null,
    stack: [],
    description: `✅ Обход в глубину завершен! Порядок: ${visitedOrder.join(' → ')}`,
    codeLine: 8,
    variables: { visitedOrder, totalNodes: visitedOrder.length }
  });
  
  return steps;
}

export const dfsInfo = {
  name: "DFS (Обход в глубину)",
  type: "graph",
  timeComplexity: "O(V + E)",
  spaceComplexity: "O(V)",
  description: "Алгоритм обхода графа, который идёт вглубь по одному пути, прежде чем возвращаться."
};

export const dfsTheory = {
  title: "🌐 DFS (Обход в глубину)",
  principle: "Идёт вглубь по одному пути, пока не достигнет тупика, затем возвращается и ищет другие пути.",
  steps: [
    "1. Посещаем стартовую вершину и отмечаем её",
    "2. Рекурсивно обходим каждого непосещённого соседа",
    "3. Когда нет непосещённых соседей — возвращаемся назад",
    "4. Продолжаем, пока все вершины не будут посещены"
  ],
  pros: [
    "✅ Простая рекурсивная реализация",
    "✅ Требует меньше памяти, чем BFS (стек, а не очередь)",
    "✅ Хорош для поиска в глубину (лабиринты, задачи с возвратом)",
    "✅ Может найти любой путь (не обязательно кратчайший)"
  ],
  cons: [
    "❌ Не находит кратчайший путь",
    "❌ Может зациклиться при неправильной обработке",
    "❌ Рекурсия может переполнить стек на очень глубоких графах"
  ],
  example: "Старт A: A → B → D → E → F → C\n\n" +
    "Порядок обхода: A → B → D → E → F → C",
  whenToUse: "Поиск пути в лабиринте, проверка связности графа, топологическая сортировка, поиск компонент.",
  visualHint: "Зелёные узлы — посещены. Синий — текущий узел. Показывает путь в глубину."
};
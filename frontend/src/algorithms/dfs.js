/**
 * DFS (Обход в глубину) для графа
 */
import { getRandomStartNode, getCurrentGraph } from './randomGraph';

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

export function dfsSteps(graphData = null, startNode = null) {
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
  const visitedOrder = [];
  let stackTrace = [];
  
  function dfsRecursive(node, depth = 0) {
    visited.add(node);
    visitedOrder.push(node);
    
    steps.push({
      graph: { nodes, edges: graph },
      visitedNodes: [...visitedOrder],
      currentNode: node,
      stack: [...stackTrace],
      description: `📌 Посещаем узел ${node} (${nodes[node].label}) на глубине ${depth}`,
      codeLine: 2,
      variables: { currentNode: node, depth, visited: [...visitedOrder], stack: [...stackTrace] }
    });
    
    const neighbors = graph[node] || [];
    
    for (const neighbor of neighbors) {
      steps.push({
        graph: { nodes, edges: graph },
        visitedNodes: [...visitedOrder],
        currentNode: node,
        stack: [...stackTrace],
        description: `🔍 Проверяем соседа ${neighbor} (${nodes[neighbor].label}) узла ${node} (${nodes[node].label})`,
        codeLine: 4,
        variables: { currentNode: node, neighbor, depth }
      });
      
      if (!visited.has(neighbor)) {
        stackTrace.push(neighbor);
        steps.push({
          graph: { nodes, edges: graph },
          visitedNodes: [...visitedOrder],
          currentNode: node,
          stack: [...stackTrace],
          description: `⬇️ Рекурсивно обходим ${neighbor} (${nodes[neighbor].label})`,
          codeLine: 6,
          variables: { currentNode: node, neighbor, depth: depth + 1 }
        });
        dfsRecursive(neighbor, depth + 1);
        stackTrace.pop();
      } else {
        steps.push({
          graph: { nodes, edges: graph },
          visitedNodes: [...visitedOrder],
          currentNode: node,
          stack: [...stackTrace],
          description: `⏭️ Узел ${neighbor} (${nodes[neighbor].label}) уже посещён, пропускаем`,
          codeLine: 7,
          variables: { currentNode: node, neighbor }
        });
      }
    }
  }
  
  steps.push({
    graph: { nodes, edges: graph },
    visitedNodes: [],
    currentNode: null,
    stack: [],
    description: `🌲 Начинаем обход графа в глубину с узла ${startNode} (${nodes[startNode].label})`,
    codeLine: 1,
    variables: { startNode, nodeCount }
  });
  
  dfsRecursive(startNode);
  
  steps.push({
    graph: { nodes, edges: graph },
    visitedNodes: visitedOrder,
    currentNode: null,
    stack: [],
    description: `✅ Обход в глубину завершен! Посещено ${visitedOrder.length} из ${nodeCount} узлов. Порядок: ${visitedOrder.map(v => nodes[v].label).join(' → ')}`,
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
    "✅ Хорош для поиска в глубину (лабиринты, задачи с возвратом)"
  ],
  cons: [
    "❌ Не находит кратчайший путь",
    "❌ Может зациклиться при неправильной обработке",
    "❌ Рекурсия может переполнить стек на очень глубоких графах"
  ],
  example: "DFS идёт вглубь по одному пути, затем возвращается и идёт по другому.",
  whenToUse: "Поиск пути в лабиринте, проверка связности графа, топологическая сортировка.",
  visualHint: "Зелёные узлы — посещены. Синий — текущий узел. Показывает путь в глубину."
};

// Для обратной совместимости
const initialGraph = getCurrentGraph();
export const dfsGraph = initialGraph.graph;
export const dfsNodes = initialGraph.nodes;
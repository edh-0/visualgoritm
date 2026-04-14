/**
 * Генерация случайных взвешенных графов для алгоритма Дейкстры
 */

let currentWeightedGraphCache = null;

// Получить текущий взвешенный граф
export function getCurrentWeightedGraph() {
  if (!currentWeightedGraphCache) {
    currentWeightedGraphCache = generateRandomWeightedGraph();
  }
  return currentWeightedGraphCache;
}

// Генерация случайного взвешенного графа
export function generateRandomWeightedGraph(nodeCount = 6, edgeDensity = 0.4) {
  // Создаём узлы
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    id: i,
    label: String.fromCharCode(65 + i)
  }));
  
  // Создаём пустой граф (список смежности с весами)
  const graph = {};
  for (let i = 0; i < nodeCount; i++) {
    graph[i] = [];
  }
  
  // Добавляем случайные рёбра с весами от 1 до 20
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      if (Math.random() < edgeDensity) {
        const weight = Math.floor(Math.random() * 19) + 1; // вес от 1 до 20
        graph[i].push({ node: j, weight });
        graph[j].push({ node: i, weight });
      }
    }
  }
  
  // Убеждаемся, что граф связный
  ensureGraphIsConnected(graph, nodeCount);
  
  // Сортируем соседей для консистентности
  for (let i = 0; i < nodeCount; i++) {
    graph[i].sort((a, b) => a.node - b.node);
  }
  
  const result = { graph, nodes };
  currentWeightedGraphCache = result;
  console.log('🔄 Сгенерирован новый взвешенный граф:', result);
  return result;
}

// Проверка связности графа
function ensureGraphIsConnected(graph, nodeCount) {
  // Создаём невзвешенную версию для проверки связности
  const unweightedGraph = {};
  for (let i = 0; i < nodeCount; i++) {
    unweightedGraph[i] = graph[i].map(edge => edge.node);
  }
  
  const visited = new Array(nodeCount).fill(false);
  const components = [];
  
  for (let i = 0; i < nodeCount; i++) {
    if (!visited[i]) {
      const component = [];
      dfsForComponents(i, unweightedGraph, visited, component);
      components.push(component);
    }
  }
  
  // Соединяем компоненты
  for (let i = 1; i < components.length; i++) {
    const fromNode = components[0][0];
    const toNode = components[i][0];
    const weight = Math.floor(Math.random() * 19) + 1;
    
    if (!graph[fromNode].some(edge => edge.node === toNode)) {
      graph[fromNode].push({ node: toNode, weight });
      graph[toNode].push({ node: fromNode, weight });
    }
  }
}

function dfsForComponents(node, graph, visited, component) {
  visited[node] = true;
  component.push(node);
  
  for (const neighbor of graph[node]) {
    if (!visited[neighbor]) {
      dfsForComponents(neighbor, graph, visited, component);
    }
  }
}

// Обновить граф
export function refreshWeightedGraph(nodeCount = 6, edgeDensity = 0.4) {
  const newGraph = generateRandomWeightedGraph(nodeCount, edgeDensity);
  currentWeightedGraphCache = newGraph;
  return newGraph;
}

// Получить случайный стартовый узел
export function getRandomStartNode(nodeCount) {
  return Math.floor(Math.random() * nodeCount);
}

// Настройки для генерации
export const WEIGHTED_GRAPH_PRESETS = {
  SPARSE: { name: '🔗 Разреженный', density: 0.25 },
  RANDOM: { name: '🎲 Случайный', density: 0.4 },
  DENSE: { name: '🕸 Плотный', density: 0.6 }
};

export { generateRandomWeightedGraph as generateNewWeightedGraph };
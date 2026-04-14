/**
 * Генерация случайного графа
 */

let currentGraphCache = null;

// Получить текущий граф из кэша (или сгенерировать новый)
export function getCurrentGraph() {
  if (!currentGraphCache) {
    currentGraphCache = generateRandomGraph();
  }
  return currentGraphCache;
}

// Установить текущий граф (для обновления)
export function setCurrentGraph(graphData) {
  currentGraphCache = graphData;
  return currentGraphCache;
}

// Генерация случайного графа
export function generateRandomGraph(nodeCount = 8, edgeDensity = 0.3) {
  // Создаём узлы
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    id: i,
    label: String.fromCharCode(65 + i)
  }));
  
  // Создаём пустой граф
  const graph = {};
  for (let i = 0; i < nodeCount; i++) {
    graph[i] = [];
  }
  
  // Добавляем случайные рёбра
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      if (Math.random() < edgeDensity) {
        graph[i].push(j);
        graph[j].push(i);
      }
    }
  }
  
  // Убеждаемся, что граф связный
  ensureGraphIsConnected(graph, nodeCount);
  
  // Перемешиваем порядок соседей
  for (let i = 0; i < nodeCount; i++) {
    graph[i] = shuffleArray(graph[i]);
  }
  
  const result = { graph, nodes };
  currentGraphCache = result;
  console.log('🔄 Сгенерирован новый граф:', result);
  return result;
}

// Функция для принудительного обновления графа
export function refreshGraph(nodeCount = 8, edgeDensity = 0.3) {
  const newGraph = generateRandomGraph(nodeCount, edgeDensity);
  currentGraphCache = newGraph;
  return newGraph;
}

// Проверка связности графа
function ensureGraphIsConnected(graph, nodeCount) {
  const visited = new Array(nodeCount).fill(false);
  const components = [];
  
  for (let i = 0; i < nodeCount; i++) {
    if (!visited[i]) {
      const component = [];
      dfsForComponents(i, graph, visited, component);
      components.push(component);
    }
  }
  
  for (let i = 1; i < components.length; i++) {
    const fromNode = components[0][0];
    const toNode = components[i][0];
    
    if (!graph[fromNode].includes(toNode)) {
      graph[fromNode].push(toNode);
      graph[toNode].push(fromNode);
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

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Генератор случайного дерева
export function generateRandomTree(nodeCount = 8) {
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    id: i,
    label: String.fromCharCode(65 + i)
  }));
  
  const graph = {};
  for (let i = 0; i < nodeCount; i++) {
    graph[i] = [];
  }
  
  const used = new Set([0]);
  const unused = new Set(Array.from({ length: nodeCount }, (_, i) => i).slice(1));
  
  while (unused.size > 0) {
    const fromNode = Array.from(used)[Math.floor(Math.random() * used.size)];
    const toNode = Array.from(unused)[Math.floor(Math.random() * unused.size)];
    
    graph[fromNode].push(toNode);
    graph[toNode].push(fromNode);
    
    used.add(toNode);
    unused.delete(toNode);
  }
  
  const result = { graph, nodes };
  currentGraphCache = result;
  return result;
}

export function generateRandomDenseGraph(nodeCount = 8) {
  return generateRandomGraph(nodeCount, 0.6);
}

export function generateRandomSparseGraph(nodeCount = 8) {
  return generateRandomGraph(nodeCount, 0.15);
}

export function getRandomStartNode(nodeCount) {
  return Math.floor(Math.random() * nodeCount);
}

export const GRAPH_PRESETS = {
  TREE: { name: '🌲 Дерево', generator: generateRandomTree, density: 'min' },
  SPARSE: { name: '🔗 Разреженный', generator: generateRandomSparseGraph, density: 'low' },
  RANDOM: { name: '🎲 Случайный', generator: generateRandomGraph, density: 'medium' },
  DENSE: { name: '🕸 Плотный', generator: generateRandomDenseGraph, density: 'high' }
};

// Экспорт алиаса (только то, что ещё не экспортировано)
export { generateRandomGraph as generateNewGraph };
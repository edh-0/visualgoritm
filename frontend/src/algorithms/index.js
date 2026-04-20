// Централизованный импорт и экспорт всех алгоритмов

// Сортировки
import { bubbleSortSteps, bubbleSortInfo, bubbleSortCode, bubbleSortTheory } from './bubbleSort';
import { selectionSortSteps, selectionSortInfo, selectionSortCode, selectionSortTheory } from './selectionSort';
import { insertionSortSteps, insertionSortInfo, insertionSortCode, insertionSortTheory } from './insertionSort';
import { quickSortSteps, quickSortInfo, quickSortCode, quickSortTheory } from './quickSort';

// Поиск
import { binarySearchSteps, binarySearchInfo, binarySearchCode, binarySearchTheory } from './binarySearch';
import { linearSearchSteps, linearSearchInfo, linearSearchCode, linearSearchTheory } from './linearSearch';

// Графы
import { bfsSteps, bfsInfo, bfsCode, bfsTheory } from './bfs';
import { dfsSteps, dfsInfo, dfsCode, dfsTheory } from './dfs';
import { dijkstraSteps, dijkstraInfo, dijkstraCode, dijkstraTheory } from './dijkstra';

// Экспорт сортировок
export { bubbleSortSteps, bubbleSortInfo, bubbleSortCode, bubbleSortTheory };
export { selectionSortSteps, selectionSortInfo, selectionSortCode, selectionSortTheory };
export { insertionSortSteps, insertionSortInfo, insertionSortCode, insertionSortTheory };
export { quickSortSteps, quickSortInfo, quickSortCode, quickSortTheory };

// Экспорт поиска
export { binarySearchSteps, binarySearchInfo, binarySearchCode, binarySearchTheory };
export { linearSearchSteps, linearSearchInfo, linearSearchCode, linearSearchTheory };

// Экспорт графов
export { bfsSteps, bfsInfo, bfsCode, bfsTheory };
export { dfsSteps, dfsInfo, dfsCode, dfsTheory };

// Объект со всеми алгоритмами
export const algorithms = {
  // Сортировки
  bubble: {
    type: 'sorting',
    name: "Пузырьковая сортировка",
    function: bubbleSortSteps,
    info: bubbleSortInfo,
    code: bubbleSortCode,
    theory: bubbleSortTheory
  },
  selection: {
    type: 'sorting',
    name: "Сортировка выбором",
    function: selectionSortSteps,
    info: selectionSortInfo,
    code: selectionSortCode,
    theory: selectionSortTheory
  },
  insertion: {
    type: 'sorting',
    name: "Сортировка вставками",
    function: insertionSortSteps,
    info: insertionSortInfo,
    code: insertionSortCode,
    theory: insertionSortTheory
  },
  quick: {
    type: 'sorting',
    name: "Быстрая сортировка",
    function: quickSortSteps,
    info: quickSortInfo,
    code: quickSortCode,
    theory: quickSortTheory
  },
  // Поиск
  binarySearch: {
    type: 'search',
    name: "Бинарный поиск",
    function: (arr) => binarySearchSteps(arr),
    info: binarySearchInfo,
    code: binarySearchCode,
    theory: binarySearchTheory,
    needsTarget: true
  },
  linearSearch: {
    type: 'search',
    name: "Линейный поиск",
    function: (arr) => linearSearchSteps(arr),
    info: linearSearchInfo,
    code: linearSearchCode,
    theory: linearSearchTheory,
    needsTarget: true
  },
  // Графы
  bfs: {
    type: 'graph',
    name: "BFS (Обход в ширину)",
    function: (graphData) => bfsSteps(graphData),
    info: bfsInfo,
    code: bfsCode,
    theory: bfsTheory,
    isGraph: true
  },
  dfs: {
    type: 'graph',
    name: "DFS (Обход в глубину)",
    function: (graphData) => dfsSteps(graphData),
    info: dfsInfo,
    code: dfsCode,
    theory: dfsTheory,
    isGraph: true
  },
  dijkstra: {
    type: 'weightedGraph',
    name: "Алгоритм Дейкстры",
    function: (graphData) => dijkstraSteps(graphData),
    info: dijkstraInfo,
    code: dijkstraCode,
    theory: dijkstraTheory,
    isGraph: true,
    isWeighted: true
  }
};

// Категории алгоритмов для выбора
export const algorithmCategories = [
  {
    id: 'sorting',
    name: '📊 Сортировка',
    algorithms: ['bubble', 'selection', 'insertion', 'quick']
  },
  {
    id: 'search',
    name: '🔍 Поиск',
    algorithms: ['binarySearch', 'linearSearch']
  },
  {
    id: 'graph',
    name: '🕸️ Графы',
    algorithms: ['bfs', 'dfs', 'dijkstra']
  }
];

// Массив доступных алгоритмов для выпадающего списка
export const algorithmList = [
  //сортировки
  { id: 'bubble', label: '🫧 Пузырьковая сортировка' },
  { id: 'selection', label: '🎯 Сортировка выбором' },
  { id: 'insertion', label: '📥 Сортировка вставками' },
  { id: 'quick', label: '⚡ Быстрая сортировка' },
  //поиск
  { id: 'binarySearch', label: '🎯 Бинарный поиск', category: 'search' },
  { id: 'linearSearch', label: '🔍 Линейный поиск', category: 'search' },
  //графы
  { id: 'bfs', label: '🌐 BFS - Обход графа в ширину', category: 'graph' },
  { id: 'dfs', label: '🌐 DFS - Обход графа в глубину', category: 'graph' },
  { id: 'dijkstra', label: '🛣️ Алгоритм Дейкстры (кратчайшие пути)', category: 'weightedGraph' }
];
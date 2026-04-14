// БОЛЬШОЙ ГРАФ ДЛЯ BFS/DFS (10 узлов)
export const largeGraph = {
  0: [1, 2, 3],
  1: [0, 4, 5],
  2: [0, 6],
  3: [0, 7, 8],
  4: [1, 9],
  5: [1],
  6: [2, 9],
  7: [3],
  8: [3, 9],
  9: [4, 6, 8]
};

// Узлы БЕЗ фиксированных координат (будут рассчитаны автоматически)
export const largeGraphNodes = [
  { id: 0, label: 'A' },
  { id: 1, label: 'B' },
  { id: 2, label: 'C' },
  { id: 3, label: 'D' },
  { id: 4, label: 'E' },
  { id: 5, label: 'F' },
  { id: 6, label: 'G' },
  { id: 7, label: 'H' },
  { id: 8, label: 'I' },
  { id: 9, label: 'J' }
];

// ГРАФ-СЕТКА 3x3 (9 узлов)
export const gridGraph = {
  0: [1, 3],
  1: [0, 2, 4],
  2: [1, 5],
  3: [0, 4, 6],
  4: [1, 3, 5, 7],
  5: [2, 4, 8],
  6: [3, 7],
  7: [4, 6, 8],
  8: [5, 7]
};

export const gridGraphNodes = [
  { id: 0, label: 'A' },
  { id: 1, label: 'B' },
  { id: 2, label: 'C' },
  { id: 3, label: 'D' },
  { id: 4, label: 'E' },
  { id: 5, label: 'F' },
  { id: 6, label: 'G' },
  { id: 7, label: 'H' },
  { id: 8, label: 'I' }
];
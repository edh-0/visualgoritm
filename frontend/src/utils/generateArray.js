// Функция создаёт массив случайных чисел
export function generateArray(size = 10) {
  return Array.from({length: size}, () => {
    return Math.floor(Math.random() * 90) + 10; // от 10 до 100
  });
}

// получаем размер массива в зависимости от алгоритма
export function getArraySizeByAlgorithm(algorithmId) {
  const sizes = {
    bubble: 12,      // Пузырьковая
    selection: 12,   // Выбором
    insertion: 12,   // Вставками
    quick: 15,       // Быстрая (максимум)
    binarySearch: 15,
    linearSearch: 15,
    bfs: 8,          // Графы не используют массив
    dfs: 8
  };
  return sizes[algorithmId] || 10;
}
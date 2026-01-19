// Централизованный импорт и экспорт всех алгоритмов

// ИМПОРТИРУЕМ всё из каждого файла
import { bubbleSortSteps, bubbleSortInfo } from './bubbleSort';
import { selectionSortSteps, selectionSortInfo } from './selectionSort';
import { insertionSortSteps, insertionSortInfo } from './insertionSort';

// ЭКСПОРТИРУЕМ всё наружу
export { bubbleSortSteps, bubbleSortInfo };
export { selectionSortSteps, selectionSortInfo };
export { insertionSortSteps, insertionSortInfo };

// Объект со всеми алгоритмами для удобного доступа
export const algorithms = {
  bubble: {
    name: "Пузырьковая",
    function: bubbleSortSteps,
    info: bubbleSortInfo
  },
  selection: {
    name: "Выбором", 
    function: selectionSortSteps,
    info: selectionSortInfo
  },
  insertion: {
    name: "Вставками",
    function: insertionSortSteps,
    info: insertionSortInfo
  }
};

// Массив доступных алгоритмов для выпадающего списка
export const algorithmList = [
  { id: 'bubble', label: '🫧 Пузырьковая сортировка' },
  { id: 'selection', label: '🎯 Сортировка выбором' },
  { id: 'insertion', label: '📥 Сортировка вставками' }
];
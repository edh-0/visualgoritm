// algorithms/bubbleSort.js

/**
 * Пузырьковая сортировка с возвратом истории шагов
 * @param {number[]} initialArray - исходный массив
 * @returns {Array} Массив объектов-шагов для анимации
 */
export function bubbleSortSteps(initialArray) {
  // 1. Создаём массив для хранения всех шагов
  const steps = [];
  // 2. Копируем массив, чтобы не менять исходный
  const arr = [...initialArray];
  
  // 3. Шаг 0: Начальное состояние
  steps.push({
    array: [...arr], // Копия массива на этом шаге
    comparing: [],   // Индексы сравниваемых элементов (пока пусто)
    swapped: [],     // Индексы поменявшихся элементов (пока пусто)
    description: "Начальное состояние массива"
  });
  
  // 4. Основной алгоритм пузырьковой сортировки
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      
      // Шаг 1: Подсветить элементы, которые сейчас сравниваем
      steps.push({
        array: [...arr], // Текущее состояние массива
        comparing: [j, j + 1], // Подсвечиваем j и j+1
        swapped: [],
        description: `Сравниваем ${arr[j]} и ${arr[j + 1]}`
      });
      
      // Если нужно поменять местами
      if (arr[j] > arr[j + 1]) {
        // Меняем местами
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        
        // Шаг 2: Показать обмен
        steps.push({
          array: [...arr], // Массив после обмена
          comparing: [j, j + 1], // Всё ещё подсвечиваем
          swapped: [j, j + 1], // Показываем, что эти элементы поменялись
          description: `Меняем местами ${arr[j]} и ${arr[j+1]}`
        });
      }
      
      // Шаг 3: Снять подсветку (если не меняли)
      if (arr[j] <= arr[j + 1]) {
        steps.push({
          array: [...arr],
          comparing: [],
          swapped: [],
          description: `Элементы в правильном порядке`
        });
      }
    }
    
    // 5. Элемент в конце отсортирован (после каждого прохода i)
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: [arr.length - i - 1], // Подсвечиваем отсортированный элемент
      description: `Элемент на позиции ${arr.length - i - 1} теперь на своём месте`
    });
  }
  
  // 6. Финальное состояние
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [], // Можно подсветить весь массив: [...arr.keys()]
    description: "✅ Массив полностью отсортирован!"
  });
  
  return steps;
}

export const bubbleSortInfo = {
  name: "Пузырьковая сортировка",
  timeComplexity: "O(n²)",
  spaceComplexity: "O(1)",
  description: "Попарно сравнивает соседние элементы и меняет их местами, если они не в порядке."
};

// Пример использования для теста (потом удалить):
// const test = bubbleSortSteps([5, 3, 8, 1, 2]);
// console.log('Шагов создано:', test.length);
// console.log('Первый шаг:', test[0]);
// console.log('Последний шаг:', test[test.length - 1]);


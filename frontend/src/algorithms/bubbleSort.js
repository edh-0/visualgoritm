/**
 * Пузырьковая сортировка с возвратом истории шагов
 * @param {number[]} initialArray - исходный массив
 * @returns {Array} Массив объектов-шагов для анимации
 */
export function bubbleSortSteps(initialArray) {
  // массив для хранения всех шагов
  const steps = [];
  const arr = [...initialArray];
  
  // Начальное состояние
  steps.push({
    array: [...arr], // Копия массива 
    comparing: [],   // Индексы сравниваемых элементов 
    swapped: [],     // Индексы поменявшихся элементов 
    description: "Начальное состояние массива"
  });
  
  // Основной алгоритм пузырьковой сортировки
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      
      // Подсветка элементов, которые сейчас сравниваем
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
        
        // Показать обмен
        steps.push({
          array: [...arr], // Массив после обмена
          comparing: [j, j + 1], // Всё ещё подсвечиваем
          swapped: [j, j + 1], // Показываем, что эти элементы поменялись
          description: `Меняем местами ${arr[j]} и ${arr[j+1]}`
        });
      }
      
      // Снять подсветку 
      if (arr[j] <= arr[j + 1]) {
        steps.push({
          array: [...arr],
          comparing: [],
          swapped: [],
          description: `Элементы в правильном порядке`
        });
      }
    }
    
    // Элемент в конце отсортирован (после каждого прохода i)
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: [arr.length - i - 1], // Подсвечиваем отсортированный элемент
      description: `Элемент на позиции ${arr.length - i - 1} теперь на своём месте`
    });
  }
  
  // Финальное состояние
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
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



// algorithms/insertionSort.js

/**
 * Сортировка вставками с возвратом истории шагов
 */
export function insertionSortSteps(initialArray) {
  const steps = [];
  const arr = [...initialArray];
  
  // Начальное состояние
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    description: "Начало сортировки вставками"
  });
  
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    
    steps.push({
      array: [...arr],
      comparing: [i],
      swapped: [],
      description: `Берём элемент ${key} на позиции ${i} для вставки`
    });
    
    // Сдвигаем элементы, которые больше key
    while (j >= 0 && arr[j] > key) {
      // Подсвечиваем сравниваемые
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapped: [],
        description: `Сравниваем ${arr[j]} и ${key}`
      });
      
      // Сдвигаем элемент вправо
      arr[j + 1] = arr[j];
      
      steps.push({
        array: [...arr],
        comparing: [j],
        swapped: [j + 1],
        description: `Сдвигаем ${arr[j]} на позицию ${j + 1}`
      });
      
      j = j - 1;
    }
    
    // Вставляем key на правильное место
    if (arr[j + 1] !== key) {
      arr[j + 1] = key;
      
      steps.push({
        array: [...arr],
        comparing: [j + 1],
        swapped: [j + 1],
        description: `Вставляем ${key} на позицию ${j + 1}`
      });
    }
    
    // Часть массива до i отсортирована
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: Array.from({length: i + 1}, (_, idx) => idx),
      description: `Элементы с 0 по ${i} отсортированы`
    });
  }
  
  // Финальное состояние
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [...arr.keys()],
    description: "✅ Сортировка вставками завершена!"
  });
  
  return steps;
}

export const insertionSortInfo = {
  name: "Сортировка вставками",
  timeComplexity: "O(n²)",
  spaceComplexity: "O(1)",
  description: "Постепенно строит отсортированную часть, вставляя каждый новый элемент в нужное место."
};
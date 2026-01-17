// algorithms/selectionSort.js

/**
 * Сортировка выбором с возвратом истории шагов
 */
export function selectionSortSteps(initialArray) {
  const steps = [];
  const arr = [...initialArray];
  
  // Начальное состояние
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [],
    description: "Начало сортировки выбором"
  });
  
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    
    // Шаг 1: Ищем минимальный элемент
    steps.push({
      array: [...arr],
      comparing: [i],
      swapped: [],
      description: `Ищем минимальный элемент, начиная с позиции ${i}`
    });
    
    for (let j = i + 1; j < arr.length; j++) {
      // Подсвечиваем сравниваемые элементы
      steps.push({
        array: [...arr],
        comparing: [minIndex, j],
        swapped: [],
        description: `Сравниваем ${arr[minIndex]} и ${arr[j]}`
      });
      
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        steps.push({
          array: [...arr],
          comparing: [minIndex],
          swapped: [],
          description: `Новый минимальный элемент: ${arr[minIndex]} на позиции ${minIndex}`
        });
      }
    }
    
    // Если нашли элемент меньше текущего
    if (minIndex !== i) {
      // Меняем местами
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      
      steps.push({
        array: [...arr],
        comparing: [i, minIndex],
        swapped: [i, minIndex],
        description: `Меняем ${arr[minIndex]} и ${arr[i]} местами`
      });
    }
    
    // Элемент на позиции i теперь отсортирован
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: [i],
      description: `Элемент на позиции ${i} теперь минимальный в оставшейся части`
    });
  }
  
  // Финальное состояние
  steps.push({
    array: [...arr],
    comparing: [],
    swapped: [...arr.keys()], // Все элементы отсортированы
    description: "✅ Сортировка выбором завершена!"
  });
  
  return steps;
}

// Сложность алгоритма для отображения в интерфейсе
export const selectionSortInfo = {
  name: "Сортировка выбором",
  timeComplexity: "O(n²)",
  spaceComplexity: "O(1)",
  description: "На каждом проходе ищет минимальный элемент и ставит его в начало неотсортированной части."
};
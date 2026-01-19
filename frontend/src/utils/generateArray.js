// Функция создаёт массив случайных чисел
export function generateArray(size = 10) {
  // size = количество элементов (по умолчанию 10)
  
  // Создаём массив из 'size' элементов
  // Каждый элемент — случайное число от 10 до 100
  return Array.from({length: size}, () => {
    return Math.floor(Math.random() * 90) + 10; // от 10 до 100
  });
}


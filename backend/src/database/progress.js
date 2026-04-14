const { pool } = require('./db');

// Создание таблицы прогресса по алгоритмам
const createProgressTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS user_progress (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      algorithm_id VARCHAR(50) NOT NULL,
      viewed BOOLEAN DEFAULT FALSE,
      last_viewed_at TIMESTAMP NULL,
      times_viewed INT DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE KEY unique_user_algorithm (user_id, algorithm_id),
      INDEX idx_user_id (user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;
  
  try {
    await pool.query(query);
    console.log('✅ Таблица user_progress создана/проверена');
  } catch (error) {
    console.error('❌ Ошибка создания таблицы прогресса:', error);
  }
};

// Создание таблицы статистики
const createStatsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS user_stats (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL UNIQUE,
      total_executions INT DEFAULT 0,
      favorite_algorithm VARCHAR(50) NULL,
      total_steps INT DEFAULT 0,
      last_active_at TIMESTAMP NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;
  
  try {
    await pool.query(query);
    console.log('✅ Таблица user_stats создана/проверена');
  } catch (error) {
    console.error('❌ Ошибка создания таблицы статистики:', error);
  }
};

// Получение прогресса пользователя
const getUserProgress = async (userId) => {
  const query = 'SELECT algorithm_id, viewed, times_viewed FROM user_progress WHERE user_id = ?';
  try {
    const [rows] = await pool.query(query, [userId]);
    return rows;
  } catch (error) {
    console.error('Ошибка получения прогресса:', error);
    return [];
  }
};

// Обновление прогресса (алгоритм просмотрен)
const updateAlgorithmProgress = async (userId, algorithmId) => {
  const query = `
    INSERT INTO user_progress (user_id, algorithm_id, viewed, times_viewed, last_viewed_at)
    VALUES (?, ?, TRUE, 1, NOW())
    ON DUPLICATE KEY UPDATE
      viewed = TRUE,
      times_viewed = times_viewed + 1,
      last_viewed_at = NOW()
  `;
  
  try {
    await pool.query(query, [userId, algorithmId]);
    return { success: true };
  } catch (error) {
    console.error('Ошибка обновления прогресса:', error);
    return { success: false };
  }
};

// Получение статистики пользователя
const getUserStats = async (userId) => {
  const query = 'SELECT total_executions, favorite_algorithm, total_steps, last_active_at FROM user_stats WHERE user_id = ?';
  try {
    const [rows] = await pool.query(query, [userId]);
    if (rows.length === 0) {
      // Создаем запись статистики, если её нет
      await pool.query('INSERT INTO user_stats (user_id) VALUES (?)', [userId]);
      return { total_executions: 0, favorite_algorithm: null, total_steps: 0, last_active_at: null };
    }
    return rows[0];
  } catch (error) {
    console.error('Ошибка получения статистики:', error);
    return { total_executions: 0, favorite_algorithm: null, total_steps: 0 };
  }
};

// Обновление статистики при выполнении алгоритма
const updateUserStats = async (userId, algorithmId, stepsCount) => {
  try {
    // Обновляем общую статистику
    await pool.query(
      `UPDATE user_stats 
       SET total_executions = total_executions + 1,
           total_steps = total_steps + ?,
           last_active_at = NOW()
       WHERE user_id = ?`,
      [stepsCount, userId]
    );
    
    // Обновляем любимый алгоритм (по количеству запусков)
    await pool.query(
      `UPDATE user_stats 
       SET favorite_algorithm = (
         SELECT algorithm_id FROM user_progress 
         WHERE user_id = ? 
         ORDER BY times_viewed DESC 
         LIMIT 1
       )
       WHERE user_id = ?`,
      [userId, userId]
    );
    
    return { success: true };
  } catch (error) {
    console.error('Ошибка обновления статистики:', error);
    return { success: false };
  }
};

module.exports = {
  createProgressTable,
  createStatsTable,
  getUserProgress,
  updateAlgorithmProgress,
  getUserStats,
  updateUserStats
};
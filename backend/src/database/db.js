const mysql = require('mysql2/promise');
require('dotenv').config();

// Пул соединений
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Проверка подключения
const testConnection = async () => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('✅ Подключение к MySQL успешно');
    return true;
  } catch (error) {
    console.error('❌ Ошибка подключения к MySQL:', error.message);
    console.log('Проверь:');
    console.log('1. Запущен ли XAMPP MySQL?');
    console.log('2. Правильный ли пароль? (пустой для XAMPP)');
    console.log('3. Существует ли база visualgorithm?');
    return false;
  }
};

// Создание таблицы пользователей
const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      username VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;
  
  try {
    await pool.query(query);
    console.log('✅ Таблица users создана/проверена (MySQL)');
  } catch (error) {
    console.error('❌ Ошибка создания таблицы:', error);
  }
};

module.exports = { pool, createUsersTable, testConnection };
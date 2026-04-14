const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { createUsersTable } = require('./database/db');
const authRoutes = require('./routes/auth');

const app = express();

const { createProgressTable, createStatsTable } = require('./database/progress');
const progressRoutes = require('./routes/progress');
// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Разрешаем запросы без origin (например, с мобильных приложений)
    if (!origin) return callback(null, true);
    
    // Список разрешенных доменов
    const allowedOrigins = [
      'http://localhost:3000',           // локальная разработка
      'http://localhost:5000',           // если фронт и бэк на одном порту
      'https://edh-0.github.io',         // GitHub Pages
      'https://visualgorithm.ru'         // хостинг
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Инициализация базы данных

createUsersTable();
createProgressTable();
createStatsTable();

// Routes

app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

// Health check

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Visualgorithm Backend API'
  });
});

// 404

app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Обработка ошибок

app.use((err, req, res, next) => {
  console.error('Ошибка сервера:', err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});


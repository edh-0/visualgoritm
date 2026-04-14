const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { createUsersTable } = require('./src/database/db');
const { createProgressTable, createStatsTable } = require('./src/database/progress');
const authRoutes = require('./src/routes/auth');
const progressRoutes = require('./src/routes/progress');

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://visualgorithm.ru']
    : ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Создание таблиц
createUsersTable();
createProgressTable();
createStatsTable();

// Маршруты
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Раздача статики React
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
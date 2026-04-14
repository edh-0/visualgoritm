const express = require('express');
const { 
  getUserProgress, 
  updateAlgorithmProgress, 
  getUserStats, 
  updateUserStats 
} = require('../database/progress');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Получить прогресс пользователя
router.get('/progress', authMiddleware, async (req, res) => {
  try {
    const progress = await getUserProgress(req.userId);
    res.json({ success: true, progress });
  } catch (error) {
    console.error('Ошибка получения прогресса:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получить статистику пользователя
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const stats = await getUserStats(req.userId);
    res.json({ success: true, stats });
  } catch (error) {
    console.error('Ошибка получения статистики:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Обновить прогресс (алгоритм просмотрен)
router.post('/progress/:algorithmId', authMiddleware, async (req, res) => {
  try {
    const { algorithmId } = req.params;
    await updateAlgorithmProgress(req.userId, algorithmId);
    res.json({ success: true });
  } catch (error) {
    console.error('Ошибка обновления прогресса:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Обновить статистику после выполнения алгоритма
router.post('/stats/:algorithmId', authMiddleware, async (req, res) => {
  try {
    const { algorithmId } = req.params;
    const { stepsCount } = req.body;
    await updateUserStats(req.userId, algorithmId, stepsCount);
    res.json({ success: true });
  } catch (error) {
    console.error('Ошибка обновления статистики:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Получаем токен из заголовка
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Требуется авторизация' });
    }
    
    // Верифицируем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Добавляем данные пользователя в запрос
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    
    next();
  } catch (error) {
    console.error('Ошибка аутентификации:', error.message);
    res.status(401).json({ error: 'Неверный токен' });
  }
};

module.exports = authMiddleware;
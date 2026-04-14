import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://visualgorithm.ru' 
  : 'http://localhost:5000';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [progress, setProgress] = useState([]);
  const [stats, setStats] = useState(null);

  // Функция загрузки прогресса и статистики (обёрнута в useCallback)
  const loadProgressAndStats = useCallback(async (authToken) => {
    console.log('🟣 Загрузка прогресса и статистики...');
    if (!authToken) return;
    
    try {
      // Загружаем прогресс
      const progressRes = await axios.get(`${API_URL}/api/progress/progress`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      console.log('📊 Прогресс:', progressRes.data);
      setProgress(progressRes.data.progress);
      
      // Загружаем статистику
      const statsRes = await axios.get(`${API_URL}/api/progress/stats`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      console.log('📈 Статистика (сырая):', statsRes.data);
      console.log('📈 favorite_algorithm:', statsRes.data.stats?.favorite_algorithm);
      setStats(statsRes.data.stats);
    } catch (error) {
      console.error('❌ Ошибка загрузки:', error.response?.data || error.message);
    }
  }, []);

  // Функция получения текущего пользователя
  const fetchCurrentUser = useCallback(async (authToken) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setUser(response.data.user);
      await loadProgressAndStats(authToken);
    } catch (error) {
      console.error('Ошибка получения пользователя:', error);
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, [loadProgressAndStats]);

  // Обновление прогресса после просмотра алгоритма
  const updateProgress = async (algorithmId) => {
    console.log('🟢 updateProgress вызван:', algorithmId);
    const currentToken = token;  // ← используем token из state
    if (!currentToken) return;
    
    try {
      await axios.post(`${API_URL}/api/progress/progress/${algorithmId}`, {}, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      console.log('✅ Прогресс сохранён');
      await loadProgressAndStats(currentToken);
    } catch (error) {
      console.error('Ошибка обновления прогресса:', error);
    }
  };

  // Обновление статистики после выполнения
  const updateStats = useCallback(async (algorithmId, stepsCount) => {
    console.log('🟢 updateStats вызван:', algorithmId, stepsCount);
    const currentToken = localStorage.getItem('token');
    if (!currentToken) return;
    
    try {
      await axios.post(`${API_URL}/api/progress/stats/${algorithmId}`, 
        { stepsCount },
        { headers: { Authorization: `Bearer ${currentToken}` } }
      );
      console.log('✅ Статистика сохранена');
      await loadProgressAndStats(currentToken);
    } catch (error) {
      console.error('❌ Ошибка:', error);
    }
  }, [loadProgressAndStats]);

  // Эффект для проверки токена при загрузке
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchCurrentUser(storedToken);
    } else {
      setLoading(false);
    }
  }, [fetchCurrentUser]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      const { user, token: newToken } = response.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(user);
      await loadProgressAndStats(newToken);
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Ошибка входа'
      };
    }
  };

  const register = async (email, password, username) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, { email, password, username });
      const { user, token: newToken } = response.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(user);
      await loadProgressAndStats(newToken);
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Ошибка регистрации'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setProgress([]);
    setStats(null);
  };

  const value = {
    user,
    token,
    loading,
    progress,
    stats,
    login,
    register,
    logout,
    updateProgress,
    updateStats
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
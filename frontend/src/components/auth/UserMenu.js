import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './UserMenu.css';

const UserMenu = () => {
  const { user, logout, progress, stats } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const displayName = user.username || user.email.split('@')[0];
  
  // Подсчитываем количество изученных алгоритмов
  const viewedAlgorithms = progress?.filter(p => p.viewed).length || 0;
  const totalAlgorithms = 8; // bubble, selection, insertion, quick, binarySearch, linearSearch, bfs, dfs
  
  // Форматируем дату последней активности
  const lastActive = stats?.last_active_at 
    ? new Date(stats.last_active_at).toLocaleDateString('ru-RU')
    : '—';


    const favoriteAlgorithm = stats?.favorite_algorithm || '—';
    const algorithmNames = {
      bubble: 'Пузырьковая',
      selection: 'Выбором',
      insertion: 'Вставками',
      quick: 'Быстрая',
      binarySearch: 'Бинарный поиск',
      linearSearch: 'Линейный поиск',
      bfs: 'BFS',
      dfs: 'DFS'
    };

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        className="user-menu-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="user-avatar">
          {displayName.charAt(0).toUpperCase()}
        </span>
        <span className="user-name">{displayName}</span>
        <span className="dropdown-arrow">▼</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <div className="user-info">
              <div className="user-info-email">{user.email}</div>
              {user.username && (
                <div className="user-info-username">@{user.username}</div>
              )}
            </div>
          </div>

          {/* Статистика */}
          <div className="dropdown-stats">
            <div className="stat-item">
              <span className="stat-emoji">📊</span>
              <div className="stat-details">
                <span className="stat-label">Всего запусков</span>
                <span className="stat-number">{stats?.total_executions || 0}</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-emoji">✅</span>
              <div className="stat-details">
                <span className="stat-label">Изучено алгоритмов</span>
                <span className="stat-number">{viewedAlgorithms} / {totalAlgorithms}</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-emoji">👑</span>
              <div className="stat-details">
                <span className="stat-label">Любимый алгоритм</span>
                <span className="stat-number">{algorithmNames[favoriteAlgorithm] || favoriteAlgorithm}</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-emoji">📈</span>
              <div className="stat-details">
                <span className="stat-label">Всего шагов</span>
                <span className="stat-number">{stats?.total_steps || 0}</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-emoji">🕐</span>
              <div className="stat-details">
                <span className="stat-label">Последняя активность</span>
                <span className="stat-number">{lastActive}</span>
              </div>
            </div>
          </div>

          {/* Прогресс по алгоритмам */}
          <div className="dropdown-progress">
            <div className="progress-title">📚 Прогресс изучения</div>
            <div className="progress-bars">
              {/* сортировки */}
              <div className="progress-item">
                <span>Пузырьковая</span>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: progress?.find(p => p.algorithm_id === 'bubble')?.viewed ? '100%' : '0%' }}
                  />
                </div>
                <span className="progress-status">
                  {progress?.find(p => p.algorithm_id === 'bubble')?.viewed ? '✅' : '⭕'}
                </span>
              </div>
              <div className="progress-item">
                <span>Выбором</span>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: progress?.find(p => p.algorithm_id === 'selection')?.viewed ? '100%' : '0%' }}
                  />
                </div>
                <span className="progress-status">
                  {progress?.find(p => p.algorithm_id === 'selection')?.viewed ? '✅' : '⭕'}
                </span>
              </div>
              <div className="progress-item">
                <span>Вставками</span>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: progress?.find(p => p.algorithm_id === 'insertion')?.viewed ? '100%' : '0%' }}
                  />
                </div>
                <span className="progress-status">
                  {progress?.find(p => p.algorithm_id === 'insertion')?.viewed ? '✅' : '⭕'}
                </span>
              </div>
              <div className="progress-item">
                <span>Быстрая</span>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: progress?.find(p => p.algorithm_id === 'quick')?.viewed ? '100%' : '0%' }}
                  />
                </div>
                <span className="progress-status">
                  {progress?.find(p => p.algorithm_id === 'quick')?.viewed ? '✅' : '⭕'}
                </span>
              </div>
              {/* поиск */}
              <div className="progress-item">
                <span>Бинарный поиск</span>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: progress?.find(p => p.algorithm_id === 'binarySearch')?.viewed ? '100%' : '0%' }}
                  />
                </div>
                <span className="progress-status">
                  {progress?.find(p => p.algorithm_id === 'binarySearch')?.viewed ? '✅' : '⭕'}
                </span>
              </div>
              <div className="progress-item">
                <span>Линейный поиск</span>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: progress?.find(p => p.algorithm_id === 'linearSearch')?.viewed ? '100%' : '0%' }}
                  />
                </div>
                <span className="progress-status">
                  {progress?.find(p => p.algorithm_id === 'linearSearch')?.viewed ? '✅' : '⭕'}
                </span>
              </div>
              {/* графы */}
              <div className="progress-item">
                <span>BFS</span>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: progress?.find(p => p.algorithm_id === 'bfs')?.viewed ? '100%' : '0%' }}
                  />
                </div>
                <span className="progress-status">
                  {progress?.find(p => p.algorithm_id === 'bfs')?.viewed ? '✅' : '⭕'}
                </span>
              </div>
              <div className="progress-item">
                <span>DFS</span>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: progress?.find(p => p.algorithm_id === 'dfs')?.viewed ? '100%' : '0%' }}
                  />
                </div>
                <span className="progress-status">
                  {progress?.find(p => p.algorithm_id === 'dfs')?.viewed ? '✅' : '⭕'}
                </span>
              </div>
            </div>
          </div>

          <div className="dropdown-divider"></div>
          <button
            className="dropdown-item logout-button"
            onClick={logout}
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
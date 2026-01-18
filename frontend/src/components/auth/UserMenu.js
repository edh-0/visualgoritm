import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './UserMenu.css';

const UserMenu = () => {
  const { user, logout } = useAuth();
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
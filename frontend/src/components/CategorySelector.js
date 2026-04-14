import React from 'react';
import './CategorySelector.css';

const CategorySelector = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-selector">
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
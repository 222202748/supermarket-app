import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryShowcase.css';

const CategoryShowcase = ({ categories = [] }) => {
  // Group categories by parent
  const parentCategories = categories.filter(c => !c.parentCategory);
  
  const getChildren = (parentId) => {
    return categories.filter(c => c.parentCategory === parentId);
  };

  if (!categories.length) return null;

  return (
    <div className="category-showcase-container">
      <div className="category-grid">
        {parentCategories.map(parent => (
          <div key={parent._id} className="category-column">
            <h3 className="category-header">{parent.name}</h3>
            <ul className="category-list">
              {getChildren(parent._id).map(child => (
                <li key={child._id} className="category-item">
                  <Link to={`/products?category=${child._id}`}>
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryShowcase;

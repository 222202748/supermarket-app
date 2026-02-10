import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryGrid.css';

const CategoryGrid = ({ categories }) => {
  // Filter parent categories (those without a parentCategory)
  const parentCategories = categories.filter(c => !c.parentCategory);

  // Helper to get children for a parent
  const getChildren = (parentId) => {
    return categories.filter(c => c.parentCategory === parentId || c.parentCategory?._id === parentId);
  };

  if (!categories || categories.length === 0) return null;

  return (
    <div className="category-grid-section">
      <div className="category-grid-container">
        {parentCategories.map(parent => {
          const children = getChildren(parent._id);
          
          // Only show parents that have children or content
          // (Optional: remove this check if you want to show empty parents too)
          if (children.length === 0) return null;

          return (
            <div key={parent._id} className="category-column">
              <Link to={`/products?category=${parent._id}`} className="category-header-link">
                <h3 className="category-header">{parent.name}</h3>
              </Link>
              <ul className="subcategory-list">
                {children.map(child => (
                  <li key={child._id} className="subcategory-item">
                    <Link to={`/products?category=${child._id}`} className="subcategory-link">
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;

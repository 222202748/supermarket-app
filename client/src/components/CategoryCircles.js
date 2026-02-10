import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CategoryCircles.css';

const CategoryCircles = ({ categories }) => {
  // Filter only parent categories (those without a parent)
  const parentCategories = categories.filter(c => !c.parentCategory);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (!parentCategories || parentCategories.length === 0) return null;

  return (
    <div className="category-circles-section">
      <div className="container">
        <Slider {...settings} className="category-circles-slider">
          {parentCategories.map(category => (
            <div key={category._id} className="category-circle-item">
              <Link to={`/products?category=${encodeURIComponent(category.slug || category._id)}`} className="category-circle-link">
                <div className="category-circle-image-container">
                  {/* We use the provided image as background in CSS, 
                      and render the category image on top if available */}
                  <img 
                    src={category.image?.url || '/images/category/category-1.jpg'} 
                    alt={category.name} 
                    className="category-circle-img"
                  />
                </div>
                <p className="category-circle-name">{category.name}</p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategoryCircles;

import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomeCarousel.css';

const HomeCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const banners = [
    {
      id: 1,
      title: "Fresh Vegetables",
      subtitle: "Up to 30% off on organic produce",
      bgColor: "#e8f5e9", // Light green
      image: "https://placehold.co/800x400/e8f5e9/2e7d32?text=Fresh+Vegetables",
      link: "/products?category=vegetables"
    },
    {
      id: 2,
      title: "Daily Essentials",
      subtitle: "Best prices on milk, bread & eggs",
      bgColor: "#fff3e0", // Light orange
      image: "https://placehold.co/800x400/fff3e0/ef6c00?text=Daily+Essentials",
      link: "/products?category=dairy"
    },
    {
      id: 3,
      title: "Summer Special",
      subtitle: "Cool drinks and ice creams",
      bgColor: "#e3f2fd", // Light blue
      image: "https://placehold.co/800x400/e3f2fd/1565c0?text=Summer+Special",
      link: "/products?category=beverages"
    }
  ];

  return (
    <div className="home-carousel-container">
      <Slider {...settings}>
        {banners.map(banner => (
          <div key={banner.id} className="carousel-slide">
            <div className="banner-content" style={{ backgroundColor: banner.bgColor }}>
              <div className="banner-text">
                <h2>{banner.title}</h2>
                <p>{banner.subtitle}</p>
                <Link to={banner.link} className="banner-btn">Shop Now</Link>
              </div>
              <div className="banner-image">
                <img src={banner.image} alt={banner.title} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeCarousel;

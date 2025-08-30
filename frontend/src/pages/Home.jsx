import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to FoodieHub</h1>
        <p className="hero-subtitle">Discover, Share, and Enjoy Amazing Recipes</p>
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" 
          alt="Delicious food" 
          className="hero-image"
          style={{ maxWidth: '100%', height: 'auto', marginTop: '20px', borderRadius: '8px' }}
        />
      </div>

      <div className="about-section">
        <h2>Explore Sweet Delights</h2>
        <p>
          Indulge your sweet tooth with our curated collection of dessert recipes. 
          From classic cakes to innovative treats, FoodieHub brings you the best in desserts to satisfy every craving.
        </p>
      </div>
    </div>
  );
};

export default Home;

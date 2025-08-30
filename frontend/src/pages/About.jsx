import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About FoodieHub</h1>
      <p>
        FoodieHub is your ultimate destination for food lovers. Whether you're searching for delicious recipes, exploring food trends, or sharing your own culinary creations, FoodieHub brings everything together in one place. We celebrate the joy of cooking, eating, and connecting through food.
      </p>
      <img 
        src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80" 
        alt="Colorful fresh vegetables and spices" 
        style={{ maxWidth: '100%', height: 'auto', marginTop: '20px', borderRadius: '8px' }}
      />
    </div>
  );
};

export default About;

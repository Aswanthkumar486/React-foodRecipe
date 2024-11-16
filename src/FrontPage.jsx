import React from "react";
import "./App.css"; // Add custom styling for FrontPage if needed

const FrontPage = ({ onGetStarted }) => {
  return (
    <div className="front-page">
      <h1>Welcome to Our Food Recipes</h1>
      <p>Discover delicious recipes from around the world!</p>
      <button onClick={onGetStarted} className="start-btn">
        Get Started
      </button>
    </div>
  );
};

export default FrontPage;

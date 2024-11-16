import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import FrontPage from "./FrontPage";

const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [showFrontPage, setShowFrontPage] = useState(true);
  const [loadingDelay, setLoadingDelay] = useState(false);

  const searchRecipes = async () => {
    setIsLoading(true);
    const url = searchApi + query;
    const res = await fetch(url);
    const data = await res.json();
    setRecipes(data.meals);
    setIsLoading(false);
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  };

  const handleGetStarted = () => {
    setLoadingDelay(true);
    setTimeout(() => {
      setShowFrontPage(false);
      setLoadingDelay(false);
    }, 1000); // Simulate a 2-second loading delay
  };
  const backToFront =() =>{
    setIsLoading(true);
    setShowFrontPage(true);
    setQuery('');
    searchRecipes([]);
  }

  return (
    <div className="container">
      {showFrontPage ? (
        <FrontPage onGetStarted={handleGetStarted} />
      ) : loadingDelay ? (
        <div className="spinner">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <h2>Our Food Recipes</h2>
          <SearchBar
            isLoading={isLoading}
            query={query}
            setQuery={setQuery}
            handleSubmit={handleSubmit}
          />
          <div className="recipes">
            {recipes ? (
              recipes.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
              ))
            ) : (
              "No Results."
            )}
           
          </div>
          <button onClick={backToFront} className="back-btn">back</button>
        </>
      )} 
    </div>
  );
}

export default App;

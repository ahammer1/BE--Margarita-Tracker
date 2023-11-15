import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import RecipeCard from '../components/RecipeCard';
import { getRecipes } from '../api/recipeData';

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  const getAllTheRecipes = () => {
    getRecipes().then(setRecipes);
  };

  useEffect(() => {
    getAllTheRecipes();
  }, []);

  return (
    <div className="text-center my-4 recipePage">
      <h1 className="header">TEAMS</h1>
      <Link href="/recipe/new" passHref>
        <Button size="sm" variant="outline-info" className="createBtn">New Recipe +</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipeObj={recipe} onUpdate={getAllTheRecipes} />
        ))}

      </div>
    </div>
  );
}
export default Recipes;

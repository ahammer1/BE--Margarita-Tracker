import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleRecipe, getSingleRecipe } from '../../api/recipeData';

function ViewRecipe() {
  const [recipeDetails, setRecipeDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const deleteThisRecipe = () => {
    if (window.confirm(`Delete ${recipeDetails.name}?`)) {
      deleteSingleRecipe(recipeDetails.id).then(() => router.push('/recipes'));
    }
  };

  const getRecipeDetails = async () => {
    try {
      const recipeData = await getSingleRecipe(id);

      setRecipeDetails(recipeData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecipeDetails();
  }, [id]);

  return (
    <div>
      <div className="recipeView">
        <div className="recipeCard">
          <Card style={{ width: '600px', margin: '10px' }}>
            <Card.Body>
              <div className="viewRecipeWrap">
                <div>
                  <Card.Img variant="top" src={recipeDetails.image} alt={recipeDetails.name} style={{ width: '300px', margin: '10px' }} />
                </div>
                <div>
                  <Card.Title className="recipeTitle">{recipeDetails.name}</Card.Title>
                  <h4>Description: {recipeDetails.description}</h4>
                  <h4>Ingredients: {recipeDetails.ingredients}</h4>
                  <h4>Prep Time: {recipeDetails.prepTime}</h4>
                  <Link href={`/recipe/edit/${recipeDetails.id}`} passHref>
                    <Button className="editBtn m-2" variant="outline-info">EDIT</Button>
                  </Link>
                  <Button variant="outline-warning" onClick={deleteThisRecipe} className="deleteBtn m-2">
                    DELETE
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        {/* <div className="viewRatings">{ratings?.map((rating) => (
          <RatingCard key={rating.id} ratingObj={rating} onUpdate={getRecipeDetails} />
        ))}
        </div>
        <RatingForm onSubmit={createRecipeRatings} /> */}
      </div>
    </div>
  );
}

export default ViewRecipe;

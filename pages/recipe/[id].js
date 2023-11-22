import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, Button, Row, Col,
} from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deleteSingleRecipe, getSingleRecipe } from '../../api/recipeData';

function ViewRecipe() {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [authUser] = useState();
  const { user } = useAuth();
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
    <div className="container mt-4">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={recipeDetails.image}
              alt={recipeDetails.name}
              style={{ width: '100%', height: 'auto' }}
            />
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="recipeTitle">{recipeDetails.name}</Card.Title>
              <p><strong>Description:</strong> {recipeDetails.description}</p>
              <p><strong>Ingredients:</strong> {recipeDetails.ingredients}</p>
              <p><strong>Prep Time:</strong> {recipeDetails.prepTime} Minutes</p>
            </Card.Body>
            {authUser?.firebaseUid === user?.userID && (
              <div className="buttons mt-3">
                <Link href={`/recipe/edit/${recipeDetails.id}`} passHref>
                  <Button className="editBtn" variant="outline-info">
                    EDIT
                  </Button>
                </Link>
                <Button
                  variant="outline-warning"
                  onClick={deleteThisRecipe}
                  className="deleteBtn ml-2"
                >
                  DELETE
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          {/* Uncomment the following lines if you want to include ratings and a form */}
          {/* <div className="viewRatings">
            {ratings?.map((rating) => (
              <RatingCard key={rating.id} ratingObj={rating} onUpdate={getRecipeDetails} />
            ))}
          </div>
          <RatingForm onSubmit={createRecipeRatings} /> */}
        </Col>
      </Row>
    </div>
  );
}
export default ViewRecipe;

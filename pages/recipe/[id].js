import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, Button, Row, Col,
} from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deleteSingleRecipe, getSingleRecipe } from '../../api/recipeData';
import { checkUser } from '../../utils/auth';
import CommentCard from '../../components/CommentCard';
import CommentForm from '../../components/Forms/CommentForm';
import { getComments, createComments } from '../../api/commentData';

function ViewRecipe() {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [, setAuthUser] = useState();
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const deleteThisRecipe = () => {
    if (window.confirm(`Delete ${recipeDetails.name}?`)) {
      deleteSingleRecipe(recipeDetails.id).then(() => router.push('/Recipes'));
    }
  };

  const getRecipeDetails = async () => {
    try {
      const recipeData = await getSingleRecipe(id);
      setRecipeDetails(recipeData);
      const commentArray = await getComments();
      const filteredComments = commentArray.filter((item) => item.recipeId === recipeData.id);
      setComments(filteredComments);
    } catch (error) {
      console.error(error);
    }
  };

  const createComment = async (recipeId, commentData) => {
    try {
      await createComments(recipeId, commentData);
      getRecipeDetails();
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getRecipeDetails();
      await checkUser(user.id).then((data) => setAuthUser(data));
    };

    fetchData();
  }, [id, user.id]);

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
            {recipeDetails?.userId === user.id && (
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
          <CommentForm recipeId={id} onSubmit={createComment} onUpdate={getRecipeDetails} />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <div className="viewRatings">
            {comments?.map((comment) => (
              <CommentCard key={comment.id} commentObj={comment} onUpdate={getRecipeDetails} />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default ViewRecipe;

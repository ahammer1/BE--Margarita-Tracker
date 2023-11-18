import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleRecipe } from '../api/recipeData';

function EventCard({ recipeObj, onUpdate }) {
  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${recipeObj.name}?`)) {
      deleteSingleRecipe(recipeObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '15px auto' }}>
      <Card.Img className="recipeImg" variant="top" src={recipeObj.image} alt={recipeObj.name} style={{ height: '350px' }} />
      <Card.Body>
        <Card.Title className="recipeTitle">{recipeObj.name}</Card.Title>
        <h4>Description {recipeObj.description}</h4>
        <h4>Ingredients {recipeObj.ingredients}</h4>
        <h4>PrepTime {recipeObj.prepTime}</h4>

        <div className="wrapper">
          <Link href={`/recipe/${recipeObj.id}`} passHref>
            <Button variant="primary" className="viewBtn m-2">VIEW</Button>
          </Link>
          <Button variant="outline-warning" size="sm" onClick={deleteThisEvent} className="deleteBtn m-2">
            DELETE
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  recipeObj: PropTypes.shape({
    image: PropTypes.string,
    ingredients: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    prepTime: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;

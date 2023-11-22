import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { deleteSingleRating } from '../api/ratingData';
import { useAuth } from '../utils/context/authContext';

function RatingCard({ ratingObj, onUpdate }) {
  const [authUser] = useState();
  const { user } = useAuth();
  const deleteThisRating = () => {
    if (window.confirm('Do you want to delete this rating?')) {
      deleteSingleRating(ratingObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{ratingObj.label}</Card.Title>
        {authUser?.userID === user?.userID && (
          <Button variant="outline-dark" onClick={deleteThisRating} className="m-2">
            DELETE
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

RatingCard.propTypes = {
  ratingObj: PropTypes.shape({
    label: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RatingCard;

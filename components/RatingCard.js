import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteSingleRating } from '../api/ratingData';

function RatingCard({ ratingObj, onUpdate }) {
  const deleteThisRating = () => {
    if (window.confirm('Do you want to delete this rating?')) {
      deleteSingleRating(ratingObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{ratingObj.label}</Card.Title>

        <Button variant="outline-warning" onClick={deleteThisRating} className="m-2">
          DELETE
        </Button>
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

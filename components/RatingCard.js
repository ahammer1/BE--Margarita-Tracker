import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { deleteSingleRating } from '../api/ratingData';
import { useAuth } from '../utils/context/authContext';
import { checkUser } from '../utils/auth';

function RatingCard({ ratingObj, onUpdate }) {
  const [, setAuthUser] = useState();
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const deleteThisRating = () => {
    if (window.confirm('Do you want to delete this rating?')) {
      deleteSingleRating(ratingObj.id).then(() => onUpdate());
    }
  };

  useEffect(() => {
    checkUser(user.id).then((data) => setAuthUser(data));
  }, [id]);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{ratingObj.label}</Card.Title>
        {ratingObj?.userId === user.id && (
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
    userId: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RatingCard;

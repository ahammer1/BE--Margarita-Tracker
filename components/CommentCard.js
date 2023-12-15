import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { deleteSingleComment } from '../api/commentData';
import { useAuth } from '../utils/context/authContext';
import { checkUser } from '../utils/auth';

function CommentCard({ commentObj, onUpdate }) {
  const [, setAuthUser] = useState();
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const deleteThisComment = () => {
    if (window.confirm('Do you want to delete this comment?')) {
      deleteSingleComment(commentObj.id).then(() => onUpdate());
    }
  };

  useEffect(() => {
    checkUser(user.id).then((data) => setAuthUser(data));
  }, [id]);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <p><strong>User:</strong> {commentObj.userName} </p>
        <p>{commentObj.label}</p>
        {commentObj?.userId === user.id && (
          <Button variant="outline-dark" onClick={deleteThisComment} className="m-2">
            DELETE
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    label: PropTypes.string,
    id: PropTypes.number,
    userId: PropTypes.number,
    userName: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentCard;

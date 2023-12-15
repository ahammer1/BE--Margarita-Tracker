import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { createComments } from '../../api/commentData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  label: '',
  userName: '',
};

export default function CommentForm({ recipeId, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formInput.label.trim() !== '') {
      const newComment = {
        label: formInput.label,
        userId: user.id,
        userName: user.userName,
      };

      // Use async/await to wait for comment creation
      await createComments(recipeId, newComment);

      // Call the onUpdate prop to trigger a refresh
      onUpdate();

      // Clear the form input
      setFormInput(initialState);
    } else {
      console.error('Label cannot be null or empty');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="floatingInput3" label="submit a comment for the recipe" className="mb-3">
        <Form.Control
          type="text"
          aria-label="Label"
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button variant="outline-primary" type="submit">
        Submit Comment
      </Button>
    </Form>
  );
}

CommentForm.propTypes = {
  recipeId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

// CommentForm.defaultProps = {
//   obj: initialState,
// };

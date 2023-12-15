import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { createRatings } from '../../api/ratingData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  label: '',
};

export default function RatingForm({ eventId }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.warn(user, 'user');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user.id, 'user');
    if (formInput.label.trim() !== '') {
      const newRating = {
        label: formInput.label,
        userId: user.id,
      };
      createRatings(eventId, newRating);
      setFormInput(initialState);
      window.location.reload();
    } else {
      console.error('Label cannot be null or empty');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="floatingInput3" label="submit a comment/rating for the event" className="mb-3">
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
        Submit Rating
      </Button>
    </Form>
  );
}

RatingForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
  }),
  eventId: PropTypes.string.isRequired,
};

RatingForm.defaultProps = {
  obj: initialState,
};

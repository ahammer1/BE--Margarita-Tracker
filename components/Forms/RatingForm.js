import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { createRatings } from '../../api/ratingData';

const initialState = {
  label: '',
};

export default function RatingForm({ eventId }) {
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formInput.label.trim() !== '') {
      const newRating = {
        label: formInput.label,
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
      <FloatingLabel controlId="floatingInput3" label="Label" className="mb-3">
        <Form.Control
          type="text"
          aria-label="Label"
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button variant="primary" type="submit">
        Submit Rating
      </Button>
    </Form>
  );
}

RatingForm.propTypes = {
  eventId: PropTypes.string.isRequired,
};

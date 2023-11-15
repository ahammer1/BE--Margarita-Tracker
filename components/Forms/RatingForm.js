import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createRatings } from '../../api/ratingData';

const initialState = {
  label: '',
};
export default function RatingForm({ ratingObj }) {
  const [formInput, setFormInput] = useState({ label: '' });
  const [ratingValue] = useState(0);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ratingObj.id) {
      //
    } else {
      const payload = {
        label: formInput.label,
        rating: ratingValue,
      };
      try {
        await createRatings(payload);
        router.push('/ratings');
      } catch (error) {
        console.error('Error creating rating:', error);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="rating">
        <Form.Label htmlFor="rating">Rating:</Form.Label>
        <Form.Control
          type="number"
          value={ratingValue}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Uncomment and handle comments logic if needed */}
      {/* <Form.Group controlId="comments">
        <Form.Label htmlFor="comments">Comments:</Form.Label>
        <Form.Control
          as="textarea"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </Form.Group> */}
      <Button variant="primary" type="submit">
        Submit Rating
      </Button>
    </Form>
  );
}

RatingForm.propTypes = {
  ratingObj: PropTypes.shape({
    label: PropTypes.string,
    id: PropTypes.string,
  }),
};

RatingForm.defaultProps = {
  ratingObj: initialState,
};

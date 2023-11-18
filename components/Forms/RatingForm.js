import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import { createRatings } from '../../api/ratingData';

const initialState = {
  label: '',
};

export default function RatingForm({ ratingObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { id } = router.query;

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
      // Handle the case when ratingObj has an id
    } else {
      const payload = {
        label: formInput.label,
      };
      try {
        await createRatings(payload);
        router.push(`/event/${id}`);
      } catch (error) {
        console.error('Error creating rating:', error);
      }
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

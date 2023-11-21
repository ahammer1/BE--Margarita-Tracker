import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createEvents, updateEvent } from '../../api/eventData';

const initialState = {
  name: '',
  description: '',
  type: '',
  image: '',
  DateTime: '',
};

function EventForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateEvent(formInput).then(() => router.push(`/event/${obj.id}`));
    } else {
      const payload = { ...formInput, UserId: user.uid };
      createEvents(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateEvent(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-white mt-5">{obj.id ? 'Update' : 'Add'} Event</h1>

      {/* name  */}
      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control
          type="text"
          aria-label="Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* description  */}
      <FloatingLabel controlId="floatingInput3" label="Description" className="mb-3">
        <Form.Control
          type="text"
          aria-label="Description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Event Image" className="mb-3">
        <Form.Control
          type="url"
          aria-label="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* role  */}
      <FloatingLabel controlId="floatingTextarea" label="Type" className="mb-3">
        <Form.Control
          as="textarea"
          aria-label="Type"
          name="type"
          value={formInput.type}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="datetime">Date and Time:</Form.Label>

        <Form.Control
          type="datetime-local"
          id="datetime"
          name="DateTime"
          value={formInput.DateTime}
          min="2023-10-31T00:00"
          max="2024-01-30T23:59"
          onChange={handleChange}
        />
      </Form.Group>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Add'} Event </Button>
    </Form>
  );
}

EventForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    DateTime: PropTypes.instanceOf(Date),
    id: PropTypes.number,
  }),
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;

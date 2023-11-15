import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleEvent } from '../api/eventData';

function EventCard({ eventObj, onUpdate }) {
  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${eventObj.name}?`)) {
      deleteSingleEvent(eventObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '15px auto' }}>
      <Card.Img className="eventImg" variant="top" src={eventObj.image} alt={eventObj.name} style={{ height: '350px' }} />
      <Card.Body>
        <Card.Title className="eventTitle">{eventObj.name}</Card.Title>
        <h4>Description {eventObj.description}</h4>
        <h4>Type {eventObj.type}</h4>
        <h4>DateTime {eventObj.dateTime}</h4>

        <div className="wrapper">
          <Link href={`/event/${eventObj.id}`} passHref>
            <Button variant="primary" className="viewBtn m-2">VIEW</Button>
          </Link>
          <Button variant="outline-warning" size="sm" onClick={deleteThisEvent} className="deleteBtn m-2">
            DELETE
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    image: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    dateTime: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function EventCard({ eventObj }) {
  const formattedDateTime = new Date(eventObj.dateTime).toLocaleString();

  return (
    <Card style={{ width: '18rem', margin: '15px auto' }}>
      <Card.Img className="eventImg" variant="top" src={eventObj.image} alt={eventObj.name} style={{ height: '350px' }} />
      <Card.Body>
        <Card.Title className="eventTitle">{eventObj.name}</Card.Title>

        <div className="eventDetails">
          <p><strong>Description:</strong> {eventObj.description.substring(0, 100)}</p>
          <p><strong>Type:</strong> {eventObj.type}</p>
          <p><strong>Date Time:</strong> {formattedDateTime}</p>
        </div>

        <div className="wrapper">
          <Link href={`/event/${eventObj.id}`} passHref>
            <Button variant="outline-primary" className="viewBtn m-2">VIEW EVENT</Button>
          </Link>
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
    dateTime: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};

export default EventCard;

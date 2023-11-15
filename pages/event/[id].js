import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleEvent, getSingleEvent } from '../../api/eventData';
import RatingCard from '../../components/RatingCard';
import { getRatings } from '../../api/ratingData';
import RatingForm from '../../components/Forms/RatingForm';

function ViewEvent() {
  const [eventDetails, setEventDetails] = useState({});
  const [ratings, setRatings] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${eventDetails.name}?`)) {
      deleteSingleEvent(eventDetails.id).then(() => router.push('/events'));
    }
  };

  const getEventDetails = async () => {
    try {
      const eventData = await getSingleEvent(id);
      const ratingArray = await getRatings();
      const filteredRatings = ratingArray.filter((item) => item.eventId === eventData.id);

      setEventDetails(eventData);
      setRatings(filteredRatings);
    } catch (error) {
      console.error(error);
    }
  };

  const createEventRatings = async (ratingData) => {
    try {
      await createEventRatings(id, ratingData);
      getEventDetails();
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  useEffect(() => {
    getEventDetails();
  }, [id]);

  return (
    <div>
      <div className="eventView">
        <div className="eventCard">
          <Card style={{ width: '600px', margin: '10px' }}>
            <Card.Body>
              <div className="viewEventWrap">
                <div>
                  <Card.Img variant="top" src={eventDetails.image} alt={eventDetails.name} style={{ width: '300px', margin: '10px' }} />
                </div>
                <div>
                  <Card.Title className="eventTitle">{eventDetails.name}</Card.Title>
                  <h4>Description: {eventDetails.description}</h4>
                  <h4>Type: {eventDetails.type}</h4>
                  <h4>Date Time: {eventDetails.dateTime}</h4>
                  <Link href={`/event/edit/${eventDetails.id}`} passHref>
                    <Button className="editBtn m-2" variant="outline-info">EDIT</Button>
                  </Link>
                  <Button variant="outline-warning" onClick={deleteThisEvent} className="deleteBtn m-2">
                    DELETE
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="viewRatings">{ratings?.map((rating) => (
          <RatingCard key={rating.id} ratingObj={rating} onUpdate={getEventDetails} />
        ))}
        </div>
        <RatingForm onSubmit={createEventRatings} />
      </div>
    </div>
  );
}

export default ViewEvent;

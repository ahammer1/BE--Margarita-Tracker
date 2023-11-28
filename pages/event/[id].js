import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, Button, Row, Col,
} from 'react-bootstrap';
import Link from 'next/link';
import RatingCard from '../../components/RatingCard';
import { useAuth } from '../../utils/context/authContext';
import { deleteSingleEvent, getSingleEvent } from '../../api/eventData';
import { createRatings, getRatings } from '../../api/ratingData';
import RatingForm from '../../components/Forms/RatingForm';
import { checkUser } from '../../utils/auth';

function ViewEvent() {
  const [eventDetails, setEventDetails] = useState({});
  const [ratings, setRatings] = useState([]);
  const router = useRouter();
  const [, setAuthUser] = useState();
  const { user } = useAuth();
  const { id } = router.query;

  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${eventDetails.name}?`)) {
      deleteSingleEvent(eventDetails.id).then(() => router.push('/'));
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

  const createRating = async (eventId, ratingData) => {
    try {
      await createRatings(eventId, ratingData);
      getEventDetails();
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const formattedDateTime = new Date(eventDetails.dateTime).toLocaleString();

  useEffect(() => {
    getEventDetails();
    checkUser(user.id).then((data) => setAuthUser(data));
  }, [id]);

  return (
    <div className="container">
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={eventDetails.image}
              alt={eventDetails.name}
              style={{ height: '350px' }}
            />
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="eventTitle">{eventDetails.name}</Card.Title>
              <p><strong>Description:</strong> {eventDetails.description}</p>
              <p><strong>Type:</strong> {eventDetails.type}</p>
              <p><strong>Date Time:</strong> {formattedDateTime}</p>
            </Card.Body>
          </Card>
          {eventDetails?.userId === user.id && (
            <div className="buttons">
              <Link href={`/event/edit/${eventDetails.id}`} passHref>
                <Button className="editBtn" variant="outline-info">
                  EDIT
                </Button>
              </Link>
              <Button
                variant="outline-warning"
                onClick={deleteThisEvent}
                className="deleteBtn ml-2"
              >
                DELETE
              </Button>
            </div>
          )}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <RatingForm eventId={id} onSubmit={createRating} onUpdate={getEventDetails} />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <div className="viewRatings">
            {ratings?.map((rating) => (
              <RatingCard key={rating.id} ratingObj={rating} onUpdate={getEventDetails} />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ViewEvent;

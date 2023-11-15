import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import EventCard from '../components/EventCard';
import { getEvents } from '../api/eventData';

function Events() {
  const [events, setEvents] = useState([]);

  const getAllTheEvents = () => {
    getEvents().then(setEvents);
  };

  useEffect(() => {
    getAllTheEvents();
  }, []);

  return (
    <div className="text-center my-4 eventPage">
      <h1 className="header">TEAMS</h1>
      <Link href="/event/new" passHref>
        <Button size="sm" variant="outline-info" className="createBtn">New Event +</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {events.map((event) => (
          <EventCard key={event.id} eventObj={event} onUpdate={getAllTheEvents} />
        ))}

      </div>
    </div>
  );
}
export default Events;

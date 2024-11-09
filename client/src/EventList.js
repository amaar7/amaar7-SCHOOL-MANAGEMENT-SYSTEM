import React, { useEffect, useState } from 'react';
import './ListStyles.css';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="list-container">
      <h2 className="list-heading">Events</h2>
      <ul className="item-list">
        {events.map(event => (
          <li key={event.id} className="item-card">
            <div className="item-info">
              <h3 className="item-name">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <p className="item-detail">Date: {event.date}</p>
              <p className="item-detail">Location: {event.location}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;

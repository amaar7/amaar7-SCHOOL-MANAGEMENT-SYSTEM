import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './EventForm.css';

const EventForm = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch('http://localhost:5000/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = { title, description, date, location };

    try {
      const response = await fetch('http://localhost:5000/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        setMessage('Event created successfully!');
        setTitle('');
        setDescription('');
        setDate('');
        setLocation('');
        setIsModalOpen(false);
        fetchEvents(); // Refresh events list
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      setMessage('Failed to create event. Please try again.');
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/events/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete event');
        }
        setEvents(events.filter(event => event.id !== id));
      })
      .catch(error => console.error('Error deleting event:', error));
  };

  return (
    <div className="events-container">
      <h2 className="heading">Event List</h2>
      <ul className="event-list">
        {events.map(event => (
          <li key={event.id} className="event-card">
            <div className="event-info">
              <span className="event-title">{event.title}</span>
              <span className="event-date">Date: {event.date}</span>
              <span className="event-location">Location: {event.location}</span>
              <p className="event-description">{event.description}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(event.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {message && <div className="success-message">{message}</div>}
      
      <button onClick={() => setIsModalOpen(true)}>Add New Event</button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Add Event</h2>
        <form onSubmit={handleSubmit} className="event-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event Title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Event Description"
          ></textarea>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
          <button type="submit">Create Event</button>
        </form>
      </Modal>
    </div>
  );
};

export default EventForm;

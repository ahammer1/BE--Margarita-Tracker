import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getRatings = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/ratings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const createRatings = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/ratings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleRating = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/ratings/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const createEventRatings = (eventId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/events/${eventId}/ratings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteEventRating = (eventId, ratingId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/events/${eventId}/ratings/${ratingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete order. Status: ${response.status}`);
      }
      resolve(response);
    })
    .catch(reject);
});

export {
  deleteSingleRating,
  createRatings,
  getRatings,
  createEventRatings,
  deleteEventRating,
};

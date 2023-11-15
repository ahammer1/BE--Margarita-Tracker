import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getEvents = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/events`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const createEvents = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const getSingleEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/events/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const updateEvent = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/events/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteSingleEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  deleteSingleEvent,
  getSingleEvent,
  createEvents,
  updateEvent,
  getEvents,
};

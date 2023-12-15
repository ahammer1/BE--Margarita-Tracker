// import { clientCredentials } from '../utils/client';

const endpoint = 'https://localhost:7027';

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
const createRatings = (eventId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/events/${eventId}/ratings`, {
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

// const createEventRatings = async (eventId, ratingData) => {
//   try {
//     const response = await fetch(`${endpoint}/api/events/${eventId}/ratings`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(ratingData),
//     });

//     if (!response.ok) {
//       throw new Error(`Error creating event ratings: ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error creating event ratings:', error);
//     throw error;
//   }
// };

// const deleteEventRating = (eventId, ratingId) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/api/events/${eventId}/ratings/${ratingId}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Failed to delete order. Status: ${response.status}`);
//       }
//       resolve(response);
//     })
//     .catch(reject);
// });

export {
  deleteSingleRating,
  createRatings,
  getRatings,
  // createEventRatings,
  // deleteEventRating,
};

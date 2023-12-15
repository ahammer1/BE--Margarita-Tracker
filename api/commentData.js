const endpoint = 'https://localhost:7027';

const getComments = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const createComments = (recipeId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/recipes/${recipeId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleComment = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  deleteSingleComment,
  createComments,
  getComments,
};

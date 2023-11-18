// import { clientCredentials } from '../utils/client';

const endpoint = 'https://localhost:7027';

const getRecipes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/recipes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const createRecipes = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});
const getSingleRecipe = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/recipes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const updateRecipe = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/recipes/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteSingleRecipe = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/recipes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  deleteSingleRecipe,
  getSingleRecipe,
  createRecipes,
  updateRecipe,
  getRecipes,
};

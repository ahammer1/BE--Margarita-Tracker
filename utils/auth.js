import firebase from 'firebase/app';
import 'firebase/auth';
// import { clientCredentials } from './client';

const dbUrl = 'https://localhost:7027';
console.log(dbUrl, 'dbudl');
const checkUser = async (uid) => {
  const resp = await fetch(`${dbUrl}/checkuser/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (resp.status === 404) {
    return {};
  }

  return resp.json();
};

const registerUser = (userInfo) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/register`, {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn, //
  signOut,
  checkUser,
  registerUser,
};

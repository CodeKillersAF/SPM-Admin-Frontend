import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAt1ragtNFdze9_irfF4u7PFI6xXgGDg3I",
    authDomain: "restaurant-management-8ecc7.firebaseapp.com",
    projectId: "restaurant-management-8ecc7",
    storageBucket: "restaurant-management-8ecc7.appspot.com",
    messagingSenderId: "948510324875",
    appId: "1:948510324875:web:93bf75701b91d51afe3c8e",
    measurementId: "G-VE0Z1B6XN4"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const storage = firebase.storage();

  export {
      storage , firebase as default
  }
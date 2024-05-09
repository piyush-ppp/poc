// Using the newer Firebase Modular SDK (v9+)
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

let a ={
  apiKey: "AIzaSyDEx3a3JzjOUk9SWooBgGTgzAvyKttlL00",
  authDomain: "test-c1ec0.firebaseapp.com",
  projectId: "test-c1ec0",
  storageBucket: "test-c1ec0.appspot.com",
  messagingSenderId: "189876240386",
  appId: "1:189876240386:web:1378ec47b8f9559c05271b",
  measurementId: "G-Z9ZD7PQHM2"
}

firebase.initializeApp(a);

const messaging = firebase.messaging();





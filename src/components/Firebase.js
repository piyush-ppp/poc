// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, isSupported } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEx3a3JzjOUk9SWooBgGTgzAvyKttlL00",
    authDomain: "test-c1ec0.firebaseapp.com",
    projectId: "test-c1ec0",
    storageBucket: "test-c1ec0.appspot.com",
    messagingSenderId: "189876240386",
    appId: "1:189876240386:web:1378ec47b8f9559c05271b",
    measurementId: "G-Z9ZD7PQHM2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let messaging;

// Check if messaging is supported
isSupported().then((isSupported) => {
    if (isSupported) {
        messaging = getMessaging(app);
    } else {
        console.log("Firebase messaging is not supported in this environment.");
    }
});

export { messaging };

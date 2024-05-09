import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import Layout from './components/Layout';
import Github from './components/Github';
import Weather from './components/Weather';
import Stripe from './components/Stripe';
import Employee from './components/Employee';
import { messaging } from './components/Firebase';  

function App() {
  useEffect(() => {
    if (messaging) {
      messaging.requestPermission()
        .then(async function() {
          const token = await messaging.getToken();
          console.log('Notification permission granted.');
          console.log('Token:', token);
          // You might want to send the token to your server here to store it
        })
        .catch(function(err) {
          console.log('Unable to get permission to notify.', err);
        });

      messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/github" element={<Github />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/stripe" element={<Stripe />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

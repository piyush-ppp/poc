import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const location = useLocation();
  const { username } = location.state || { username: 'Guest' }; // Fallback to 'Guest' if no username
  const data = useSelector((state)=>state.user.weatherData);


  console.log("stored data in redux ", data);
  return (
    <div>
      <h1>Hello, {username}</h1>
    </div>
  );
}

export default Home;

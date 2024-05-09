import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useApi from '../hooks/useApi';
import { updateWeather } from './slice';
import { useDispatch } from 'react-redux';

// Custom Hook for API Calls
// const useApi = (url) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await axios.get(url);
//         setData(result.data);
//       } catch (error) {
//         setError(error);
//       }
//       setLoading(false);
//     };
    
//     fetchData();
//   }, [url]);

//   return { data, loading, error };
// };

// Higher Order Component for Fetching Data
const withApi = (Component, url) => props => {
  const { data, loading, error } = useApi(url);
  return <Component data={data} loading={loading} error={error} {...props} />;
};


const useWeather = (latitude, longitude, apiKey) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchWeather = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        const result = await axios.get(url);
        setData(result.data);
      } catch (err) {
        setError('Unable to fetch weather data.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude, apiKey]);

  return { data, loading, error };
};


const Weather = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState({ loaded: false, coordinates: { lat: "", lon: "" }});
  const API_KEY = '8f8c2675fa275e6ce2ec39c2252522ba'

  const onSuccess = location => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      },
    });
  };

  const onError = error => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  const { data, loading, error } = useWeather(location.coordinates.lat, location.coordinates.lon, API_KEY);

  if (!location.loaded) return <p>Loading location...</p>;
  if (location.error) return <p>Error fetching location: {location.error.message}</p>;
  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No weather data available.</p>;
  if(data){
    dispatch(updateWeather(data));
  }

  return (
    <div>
      <h1>Weather in {data.name}</h1>
      <p><strong>Temperature:</strong> {data.main.temp}°C</p>
      <p><strong>Feels Like:</strong> {data.main.feels_like}°C</p>
      <p><strong>Humidity:</strong> {data.main.humidity}%</p>
      <p><strong>Pressure:</strong> {data.main.pressure} hPa</p>
      <p><strong>Wind:</strong> {data.wind.speed} m/s</p>
      <div>
        {data.weather.map((item, index) => (
          <div key={index}>
            <strong>{item.main}</strong>: {item.description}
            <img src={`http://openweathermap.org/img/w/${item.icon}.png`} alt="Weather icon" />
          </div>
        ))}
      </div>
    </div>
  );
};


export default Weather;

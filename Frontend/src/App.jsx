import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      setError("");
      // Notice http://localhost:5000 added here:
      const response = await axios.get(`http://localhost:5000/api/weather/${city}`);
      setWeather(response.data);
    } catch (err) {
      setWeather(null);
      setError("City not found or API key invalid.");
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather Forecast App</h1>
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p className="condition">{weather.weather[0].description}</p>
          <div className="details">
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
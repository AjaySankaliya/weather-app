import React, { useState } from "react";
import "./Weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setError("");
    setWeather(null);

    if (!city.trim()) {
      setError("Please enter city");
      return;
    }
    const API_KEY = import.meta.env.VITE_API_KEY;
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
        return;
      }

      setWeather({
        name: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
      });
    } catch {
      setError("Failed to fetch weather data");
    }
  };

  return (
    <div className="weather-container">
      <h1 className="weather-title">🌤 Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.country}
          </h2>
          <img src={weather.icon} alt="Weather Icon" />
          <h3>{weather.temp}°C</h3>
          <p>{weather.condition}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;

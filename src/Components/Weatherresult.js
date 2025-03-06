import React, { useEffect, useState } from "react";
import '../Styles/weather.css';
import Citys from "./Cities";
import { Link } from 'react-router-dom';

function Weatherresult() {
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState(JSON.parse(localStorage.getItem("weatherData")) || []);
  const [temperatureUnit, setTemperatureUnit] = useState(localStorage.getItem("temperature") || "Celsius");

  useEffect(() => {
    localStorage.setItem("weatherData", JSON.stringify(weatherData));
    localStorage.setItem("temperature", temperatureUnit);
  }, [weatherData, temperatureUnit]);

  const handleCityInput = (e) => {
    setCityInput(e.target.value);
  };
  
   const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  }

  const fetchWeather = async () => {
    if (!cityInput) return;
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=7a3ed539c9aa4341a9b74827251202&q=${cityInput}&aqi=no`);
      const result = await response.json();
      if (result.error) {
        alert("City not found. Please try again.");
        return;
      }
      setWeatherData((prevRecords) => [...prevRecords, result]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const convertToFahrenheit = (celsius) => {
    return celsius !== undefined ? Math.round((celsius * 9/5) + 32) : "N/A";
  };

  return (
    <div className="result">
      <div className="search">
        <Link to="/Settings">Settings</Link>
        <input type="text" placeholder="Search a city..." onChange={handleCityInput} value={cityInput} />
        <button onClick={fetchWeather}>Search</button>
      </div>
      <div className="container">
        {weatherData.map(item => (
          <Citys 
            key={item.location?.name || Math.random()}
            country={item.location?.country || "Unknown"} 
            cityName={item.location?.name || "Unknown"} 
            time={item.location?.localtime?.slice(10) || "N/A"} 
            date={item.location?.localtime?.slice(0,10) || "N/A"} 
            icon={item.current?.condition?.icon || ""} 
            temp={{
              temp_c: item.current?.temp_c !== undefined ? item.current.temp_c : "N/A",
              temp_f: item.current?.temp_c !== undefined ? convertToFahrenheit(item.current.temp_c) : "N/A"
            }}
            description={item.current?.condition?.text || "No data"}
          />
        ))}
      </div>
    </div>
  );
}

export default Weatherresult;
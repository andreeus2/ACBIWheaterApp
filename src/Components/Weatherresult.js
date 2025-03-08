import React, { useEffect, useState } from "react";
import '../Styles/weather.css';
import Citys from "./Cities";
import { Link } from 'react-router-dom';

function Weatherresult() {
  const [weatherData, setWeatherData] = useState([]);
  const [cityInput, setCityInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error message
  const [soundEffects, setSoundEffects] = useState(JSON.parse(localStorage.getItem("soundEffects")) ?? true);

  // Load weather data from localStorage on component mount
  useEffect(() => {
    const storedWeatherData = JSON.parse(localStorage.getItem("weatherData")) || [];
    setWeatherData(storedWeatherData);
  }, []);

  const playSound = (sound) => {
    if (soundEffects) {
        const audio = new Audio("/sounds/sound.mp3"); // Correct path to your sound file
        audio.play();
    }
  };

  const cityText = (e) => {
    setCityInput(e.target.value);
    setErrorMessage(""); // Clear error message on input change
  }

  const fetchWeather = async () => {
    // Validate if the input is empty
    if (!cityInput.trim()) {
      setErrorMessage("Please write city"); // Show error message if input is empty
      return; // Stop the search process
    }
    
    // If input is valid, proceed with fetching weather data
    try {
      const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=7a3ed539c9aa4341a9b74827251202&q=${cityInput}&aqi=no`);
      const result = await data.json();
      
      if (result.error) {
        setErrorMessage("City not found. Please try again."); // Show error if city is not found
        return;
      }
      
      const newData = [result];
      const updatedWeatherData = [...weatherData, ...newData];
      setWeatherData(updatedWeatherData);
      localStorage.setItem("weatherData", JSON.stringify(updatedWeatherData)); // Save to localStorage
      setCityInput(""); 
      playSound("addCity"); // Play sound when adding a city
    } catch (error) {
      setErrorMessage("Error fetching weather data. Please try again."); // Handle errors during fetch
      console.error("Error fetching weather data:", error);
    }
  }

  const handleDelete = (cityName) => {
    const updatedWeatherData = weatherData.filter(item => item.location.name !== cityName);
    setWeatherData(updatedWeatherData);
    localStorage.setItem("weatherData", JSON.stringify(updatedWeatherData)); // Save updated data to localStorage
    playSound("deleteCity"); // Play sound when deleting a city
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cityInput]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  const convertToFahrenheit = (celsius) => {
    return celsius !== undefined ? Math.round((celsius * 9/5) + 32) : "N/A";
  };

  return (
    <div className="result">
      <div className="search">
        <Link to="/Settings">Settings</Link>
        <input 
          type="text" 
          placeholder="Search a city..." 
          value={cityInput} 
          onChange={cityText}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Show error message */}
      
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
            handleDelete={handleDelete} // Pass handleDelete function as prop
          />
        ))}
      </div>
    </div>
  );
}

export default Weatherresult;

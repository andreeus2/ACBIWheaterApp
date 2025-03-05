import React, { useEffect, useState } from "react"
import '../Styles/weather.css'
import Citys from "./Cities"
import { Link } from 'react-router-dom';

function Weatherresult(test) {
  const [weatherdata, setweatherdata] = useState([]);
  const [cityinput, setCityinput] = useState(""); 

  const citytext = (e) => {
    setCityinput(e.target.value);
  }

  const fetchWeather = async () => {
    const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=7a3ed539c9aa4341a9b74827251202&q=${cityinput}&aqi=no`);
    const result = await data.json();
    const newData = [result];
    setweatherdata((prevRecords) => [...prevRecords, ...newData]);
    setCityinput(""); 
  }

  const handleDelete = (cityName) => {
    setweatherdata(weatherdata.filter(item => item.location.name !== cityName)); 
  }

  return (
    <div className="result">
      <div className="search">
        <Link to="/Settings">Settings</Link>
        <input 
          type="text" 
          placeholder="Search a city..." 
          value={cityinput} 
          onChange={citytext}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>
      <div className="container" >
        {weatherdata.map(item => (
          <div key={item.location.name} className="weather-item">
            <div className="city-info">
              <p>{item.location.name}</p>
              <p>{item.location.country}</p>
              <p>{item.location.localtime.slice(0, 10)}</p>
              <p>{item.location.localtime.slice(10)}</p>
            </div>

            <div className="icon-info">
              <img src={`https:${item.current.condition.icon}`} alt={item.current.condition.text} />
              <p className="condition-text">{item.current.temp_c}°C</p>
              <p className="condition-text">{item.current.condition.text}</p>
            </div>

            <button onClick={() => handleDelete(item.location.name)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Weatherresult;

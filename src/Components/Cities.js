import React from "react"
import '../Styles/cities.css';

function Citys({ country, cityName, time, date, icon, temp, description }) {
    const temperatureUnit = localStorage.getItem("temperature") || "Celsius";
    const displayedTemp = temperatureUnit === "Celsius" ? temp.temp_c + " °C" : temp.temp_f + " °F";
    return (
        <div className="result">
            <h1>{cityName + ", " + country.slice(0,2).toUpperCase()}</h1>
            <h2>{time}</h2>
            <p>{date}</p>
            <div className="description">
                <img src={icon} alt="Weather Icon" />
                <h1>{displayedTemp}</h1>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default Citys;
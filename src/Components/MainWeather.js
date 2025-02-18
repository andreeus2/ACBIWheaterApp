import React, { useEffect, useState } from "react";
import '../Styles/MainWeather.css';

const MainWeather = () =>{
    
    const [wheater, setWheater] = useState([]);

    const fetchWeather = async () =>{
        const response = await fetch("http://api.weatherapi.com/v1/current.json?key=7a3ed539c9aa4341a9b74827251202&q=Sydney&aqi=no");
        const data = await response.json();
        setWheater(data.location);
        console.log(data)
    }
    useEffect(() => {
      fetchWeather()
   }, []);

    return (
            <span>
                <p>
                    Press + to add cities from around the world to view their data, time and wheater
                </p>
                <h1> {wheater.name}, {wheater.country}</h1>
                <h2> {wheater.country}</h2>
                <h2> {wheater.localtime}</h2>
            </span>
    );
}

export default MainWeather;
import React, { useEffect, useState } from "react"
import '../Styles/weather.css'
import Citys from "./Cities"
import {   Link } from 'react-router-dom';

function Weatherresult (test){
    
  let cityinput=""
  let newData=[];
  const [weatherdata,setweatherdata]=useState([]);

  function citytext(){
    document.querySelector("input").addEventListener("input", (e) => {
      e.preventDefault();
      cityinput=e.target.value;
      })
  }
  const fetchWeather = async () =>{
    const data= await fetch(`http://api.weatherapi.com/v1/current.json?key=7a3ed539c9aa4341a9b74827251202&q=${cityinput}&aqi=no`)
    const result = await data.json();
    newData = [result];
    setweatherdata((prevRecords) => [...prevRecords, ...newData]);
  }
    return (
      <div className="result">
        <div className="search">
          <Link to="/Settings">Settings</Link>
          <input type="text" placeholder="Search a city..." onChange={citytext }/>
          <button onClick={fetchWeather}>Search</button>
        </div>
        <div className="container">
          {console.log("ivan =",weatherdata)}

          {weatherdata.map(item=><Citys 
          country={item.location.country} 
          cityName={item.location.name} 
          time={item.location.localtime.slice(10)} 
          date={item.location.localtime.slice(0,10)} 
          icon={item.current.condition.icon} 
          temp={item.current}
          description={item.current.condition.text}/>)}
        </div>
      </div>
    )
}

export default Weatherresult
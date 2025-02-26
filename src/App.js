import './App.css';
import Weather from './Weatherresult';
import React,{ useState } from "react"


function App() {
  const APP_KEY = 'c3b4e9e02cf54fc7be283032252502'
  let cityinput=""
  const [weatherdata,setweatherdata]=useState([])

  function citytext()
  {
    document.querySelector("input").addEventListener("input", (e) => {
      e.preventDefault();
      cityinput=e.target.value;
      console.log(cityinput)
    })
  }
  async function getdata(value)
  {
    if(value== "") return;
    const data= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=${value}&days=3`)
    const result = await data.json();
    setweatherdata(result.forecast.forecastday)
    console.log(result.forecast.forecastday)
    }
  return (
    <div>
      <div className="search">
        <input type="text" placeholder="Search a city..." onChange={citytext }/>
        <button onClick={()=>getdata(cityinput)}>Search</button>
      </div>
       {weatherdata.map(item => (<Weather key={item.date} date={item.date} mintemp={item.day.mintemp_c}
       maxtemp={item.day.maxtemp_c} condition={item.day.condition.text} icon={item.day.condition.icon} />))}
    </div>
  );
}

export default App;


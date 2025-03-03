import '../Styles/App.css';
import Header from './Header';  
import MainWeather from './MainWeather';  
import Main from '../Main';
import axios from "axios";
import { useState } from 'react';


function App() {
  let [data, setData] = useState({})
  let [location, setLocation] = useState('')

  const url = "http://api.weatherapi.com/v1/current.json?key=7a3ed539c9aa4341a9b74827251202&q=Sydney&aqi=no";
  
  
  let searchLocation = (event) => {
    if (event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
    }
  }

  return (
    <div>
        <header className="header">
            <div className="search">
                <input 
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyUpCapture={searchLocation}
                    type="text"
                    placeholder='Enter Location'
                />
            </div>
            
            <nav>
                <ul>
                    <h2>Wheater Time</h2>
                </ul>
            </nav>
        </header>
          
        
        <MainWeather/>
    </div>
  );
}

export default App;


//hiiiiii 

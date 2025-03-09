import React from "react"
import '../Styles/cities.css';



function Citys({ country, cityName, time, date, icon, temp, description, handleDelete }) {

    const temperatureUnit = localStorage.getItem("temperature") || "Celsius";
    const displayedTemp = temperatureUnit === "Celsius" ? temp.temp_c + " °C" : temp.temp_f + " °F";
    

    <button onClick={() => handleDelete(cityName)} className="delete-button">Delete</button>


    
    return (
      
        <div className="weather-item">
           
            <div className="city-info">
                <p>{cityName +", "+ country.slice(0,2).toUpperCase()}</p>
                <p>{time}</p>
                <p>{date}</p>
            
            </div>
            

            <div className="icon-info">
                <img src={icon}/>
                <h1>{displayedTemp}</h1>
                <p>{description}</p>
            </div>

              <button onClick={() => handleDelete(cityName)} className="delete-button">Delete</button>
        </div>  
       


    );

        {/* <div className="result">
            <h1>{cityName +", "+ country.slice(0,2).toUpperCase()}</h1>
            <h2>{time}</h2>
            <p>{date}</p>
            <div className="description">
                <img src={icon} alt=""/>
                <h1>{temp.temp_c+" "+tempUnit}</h1>
                <p>{description}</p>
            </div>
            <button onClick={() => handleDelete(item.location.name)} className="delete-button">Delete</button>
        </div> */}

   
}

export default Citys;
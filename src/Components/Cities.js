import React from "react"
import '../Styles/cities.css';

function Citys({country,cityName,time,date, icon, temp, description}) {
    const tempUnit = '°C';
    return (
        <div className="result">
            <h1>{cityName +", "+ country.slice(0,2).toUpperCase()}</h1>
            <h2>{time}</h2>
            <p>{date}</p>
            <div className="description">
                <img src={icon} alt=""/>
                <h1>{temp.temp_c+" "+tempUnit}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Citys 
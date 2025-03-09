import "../Styles/settings.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Main.js";
import "./Weatherresult";

const Settings = () => {
  const navigate = useNavigate();

  // States to handle user preferences
  const [temperature, setTemperatureUnit] = useState(localStorage.getItem("temperature") || "Celsius");
  const [textSize, setTextSize] = useState(localStorage.getItem("textSize") || "Normal");
  const [soundEffects, setSoundEffects] = useState(JSON.parse(localStorage.getItem("soundEffects")) ?? true);
  const [brightness, setBrightness] = useState(localStorage.getItem("brightness") || 50); // Initial brightness from localStorage

  // Apply the brightness globally using CSS with a minimum threshold
  
  useEffect(() => {
    let fontSize;
    if (textSize === "Normal") {
      fontSize = "16px";
    } else if (textSize === "Large") {
      fontSize = "20px";
    } else if (textSize === "Extra Large") {
      fontSize = "24px";
    }
    document.documentElement.style.setProperty('--font-size', fontSize); // Set font size globally
  }, [textSize]);

  // Save all settings to localStorage
  useEffect(() => {
    localStorage.setItem("temperature", temperature);
    localStorage.setItem("textSize", textSize);
    localStorage.setItem("soundEffects", soundEffects);
    localStorage.setItem("brightness", brightness);
  }, [temperature, textSize, soundEffects, brightness]);

  const resetDefaults = () => {
    setTemperatureUnit("Celsius");
    setTextSize("Normal");
    setSoundEffects(true);
    setBrightness(50);
    localStorage.setItem("temperature", "Celsius");
    localStorage.setItem("textSize", "Normal");
    localStorage.setItem("soundEffects", true);
    localStorage.setItem("brightness", 50);
  };

  const saveSettings = () => {
    alert("Settings saved successfully!");
    navigate(-1);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Settings</h2>
      
      <div>
        <h3>Temperature unit</h3>
        <label>
          <input type="radio" value="Celsius" checked={temperature === "Celsius"} onChange={() => setTemperatureUnit("Celsius")} /> Celsius
        </label>
        <label>
          <input type="radio" value="Fahrenheit" checked={temperature === "Fahrenheit"} onChange={() => setTemperatureUnit("Fahrenheit")} /> Fahrenheit
        </label>
      </div>
      
      <div>
        <h3>Text size</h3>
        <label>
          <input type="radio" value="Normal" checked={textSize === "Normal"} onChange={() => setTextSize("Normal")} /> Normal
        </label>
        <label>
          <input type="radio" value="Large" checked={textSize === "Large"} onChange={() => setTextSize("Large")} /> Large
        </label>
        <label>
          <input type="radio" value="Extra Large" checked={textSize === "Extra Large"} onChange={() => setTextSize("Extra Large")} /> Extra Large
        </label>
      </div>
      
      <div>
        <h3>Sound effects</h3>
        <label>
          <input type="checkbox" checked={soundEffects} onChange={() => setSoundEffects(!soundEffects)} /> On
        </label>
      </div>
      
      <div>
        <h3>Brightness</h3>
        <input 
          type="range" 
          min="10" 
          max="100" 
          value={brightness} 
          onChange={(e) => setBrightness(e.target.value)} 
        />
        <p>{brightness}%</p> {/* Display the current brightness value */}
      </div>
      
      <div>
        <h3>Weather Time</h3>
        <p>(c) 2025 ABC Solutions Pty Ltd</p>
        <p>Version: 1.0</p>
        <p>Last update: 9 March 2025</p>
        <p>Build date: 4 February 2025</p>
        <p>Developer: Burak Kılıç, Ivan Trochez, Mikołaj Talik</p>
      </div>
      
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/")}>Back</button>
        <button onClick={resetDefaults} style={{ marginLeft: "10px" }}>Reset default</button>
        <button onClick={saveSettings} style={{ marginLeft: "10px" }}>Save settings</button>
      </div>
    </div>
  );
};

export default Settings;

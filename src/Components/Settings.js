import "../Styles/settings.css"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Main.js"
import "./Weatherresult"

const Settings = () => {
  const navigate = useNavigate();

  const [temperature, setTemperatureUnit] = useState(localStorage.getItem("temperature") || "Celsius");
  const [textSize, setTextSize] = useState(localStorage.getItem("textSize") || "Normal");
  const [soundEffects, setSoundEffects] = useState(JSON.parse(localStorage.getItem("soundEffects")) ?? true);
  const [brightness, setBrightness] = useState(localStorage.getItem("brightness") || 50);

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
        <input type="range" min="0" max="100" value={brightness} onChange={(e) => setBrightness(e.target.value)} />
      </div>
      
      <div>
        <h3>Weather Time</h3>
        <p>(c) 2022 ABC Solutions Pty Ltd</p>
        <p>Version: 1.0</p>
        <p>Last update: 4 February 2022</p>
        <p>Build date: 4 February 2022</p>
        <p>Developer: John Doe</p>
        <p>Student number: 12345</p>
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

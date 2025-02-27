import React from "react";
import "../Styles/settings.css"

function Settings(){
    return(
        <div >
            <div className="title">
                <button value="back"/>
                <button value="Reset default"/>
                <h2>Settings</h2>
            </div>
            <div className="body">
                <div className="temeperature">
                    <p>temeperature Units</p>
                </div>
            </div>
        </div>
    )
}

export default Settings;

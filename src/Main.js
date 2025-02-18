import React from "react";
import { Switch, Route } from "react-router-dom";
import MainWeather from "./Components/MainWeather";
import Header from "./Components/Header";


const Main = () =>{
    return(
        <main>
            <Switch>
                <Route exact path="/Gestionventas" component={Header} />
            </Switch>
            <Switch>
                <Route exact path="/Gestionventas" component={MainWeather} />
            </Switch>
        </main>
    )
}

export default Main;
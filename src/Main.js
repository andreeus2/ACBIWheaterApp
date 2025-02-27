import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Settings from './Components/Settings';
import Weatherresult from './Components/Weatherresult';

const Main=() =>{
    return (
    
      <Routes>
        <Route path="/" element={<Weatherresult />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    
    )
}

export default Main
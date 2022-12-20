import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Preferences from "./pages/Preferences";

// Components
import Navbar from "./components/Navbar/Navbar.js";
import Login from './components/Login/Login'; 


function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}

function App() {
    const token = getToken();

    if(!token) {
        return <Login setToken={setToken} />
    }
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Navbar />
                <Routes> 
                    <Route path="/"  element={<Dashboard />} />
                    <Route path="/preferences" element={<Preferences />} /> 
                </Routes> 
            </BrowserRouter>
        </div>
    );
}

export default App;

import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router';
import logo from './logo.svg';
import Canvas from './components/Canvas';
import './App.css';
import Loader from './core/loader';

const App = ({name}) => {

    const init = () => {
        console.log('loader is', Loader)
    };

    init();

    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to SanPlay</h2>
            </div>
            <Canvas/>
            <p className="App-intro">
            </p>
        </div>
    )
}

export default App;

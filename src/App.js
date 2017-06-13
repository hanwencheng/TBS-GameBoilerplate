import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router';
import logo from './logo.svg';
import {
    Canvas,
    Self
} from './containers';
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
            <div className="App-main">
                <Self />
                <Canvas/>
                <div className="App-enemy">
                </div>
            </div>
        </div>
    )
}

export default App;

import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router';
import logo from './wu.png';
import {
    Canvas,
    Self,
    Enemy,
} from './containers';
import './App.css';
import {default as hanwenc, store }from './hanwen'
import DevTools from './helper/DevTool'

class App extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="App">
        <DevTools store={store}/>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to SanPlay</h2>
        </div>
        <div className="App-main">
          <Self />
          <Canvas/>
          <Enemy/>
          <div >
          </div>
        </div>
      </div>
    )
  }

}

export default hanwenc(App);

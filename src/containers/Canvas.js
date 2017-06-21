import React, { Component } from 'react';
import './Canvas.css';
import Container from '../core/playground';
import {canvasSize} from '../constant'
import Render from '../engine/render'
import hanwenc from '../hanwen'

class Canvas extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log('in canvas props are', this.props)
    var context = document.getElementById('demo').getContext('2d');
    Render.run(context);
  }


  render(){
    return (
      <div className = "App-canvas" id="canvas">
        <h2 className = "title" > Canvas </ h2 >
        <canvas id="demo" width={canvasSize} height={canvasSize}/>
      </div >
    )
  }

}

export default hanwenc(Canvas);
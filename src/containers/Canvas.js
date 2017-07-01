import React, { Component } from 'react';
import './Canvas.css';
import Container from '../core/playground';
import {canvasSize, maximumDelta} from '../constant'

import hanwenc from '../hanwen'
import loader from '../core/loader'
import sprites from '../engine/sprites';
import * as canvasUtil from './starter';

class Canvas extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    var that = this;
    var p = loader.loadList(this.props.canvas.images, this.props.actions, sprites);
    //Each frame

    const tick = (elapsed) => {
      window.requestAnimationFrame(tick);
      canvasUtil.updateCanvas(that.props, elapsed);
      canvasUtil.renderCanvas(that.props);
    }

    Promise.all(p).then(function (loaded) {
      console.log('loaded are', loaded)
      canvasUtil.initCanvas(that.props);
      window.requestAnimationFrame(tick);
    });
  }

  render(){

    const onMouseMove = (event) => {
      canvasUtil.selectSprite(event, this.props)
    }

    return (
      <div className = "App-canvas" id="canvas">
        <h2 className = "title" > Canvas </h2 >
        <canvas id="demo" width={canvasSize} height={canvasSize} onMouseMove={onMouseMove}/>
      </div >
    )
  }

}

export default hanwenc(Canvas);
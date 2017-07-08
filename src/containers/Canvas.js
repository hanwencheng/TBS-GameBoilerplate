import React, { Component } from 'react';
import './Canvas.css';
import Container from '../core/playground';
import {canvasSize, maxDelta} from '../constant'
import _ from 'lodash'
import hanwenc from '../hanwen'
import loader from '../core/loader'
import sprites from '../engine/sprites';
import canvasUtils from '../canvas';

console.log('utils', canvasUtils)
class Canvas extends Component {

  constructor(props){
    super(props);
  }

  updateContextDimension = () => {
    canvasUtils.setContextSize(this.props)
  }

  componentDidMount(){
    var that = this;
    var p = loader.loadList(this.props.canvas.images, this.props.actions, sprites);
    //Each frame

    const tick = (elapsed) => {
      window.requestAnimationFrame(tick);
      canvasUtils.draw(that.props, elapsed);
    }

    Promise.all(p).then(function (loaded) {
      console.log('loaded are', loaded)
      canvasUtils.initCanvas(that.props);
      window.addEventListener("resize", that.updateContextDimension);
      window.requestAnimationFrame(tick);
    });
  }

  componentWillUnmount(){
    //window.cancelAnimationFrame(requestID);
    window.removeEventListener("resize", this.updateContextDimension);
  }

  render(){

    const onMouseMove = _.partial(canvasUtils.onHover, _, this.props)
    const onClick = _.partial(canvasUtils.onClick, _, this.props)

    return (
      <div className = "App-canvas" id="canvas">
        <h2 className = "title" > Canvas </h2 >
        <canvas id="demo" width={canvasSize} height={canvasSize}
                onMouseMove={onMouseMove}
                onClick={onClick}
        />
      </div >
    )
  }

}

export default hanwenc(Canvas);
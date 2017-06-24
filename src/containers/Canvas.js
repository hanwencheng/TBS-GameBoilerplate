import React, { Component } from 'react';
import './Canvas.css';
import Container from '../core/playground';
import {canvasSize, maximumDelta} from '../constant'
import {drawLayer} from '../engine/render'
import hanwenc from '../hanwen'
import Loader from '../core/loader'
import Keyboard from '../core/keyboard'
import {keyboard} from '../constant'
import map from '../engine/tiles'
import png from '../engine/tiles.png'

class Canvas extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    var that = this;
    var tileAtlas;

    const load = function () {
      return [
        Loader.loadImage('tiles', png),
      ];
    };

    const init = function () {
      Keyboard.registerKey(
        [keyboard.LEFT, keyboard.RIGHT, keyboard.UP, keyboard.DOWN]);
      tileAtlas = Loader.getImage('tiles');
      that.props.actions.camera.init(map, canvasSize, canvasSize)
    };

    const update = function (delta) {
      // handle camera movement with arrow keys
      var dirx = 0;
      var diry = 0;
      if (Keyboard.isDown(keyboard.LEFT)) { dirx = -1; }
      if (Keyboard.isDown(keyboard.RIGHT)) { dirx = 1; }
      if (Keyboard.isDown(keyboard.UP)) { diry = -1; }
      if (Keyboard.isDown(keyboard.DOWN)) { diry = 1; }

      that.props.actions.camera.move(delta, dirx, diry)
    };


    //Each frame
    const tick = function (elapsed) {
      window.requestAnimationFrame(tick);

      // clear previous frame
      context.clearRect(0, 0, canvasSize, canvasSize);

      // compute delta time in seconds -- also cap it
      var delta = (elapsed - _previousElapsed) / 1000.0;
      delta = Math.min(delta, maximumDelta); // maximum delta of 250 ms
      _previousElapsed = elapsed;

      update(delta);
      render();
    };

    const render = function () {
      // draw map background layer
      drawLayer(context, 0, that.props.canvas.camera, tileAtlas);
      // draw map terrain layer
      drawLayer(context, 1, that.props.canvas.camera, tileAtlas);
    };

    // console.log('in canvas props are', this.props)
    var context = document.getElementById('demo').getContext('2d');
    var _previousElapsed = 0;
    var p = load();
    Promise.all(p).then(function (loaded) {
      init();
      window.requestAnimationFrame(tick);
    });
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
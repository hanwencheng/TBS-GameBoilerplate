import Keyboard from '../../core/keyboard';
import { default as Render} from '../../engine/render'
import map from '../../engine/tiles'
import loader from '../../core/loader'
import {keyboard, canvasSize, maxDelta, maxFPS} from '../../constant/index'
import _ from 'lodash'

//module local state;
let tileAtlas, canvasEl, canvasContext,
    _previousElapsed = 0, delta = 0, tick = 0,
    fps = 30,
    framesThisSecond = 0,
    lastFpsUpdate = 0;

const _updateMove = (props, delta) => {
  // handle camera movement with arrow keys
  let dirx = 0;
  let diry = 0;
  if (Keyboard.isDown(keyboard.LEFT)) { dirx = -1; }
  if (Keyboard.isDown(keyboard.RIGHT)) { dirx = 1; }
  if (Keyboard.isDown(keyboard.UP)) { diry = -1; }
  if (Keyboard.isDown(keyboard.DOWN)) { diry = 1; }

  props.actions.camera.move(delta, dirx, diry)
};

const _updateFrame = (props) => {

}

const _panic = () => {
  tick = 0;
  delta = 0;
}

const _clearCanvas = () => {
  // clear previous frame TODO tobe optimized
  canvasContext.clearRect(0, 0, canvasSize, canvasSize);
}

const _updateTick = (props) => {
  if(++tick >= 15){
    props.actions.context.tick();
    tick = 0;
  }
}


const _updateCanvas = (props, delta) => {
  _updateTick(props);
  _updateMove(props, delta);
}

const _drawCanvas = function (props) {
  _clearCanvas()
  let images = props.canvas.images,
      camera = props.canvas.camera,
      context = props.canvas.context,
      heroes = props.store.heroes.data;
  Render.drawLayers(canvasContext, camera, loader.getImage(images, 'tiles'));
  Render.drawHeroes(canvasContext, images, context, camera, heroes, delta);
  Render.drawMoveRange(canvasContext, camera, context, heroes);
};

const setContextSize = (props) => props.actions.context.setSize(canvasEl.getBoundingClientRect())

const initCanvas = function (props) {
  canvasEl = document.getElementById('demo');
  canvasContext = canvasEl.getContext('2d');
  Keyboard.registerKey(
      [keyboard.LEFT, keyboard.RIGHT, keyboard.UP, keyboard.DOWN]);
  tileAtlas = loader.getImage(props.canvas.images, 'tiles');
  props.actions.camera.init(map, canvasSize, canvasSize)
  setContextSize(props);
};

const draw = (props, elapsed) => {
  //calculate the fps

  // Throttle the frame rate.
  // Time step should much bigger that refresh rat to avoid spiral death.
  // if (elapsed < _previousElapsed + 1000 / maxFPS) {
  //   return;
  // }

  // compute delta time in seconds -- also cap it
  delta = elapsed - _previousElapsed; // maximum delta of 250 ms
  delta = Math.min(delta, 1000 / maxFPS)
  _updateCanvas(props, delta);
  _drawCanvas(props);

  _previousElapsed = elapsed;
};

export default {
  draw,
  setContextSize,
  initCanvas,
}







const backUpDraw = (props, elapsed) => {
  //calculate the fps
  if (elapsed > lastFpsUpdate + 1000) { // update every second
    fps = 0.25 * framesThisSecond + (1 - 0.25) * fps; // compute the new FPS

    lastFpsUpdate = elapsed;
    framesThisSecond = 0;
  }
  framesThisSecond++;

  // Throttle the frame rate.
  // Time step should much bigger that refresh rat to avoid spiral death.
  const timeStep = 1000 / fps
  if (elapsed < _previousElapsed + 1000/fps) {
    return;
  }

  // compute delta time in seconds -- also cap it
  delta += elapsed - _previousElapsed; // maximum delta of 250 ms
  while(delta > timeStep){
    _updateCanvas(props, timeStep);
    delta -= timeStep

    if (++tick >= 240) {
      _panic(); // fix things
      break; // bail out
    }
  }

  _drawCanvas(props);
  _previousElapsed = elapsed;
};

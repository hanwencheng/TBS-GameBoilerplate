import Keyboard from '../core/keyboard';
import {keyboard} from '../constant'
import loader from '../core/loader'
import {canvasSize, maximumDelta} from '../constant'
import {drawLayers, drawHeroes} from '../engine/render'
import map from '../engine/tiles'

//module local state;
let tileAtlas, canvasEl, context,
  _previousElapsed = 0;

const _updateMove = (props, delta) => {
  // handle camera movement with arrow keys
  var dirx = 0;
  var diry = 0;
  if (Keyboard.isDown(keyboard.LEFT)) { dirx = -1; }
  if (Keyboard.isDown(keyboard.RIGHT)) { dirx = 1; }
  if (Keyboard.isDown(keyboard.UP)) { diry = -1; }
  if (Keyboard.isDown(keyboard.DOWN)) { diry = 1; }

  props.actions.camera.move(delta, dirx, diry)
};

const _updateCanvas = () => {
  // clear previous frame TODO tobe optimized
  context.clearRect(0, 0, canvasSize, canvasSize);
}

const init = function (props) {
  canvasEl = document.getElementById('demo');
  context = canvasEl.getContext('2d');
  Keyboard.registerKey(
    [keyboard.LEFT, keyboard.RIGHT, keyboard.UP, keyboard.DOWN]);
  tileAtlas = loader.getImage(props.canvas.images, 'tiles');
  props.actions.camera.init(map, canvasSize, canvasSize);
};

const update = (props, elapsed) => {

  // compute delta time in seconds -- also cap it
  var delta = (elapsed - _previousElapsed) / 1000.0;
  delta = Math.min(delta, maximumDelta); // maximum delta of 250 ms
  _previousElapsed = elapsed;

  _updateCanvas()
  _updateMove(props, delta);
}

const renderCanvas = function (props) {
  let images = props.canvas.images,
      camera = props.canvas.camera,
      heroes = props.store.heroes.data;
  drawLayers(context, camera, loader.getImage(images, 'tiles'));
  drawHeroes(context, images, camera, heroes);
};

const selectSprite = (evt) => {
  var mousePos = getMousePos(context, evt);
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
};

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}



const tick = function (props) {

};

export {update, init, renderCanvas}
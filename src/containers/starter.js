import Keyboard from '../core/keyboard';
import {keyboard} from '../constant'
import loader from '../core/loader'
import {canvasSize, maximumDelta} from '../constant'
import {drawLayers, drawHeroes} from '../engine/render'
import map from '../engine/tiles'
import _ from 'lodash'

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

const setContextSize = (props) => props.actions.context.setSize(canvasEl.getBoundingClientRect())

const initCanvas = function (props) {
  canvasEl = document.getElementById('demo');
  context = canvasEl.getContext('2d');
  Keyboard.registerKey(
    [keyboard.LEFT, keyboard.RIGHT, keyboard.UP, keyboard.DOWN]);
  tileAtlas = loader.getImage(props.canvas.images, 'tiles');
  props.actions.camera.init(map, canvasSize, canvasSize)
  setContextSize(props);
};

const updateCanvas = (props, elapsed) => {

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

const _getMousePosition = (canvasSize, evt) => ({
  x: evt.clientX - canvasSize.left,
  y: evt.clientY - canvasSize.top,
})

const _isInSprite = (sprites, mousePosition, camera) => {
  console.log('camera.x ', mousePosition.x)
  let relateX = mousePosition.x + camera.x;
  let relateY = mousePosition.y + camera.y;
  return (
  sprites.left <= relateX &&
  relateX <= sprites.right &&
  sprites.top <= relateY &&
  relateY <= sprites.bottom
  )
}

const selectSprite = (evt, props) => {
  var mousePos = _getMousePosition(props.canvas.context.size, evt);
  var rectList = props.store.heroes.sortedMap

  var found;
  for(let i = rectList.length - 1; i >= 0 ;i-- ){
    let rect = rectList[i];
    if(_isInSprite(rect, mousePos, props.canvas.camera)){
      found = rect.id
      break;
    }
  }
  console.log('found is', found)
  if ( found && props.canvas.context.highlight !== found){

    props.actions.context.setHighlight(found);
  }
  return found;
};




export {
  updateCanvas, initCanvas, renderCanvas, selectSprite, setContextSize
}
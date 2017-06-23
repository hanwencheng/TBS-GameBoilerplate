import Loader from '../core/loader'
import Keyboard from '../core/keyboard'
import map from './tiles'
import {canvasSize, maximumDelta} from '../constant'
import actions from '../actions'
import png from './tiles.png'
import {dispatch, store} from '../hanwen';

var state = store.getState().canvas;

const getTile = (map, layerNumber, col, row) => {
  return map.layers[layerNumber].data[map.width * row + col]
}

var Render = function(){

}

Render.load = function () {
  return [
    Loader.loadImage('tiles', png),
  ];
};

Render.init = function () {
  Keyboard.listenForEvents(
    [Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
  this.tileAtlas = Loader.getImage('tiles');
  dispatch(actions.camera.init(map, canvasSize, canvasSize))
};

Render.update = function (delta) {
  // handle camera movement with arrow keys
  var dirx = 0;
  var diry = 0;
  if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1; }
  if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1; }
  if (Keyboard.isDown(Keyboard.UP)) { diry = -1; }
  if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1; }

  dispatch(actions.camera.move(delta, dirx, diry))
};

Render._drawLayer = function (layer) {
  var startCol = Math.floor(state.camera.x / map.tilewidth);
  var endCol = startCol + (state.camera.width / map.tilewidth);
  var startRow = Math.floor(state.camera.y / map.tileheight);
  var endRow = startRow + (state.camera.height / map.tileheight);
  var offsetX = -state.camera.x + startCol * map.tilewidth;
  var offsetY = -state.camera.y + startRow * map.tileheight;


  for (var c = startCol; c <= endCol; c++) {
    for (var r = startRow; r <= endRow; r++) {
      var tile = getTile(map, layer, c, r);
      var x = (c - startCol) * map.tilewidth + offsetX;
      var y = (r - startRow) * map.tileheight + offsetY;
      var sx = (tile % map.tilesets.column - 1) * map.tilesets.width;
      var sy = Math.floor(tile/map.tilesets.column) * map.tilesets.height;
      console.log(`tile: ${tile}, x: ${x}, y: ${y}, sx: ${sx}, sy: ${sy}`)
      if (tile !== 0) { // 0 => empty tile
        this.ctx.drawImage(
          this.tileAtlas, // image
          sx,  // source x
          sy, // source y
          map.tilesets.width, // source width
          map.tilesets.height, // source height
          Math.round(x),  // target x
          Math.round(y), // target y
          map.tilewidth, // target width
          map.tileheight // target height
        );
      }
    }
  }
};

Render.run = function (context) {
  this.ctx = context;
  this._previousElapsed = 0;
  var p = this.load();
  Promise.all(p).then(function (loaded) {
    this.init();
    window.requestAnimationFrame(this.tick);
  }.bind(this));
};

//Each frame
Render.tick = function (elapsed) {
  window.requestAnimationFrame(this.tick);

  // clear previous frame
  this.ctx.clearRect(0, 0, canvasSize, canvasSize);

  // compute delta time in seconds -- also cap it
  var delta = (elapsed - this._previousElapsed) / 1000.0;
  delta = Math.min(delta, maximumDelta); // maximum delta of 250 ms
  this._previousElapsed = elapsed;

  this.update(delta);
  this.render();
}.bind(Render);

Render.render = function () {
  // draw map background layer
  this._drawLayer(0);
  // draw map terrain layer
  this._drawLayer(1);
};

export default Render;

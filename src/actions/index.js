import types from '../reducer/actionTypes';

const camera = {
  init: (map, width, height) => ({type: types.camera.init, map, width, height}),
  move: (delta, dirX, dirY) => ({type: types.camera.move, delta, dirX, dirY})
}

export default {
  camera
}




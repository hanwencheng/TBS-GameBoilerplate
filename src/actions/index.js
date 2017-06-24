/**
 * This file is only used for hanwen.js
 *
 * And used for indexing actions.
 * components should not access this file directly.
 */

import types from '../reducer/actionTypes';

const camera = {
  init: (map, width, height) => ({type: types.camera.init, map, width, height}),
  move: (delta, dirX, dirY) => ({type: types.camera.move, delta, dirX, dirY})
}

const images = {
  load: (key, value) => ({type: types.images.load, key, value}),
  start: (number) => ({type: types.images.start, number}),
  error: (error) => ({type: types.images.error, error}),
  clear: () => ({types: types.images.clear})
}

export default {
  camera,
  images,
}




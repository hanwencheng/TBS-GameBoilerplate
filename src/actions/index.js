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

const heroes = {
  init: (spriteList) => ({type: types.heroes.init, spriteList}),
  setPath: (id, path) => ({type: types.heroes.setPath, id, path}),
  move: (id, pixelX, pixelY) => ({type: types.heroes.move, id, pixelX, pixelY}),
  setPosition: (id, x, y) => ({type: types.heroes.setPosition, id, x, y}),
  finishMove: (id) => ({type: types.heroes.finishMove, id}),
  nextTurn: ()=>({type: types.heroes.nextTurn})
}

const context = {
  setSize: (size) => ({type: types.context.setSize, size}),
  setSelection: (id) => ({type: types.context.setSelection, id}),
  setHighlight: (id) => ({type: types.context.setHighlight, id}),
  tick: ()=> ({type: types.context.tick})
}

export default {
  camera,
  images,
  heroes,
  context
}




const camera = {
  init: 'CAMERA_init',
  move: 'CAMERA_move'
}

const images = {
  load: 'IMAGES_load',
  clear: 'IMAGES_clear',
  start: 'IMAGES_start',
  error: 'IMAGES_error',
}

const heroes = {
  init: 'HEROES_init',
  setTarget: 'HEROS_setTarget',
}

const context = {
  setSize: 'CONTEXT_setSize',
  setSelection: 'CONTEXT_setSelection',
  setHighlight: 'CONTEXT_setHighlight',
  tick: 'CONTEXT_tick',
}

const actionTypes = {
  camera,
  heroes,
  images,
  context,
}

export default actionTypes;
export {camera, heroes, images, context}
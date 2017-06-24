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
  init: 'HEROES_init'
}

const actionTypes = {
  camera,
  heroes,
  images,
}

export default actionTypes;
export {camera, heroes, images}
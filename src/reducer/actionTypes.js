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

const hero = {

}

const actionTypes = {
  camera,
  hero,
  images,
}

export default actionTypes;
export {camera, hero, images}
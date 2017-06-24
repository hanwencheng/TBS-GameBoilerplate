import { combineReducers } from 'redux'
import heroes from './heroes';
import camera from './camera'
import images from './images'

const app = combineReducers ({
  main: combineReducers({
    heroes
  }),
  canvas: combineReducers({
    camera,
    images,
  })
})

export default app
import { combineReducers } from 'redux'
import heros from './heros';
import camera from './camera'
import images from './images'

const app = combineReducers ({
  main: combineReducers({
    heros
  }),
  canvas: combineReducers({
    camera,
    images,
  })
})

export default app
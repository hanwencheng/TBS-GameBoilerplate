import { combineReducers } from 'redux'
import heroes from './heroes';
import camera from './camera'
import images from './images'
import context from './context'

const app = combineReducers ({
  main: combineReducers({
    heroes
  }),
  canvas: combineReducers({
    camera,
    images,
    context,
  })
})

export default app
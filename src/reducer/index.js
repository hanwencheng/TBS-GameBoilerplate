import { combineReducers } from 'redux'
import heros from './heros';
import camera from './camera'

const app = combineReducers ({
  main: combineReducers({
    heros
  }),
  canvas: combineReducers({
    camera
  })
})

export default app
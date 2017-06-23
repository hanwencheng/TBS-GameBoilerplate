import {render as types} from './actionTypes'
import defaultMap from '../engine/tiles'
import {canvasSize as defaultCanvasSize} from '../constant'



const render = (state = {}, action) => {
  switch (action.type){
    case types.init:
      return state
    case types.drawLayer:
      return state

    default: return state;
  }
}

export default render;
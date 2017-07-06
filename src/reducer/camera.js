import _ from 'lodash';
import {camera as types} from './actionTypes'
import defaultMap from '../engine/tiles'
import {canvasSize as defaultCanvasSize} from '../constant'

const getMaxX = (map, width) => map.width * map.tilewidth - width
const getMaxY = (map, height) => map.height * map.tileheight - height


const camera = (state = {
  SPEED: 0.25,// pixels per second
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  maxX: getMaxX(defaultMap, defaultCanvasSize),
  maxY: getMaxY(defaultMap, defaultCanvasSize),
}, action ) => {
  let neu;
  switch (action.type){
    case types.init:
      neu = {...state,
        maxX: getMaxX(action.map, action.width),
        maxY: getMaxY(action.map, action.height),
        width: action.width,
        height: action.height
      }
      return neu

    case types.move:
      const change = (origin, dir, max) => {
        var computed = origin + action.delta * state.SPEED * dir
        return Math.max(0, Math.min(computed, max));
      }
      neu = {...state,
        x: change(state.x, action.dirX, state.maxX),
        y: change(state.y, action.dirY, state.maxY),
      }
      return neu;

    default : return state
  }
}

export default camera
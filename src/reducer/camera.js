import _ from 'lodash';
import {camera as types} from './actionTypes'
import defaultMap from '../engine/tiles'
import {canvasSize as defaultCanvasSize} from '../constant'

const getMaxX = (map, width) => map.width * map.tilewidth - width
const getMaxY = (map, height) => map.height * map.tileheight - height


const camera = (state = {
  SPEED: 256,// pixels per second
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  maxX: getMaxX(defaultMap, defaultCanvasSize),
  maxY: getMaxY(defaultMap, defaultCanvasSize),
}, action ) => {
  switch (action.type){
    case types.init:
      const neu = {...state,
        maxX: getMaxX(action.map, action.width),
        maxY: getMaxY(action.map, action.height),
        width: action.width,
        height: action.height
      }
      return neu

    case types.move:
      const change = (origin, dir) => origin + action.delta * state.SPEED + dir
      return {...state,
        x: change(state.x, action.dirX),
        y: change(state.y, action.dirY)
      };

    default : return state
  }
}

export default camera
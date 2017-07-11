import _ from 'lodash';
import {heroes as types} from './actionTypes';
import map from '../engine/tiles';
import update from 'immutability-helper';

const scaleWidth = map.tilewidth;
const scaleHeihgt = map.tileheight;

const initDataSet = {
  zhangfei: {
    sprite: 'zhangfei',
    x:2,
    y:3,
    pixelX: 2 * scaleWidth,
    pixelY: 3 * scaleWidth,
    height:64,
    width:48,
    animation: 4,
    movement: 2,
    movePoint: 2,
    path: null,
    selectable: true,
    isMoving: false,
  },
  zhaoyun:   {
    sprite: 'zhaoyun',
    x:15,
    y:14,
    pixelX: 15 * scaleWidth,
    pixelY: 14 * scaleWidth,
    height:64,
    animation: 4,
    width:48,
    movement: 3,
    movePoint: 3,
    path: null,
    selectable: true,
    isMoving: false,
  }
};

const objectIntoArray = (result, object, key) => {
  result.push({
    left: object.x * scaleWidth,
    right: ( object.x + 1 ) * scaleWidth,
    top: object.y * scaleHeihgt,
    bottom: ( object.y + 1 ) * scaleHeihgt,
    id: key,
    selectable: object.selectable && !object.isMoving
  });
  return result
};

let cordReduce = (obj) => _.reduce(obj, objectIntoArray, [])
let cordSort = (arr) => {
  arr.sort((a, b) => a.left - b.left) ;
  return arr.slice(0);
}
let sortData = _.flow(cordReduce, cordSort)

const initState = {
  data: initDataSet,
  sortedMap: sortData(initDataSet)
}
console.log('initData set is', initState.sortedMap);


const set = (state, id, changeMap, shouldSort) => {
  if(!shouldSort){
    return update(state, {
      data:{
        [id]: changeMap
      },
    })
  } else {
    let newDataSet = update(state.data, {
      [id]: changeMap
    });
    return { ...state,
      data: newDataSet,
      sortedMap: sortData(newDataSet),
    }
  }
}

const heroes = (state = initState, action ) => {
  switch (action.type){
    case types.init:
      return state;
    case types.setPath:
      return set(state, action.id,  {
        selectable: {$set: false},
        path: {$set: action.path},
        isMoving: {$set: true},
      })
    case types.move:
      return set(state, action.id, {
        pixelX: {$set: action.pixelX},
        pixelY: {$set: action.pixelY},
      })
    case types.setPosition:
      return set(state, action.id, {
        x: {$set: action.x},
        y: {$set: action.y},
        movePoint: {$set:state.data[action.id].movePoint - 1}
      }, true)
    case types.finishMove:
      return set(state, action.id, {
        selectable: {$set: true},
        isMoving: {$set: false},
      }, true)
    case types.nextTurn:
      return {...state,
        data: _.mapValues(state.data, (unit)=> {
          unit.movePoint = unit.movement;
          return unit
        })
      }
    default : return state
  }
}

export default heroes
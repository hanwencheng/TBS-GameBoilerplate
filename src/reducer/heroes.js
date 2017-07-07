import _ from 'lodash';
import {heroes as types} from './actionTypes';
import map from '../engine/tiles';
import update from 'immutability-helper';

const set = (obj, path, value) => {
  var rt = _.assign({}, obj)
  _.set(rt, path, value)
  return rt;
}

const scaleWidth = map.tilewidth;
const scaleHeihgt = map.tileheight;

const initDataSet = {
  data: {
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
      target: null,
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
      target: null,
      selectable: true,
      isMoving: false,
    }
  },
  sortedMap: []
}

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

const curriedGet = _.curryRight(_.get)({})('data')
const curriedReduce = _.curryRight(_.reduce)([])(objectIntoArray)
const curriedSort = _.curryRight(_.sortBy)((v)=> v.x);
const sortData = _.flow(curriedGet, curriedReduce, curriedSort);
initDataSet.sortedMap = sortData(initDataSet);
console.log('initData set is', initDataSet.sortedMap);

const heroes = (state = initDataSet, action ) => {
  switch (action.type){
    case types.init:
      return state;
    case types.setTarget:
      console.log(state[action.id])
      return update(state, {
        data:{
          [action.id]: {
            selectable: {$set: false},
            target: {$set: action.target},
            isMoving: {$set: true},
          }
        }
      })
    case types.finishMove:
      return state
    default : return state
  }
}

export default heroes
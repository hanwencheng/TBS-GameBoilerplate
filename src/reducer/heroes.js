import _ from 'lodash';
import {heroes as types} from './actionTypes';
import map from '../engine/tiles';

const scaleWidth = map.tilewidth;
const scaleHeihgt = map.tileheight;

const initDataSet = {
  data: {
    zhangfei: {
      sprite: 'zhangfei',
      x:2,
      y:3,
      height:64,
      width:48,
      movement: 2,
    },
    zhaoyun:   {
      sprite: 'zhaoyun',
      x:15,
      y:14,
      height:64,
      width:48,
      movement: 3,
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
    id: key});
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
    default : return state
  }
}

export default heroes
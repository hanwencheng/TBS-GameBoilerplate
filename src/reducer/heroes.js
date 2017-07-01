import _ from 'lodash';
import {heroes as types} from './actionTypes';

const initDataSet = {
  data: {
    zhangfei: {
      sprite: 'zhangfei',
      x:2,
      y:30,
      height:64,
      width:48,
    },
    zhaoyun:   {
      sprite: 'zhaoyun',
      x:505,
      y:14,
      height:64,
      width:48,
    }
  },
  sortedMap: []
}

const objectIntoArray = (result, object, key) => {
  result.push({
    left: object.x,
    right: object.x + object.width,
    top: object.y,
    bottom: object.y + object.height,
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
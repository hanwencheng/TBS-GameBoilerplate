import _ from 'lodash';
import {heroes as types} from './actionTypes';

const assignSprite = () => {

}

const heroes = (state = {
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
}, action ) => {
  switch (action.type){
    case types.init:
      return state;
    default : return state
  }
}

export default heroes
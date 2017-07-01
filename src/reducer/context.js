import _ from 'lodash';
import {context as types} from './actionTypes'

const contextReducer = (state = {
  size: {
    top: 0, bottom: 0, height: 0, width: 0, right: 0, left: 0
  },
  select: {}
}, action) => {
  switch (action.type){
    case types.setSize:
      return {...state,
        size: action.size
      };
    default:
      return state;
  }
}

export default contextReducer

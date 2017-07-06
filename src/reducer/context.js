import _ from 'lodash';
import {context as types} from './actionTypes'

const contextReducer = (state = {
  size: {
    top: 0, bottom: 0, height: 0, width: 0, right: 0, left: 0
  },
  tick: 0,
  highlight: null,
  selection: []
}, action) => {
  switch (action.type){
    case types.setSize:
      return {...state,
        size: action.size
      };

    case types.tick:
      return {...state,
        tick: state.tick + 1
      }

    case types.setHighlight:
      return {...state,
        highlight: action.id
      }

    case types.setSelection:
      return {...state,
        selection: action.ids
      }
    default:
      return state;
  }
}

export default contextReducer

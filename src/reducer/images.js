import _ from 'lodash'
import {images as types} from './actionTypes';

const images = (state = {
  total: 0,
  loading: false,
  loaded: 0,
  list: {},
  error: null,
}, action) => {
  switch (action.type){
    case types.load:
      const item = _.set(state.list, action.key, action.value);
      return {...state,
        list: item,
        loading: state.total === state.loaded + 1,
        loaded: state.loaded + 1,
      }
    case types.clear:
      return {...state,
        list: {},
        loading: false,
        loaded: 0,
        error: null
      };
    case types.start:
      return {...state,
        loading: true,
        error: null,
        total: action.number
      }
    case types.error:
      return {...state,
        loading: state.total > state.loaded + 1,
        error: action.error,
      }
    default:
      return state
  }
}

export default images
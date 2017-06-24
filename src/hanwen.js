import React, { Component } from 'react'
import { createStore } from 'redux'
import reducer from './reducer'
import actions from './actions'
import _ from 'lodash'

//call actions directly from props.actions
function bindActionCreator(actionCreator, dispatch) {
  const mapAction = (actions)=> {
    return  _.mapValues(actions, (value)=> {
      if(_.isPlainObject(value)){
        return mapAction(value)
      }else{
        return (...args) => dispatch(value(...args))
      }
    })
  }
  return  mapAction(actionCreator);
}

let store = createStore(reducer, {});
let dispatch = store.dispatch;

const hanwenc = (NormalComponent) => {
  return (props) => {
    const newProps = {
      actions: bindActionCreator(actions, dispatch),
      store: store.getState().main,
      canvas: store.getState().canvas
    }
    return (
      <NormalComponent {...props} {...newProps}/>
    )
  }
}

export {
  hanwenc as default,
  store,
  dispatch
}
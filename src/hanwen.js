import React, { Component } from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import DevTools from './helper/DevTool';
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

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
);

let store = createStore(reducer, {}, enhancer);
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
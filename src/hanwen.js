import React, { Component } from 'react'
import { createStore } from 'redux'
import reducer from './reducer'
import _ from 'lodash'

let store = createStore(reducer, {});
let dispatch = store.dispatch;

const hanwenc = (NormalComponent) => {
  return (props) => {
    const newProps = {
      dispatch: store.dispatch,
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
import React, { Component } from 'react'
import { createStore } from 'redux'
import reducer from './reducer'

let store = createStore(reducer, {});

const hanwenc = (NormalComponent) => {
  return (props) => {
    const newProps = {
      dispatch: store.dispatch,
      store: store.getState()
    }
    return (
      <NormalComponent {...props} {...newProps}/>
    )
  }
}

export {
  hanwenc as default,
  store
}
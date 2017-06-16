import React, { Component } from 'react';
import './Canvas.css';
import Container from '../core/playground';

const Canvas = (props) => {
  console.log('in canvas props are', props)
  return (
    <div className = "App-canvas" >
      <h2 className = "title" > Canvas </ h2 >
    </div >
  )
}

export default Canvas;
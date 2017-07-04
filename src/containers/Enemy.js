import React, { Component } from 'react';
import hanwenc from '../hanwen';
import _ from 'lodash'

const Enemy = (props) => {
  let highLightId = props.canvas.context.highlight,
      highLightSprite = highLightId ?
        props.store.heroes.data[highLightId] : {};
  let selectionId = props.canvas.context.selection,
    selectionSprite = selectionId.length ?
      props.store.heroes.data[selectionId[0]] : {}; //TODO
  return (
    <div className="App-enemy">
      <div >
        Hover :
      {_.map(highLightSprite, (value, key)=> (
        <div>{key} : {value}</div>
      ))}
      </div>

      <div>
        Select :
      {_.map(selectionSprite, (value, key)=> (
        <div>{key} : {value}</div>
      ))}
      </div>
    </div>

  )
}

export default hanwenc(Enemy);
import React, { Component } from 'react';
import hanwenc from '../hanwen';
import _ from 'lodash'

const Enemy = (props) => {
  let highLightId = props.canvas.context.highlight,
      highLightSprite = highLightId ?
        props.store.heroes.data[highLightId] : {};

  return (
    <div>
      {_.map(highLightSprite, (value, key)=> (
        <div>{key} : {value}</div>
      ))}
    </div>

  )
}

export default hanwenc(Enemy);
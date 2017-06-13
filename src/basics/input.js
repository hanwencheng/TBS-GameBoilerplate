import React, { Component } from 'react';
import './input.css';

const heroInput = (props) => {
  var { type, name, value, symbol, ...rest } = props

  const onChange = (event) => {
    value = event.target.value
    console.log('change event is', value)
  }
  return (
    <div className="basics-input">
      <label>
        {symbol + " : "}
        <input type={type} name={name} value={value} onChange={onChange}/>
      </label>
    </div>
  )

}

export default heroInput
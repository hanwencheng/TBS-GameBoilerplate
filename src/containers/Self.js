import React, { Component } from 'react';
import {HeroInput} from '../basics'
import {Button} from 'material-ui'
import hanwenc from '../hanwen'

const AppSelf = (props) => {

  const handleSubmit = (event) =>  {
    event.preventDefault();
    console.log("submit value is " , event.target)
  }

  const onKeyPress = (event) => {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  }

  const onNextTurn = () => {
    props.actions.heroes.nextTurn();
  }

  return (
    <div className="App-self">
      <form onSubmit={handleSubmit} onKeyPress={onKeyPress}>
        <HeroInput key="xingming" type="text" symbol="姓名" name="wuli" value="赵云"/>
        <HeroInput key="wuli" type="number" symbol="武力" name="wuli" value="95"/>
        <HeroInput key="zhili" type="number" symbol="智力" name="zhili" value="30"/>
        <HeroInput key="tongshuai" type="number" symbol="统率" name="tongshuai" value="93"/>
        <HeroInput key="zhengzhi" type="number" symbol="政治" name="zhengzhi" value="45"/>
        <input onClick={handleSubmit} type="submit" value="Submit" />
      </form>

      <Button raised color="primary" onClick={onNextTurn}>Next Turn</Button>
    </div>
  )

}

export default hanwenc(AppSelf);
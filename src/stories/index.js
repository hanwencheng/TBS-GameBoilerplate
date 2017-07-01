import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Self from '../containers/Self';
import Input from '../basics/input';
import App from '../App';
import {default as hanwenc, store} from '../hanwen';

import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);


storiesOf('Self', Self)
  .add('raw', () => <Self/>)

storiesOf('Input', Input)
  .add('Input', () => <Input key="xingming" type="text" symbol="姓名" name="wuli" value="赵云"/>)
  .add('Input1', () => <Input key="xingming" type="text" symbol="姓名" name="wuli" value="张飞"/>)

const render = ()=> <App/>

store.subscribe(render);
storiesOf('App', App)
  .add('App', render)
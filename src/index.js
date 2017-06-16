import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {store} from './hanwen'

const render = () => {
  ReactDOM.render(
    <App string="haha"/>
    , document.getElementById('root'));
  registerServiceWorker();
}

store.subscribe(render);

render()






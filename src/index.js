import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {store} from './hanwen'
import { MuiThemeProvider } from 'material-ui/styles';

const render = () => {
  ReactDOM.render(
    <MuiThemeProvider>
      <App string="haha"/>
    </MuiThemeProvider>
    , document.getElementById('root'));
  registerServiceWorker();
}

store.subscribe(render);

render()






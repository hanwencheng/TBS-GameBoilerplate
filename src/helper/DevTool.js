import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import FilterMonitor from 'redux-devtools-filterable-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import Filter from 'redux-devtools-filter-actions';
import types from '../reducer/actionTypes';


export default createDevTools(
  <Filter blacklist={[
    types.camera.move,
    types.context.setHighlight,
    types.context.tick,
  ]}>
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               changeMonitorKey='ctrl-m'
               defaultPosition="left" defaultIsVisible={false} defaultSize="0.2">
      <FilterMonitor/>
      <LogMonitor />
  </DockMonitor>
  </Filter>
);
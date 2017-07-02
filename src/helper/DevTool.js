import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-devtools-diff-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import FilterMonitor from 'redux-devtools-filter-actions';
import types from '../reducer/actionTypes';

export default createDevTools(
  <FilterMonitor blacklist={[
    types.camera.move,
    types.context.highlight
  ]}>
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               changeMonitorKey='ctrl-m'
               defaultPosition="left" defaultIsVisible={false} defaultSize="0.2">

    <SliderMonitor />
    <LogMonitor />
  </DockMonitor>
  </FilterMonitor>
);
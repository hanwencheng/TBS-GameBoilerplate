import _ from 'lodash'
import {default as canvasMap } from './canvasMap'
import {default as canvasAction} from './canvasAction'
import {default as canvasHelper} from './canvasHelper'

export default _.merge(
  canvasMap,
  canvasAction,
  canvasHelper
)
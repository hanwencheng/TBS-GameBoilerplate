import _ from 'lodash'
import {default as MapUtils } from './MapUtils'
import {default as ActionUtils} from './ActionUtils'

export default _.merge(
    MapUtils,
    ActionUtils
)
/* eslint no-unused-vars:0 */

import createLogger from 'redux-logger'
import {
  MODAL_ON,
  MODAL_OFF,
  NAVIGATE_TO,
  NAVIGATE_BACK,
  RESETDEBOUNCE,
} from '../actions/actionTypes'

const quietActions = {
  // MODAL_ON,
  // MODAL_OFF,
  // NAVIGATE_TO,
  // NAVIGATE_BACK,
  RESETDEBOUNCE,
}

export default createLogger({
  timestamp: false,
  collapsed: true,
  predicate: (getState, action) => (!quietActions[action.type]),
})

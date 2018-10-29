import {
  RESETDEBOUNCE,
  NAVIGATE_TO,
  NAVIGATE_BACK,
  TOGGLECLICKABILITY,
  LOGOUT,
  GETESTIMATE_ERROR,
} from '../actions/actionTypes'

const initialState = {
  requestRide: true,
  confirmRide: true,
}

export default (state = initialState, action = {}) => {
  const { type, buttonName } = action
  const newState = { ...state }
  switch (type) {
    case TOGGLECLICKABILITY :
      newState[buttonName] = !newState[buttonName]
      return newState
    case RESETDEBOUNCE :
    case NAVIGATE_TO:
    case NAVIGATE_BACK:
    case GETESTIMATE_ERROR :
    case LOGOUT :
      return {
        ...initialState,
      }
    default :
      return state
  }
}

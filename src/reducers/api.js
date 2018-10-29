import {
  SETAPISETTINGS,
  LOGOUT,
} from '../actions/actionTypes'

const initialState = {
  black_car_surcharge: 0,
  tax_rate: 0,
  meet_greet_val: 15,
}

export default (state = initialState, action = {}) => {
  const {
    api = {},
    type,
  } = action

  switch (type) {
    case SETAPISETTINGS:
      return {
        ...state,
        ...api,
      }
    case LOGOUT:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

import {
  LoggedOutOptions,
  LoggedInOptions,
  NoCreditCardOptions,
} from '../api/data'
import {
  TOGGLE_MENU,
  OPEN_MENU,
  CLOSE_MENU,
  LOGOUT,
  LOGIN_SUCCESS,
  NAVIGATE_TO,
  NAVIGATE_BACK,
  GETPROFILE_ERROR,
} from '../actions/actionTypes'

const initialState = {
  options: LoggedOutOptions,
  menuOpen: false,
}
export default (state = initialState, action = {}) => {
  const { type } = action
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        options: LoggedInOptions,
      }
    case LOGOUT:
      return {
        ...state,
        options: LoggedOutOptions,
      }
    case TOGGLE_MENU:
      return {
        ...state,
        menuOpen: !state.menuOpen,
      }
    case OPEN_MENU:
      return {
        ...state,
        menuOpen: true,
      }
    case CLOSE_MENU:
      return {
        ...state,
        menuOpen: false,
      }
    case NAVIGATE_BACK:
    case NAVIGATE_TO:
      return {
        ...state,
        menuOpen: false,
      }
    case GETPROFILE_ERROR:
      return {
        ...state,
        options: NoCreditCardOptions,
      }
    default:
      return state
  }
}


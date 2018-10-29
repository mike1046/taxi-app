 /* eslint no-unused-vars:0 */

import {
  SIGNUP_SUBMIT,
  SIGNUP_SUCCESS,
  LOGIN_SUBMIT,
  LOGIN_SUCCESS,
  PASSWORD_SETNEW_SUCCESS,
  ACCOUNT_UPDATE_SUCCESS,
  APPSTATE_STARTUP,
  GETPROFILE_SUCCESS,
  GETJOBLIST_SUCCESS,
  SETLOCATION_SUCCESS,
  SETLOCATION_ERROR,
  LOGOUT,
  TOGGLE_REMEMBERME,
  CHECKPERSISTANTLOGIN_SUBMIT,
  MODAL_OFF,
} from '../actions/actionTypes'

const TEST_ADMIN_PREFS = {
  email: 'test-admin@rehashstudio.com',
  password: 'Eastern1',
}

const NICK_PREFS = {
  email: 'ellsworth.nick@gmail.com',
  password: 'testpass',
}

const BEN_PREFS = {
  email: 'ben.neiswander@gmail.com',
  password: 'Eastern1',
}

const initialState = {
  rememberMe: true,
  location: {
    lat: 0,
    lng: 0,
    available: false,
  },
  tip_type: 'l',
  checkingPersistantLogin: true,
  // ...BEN_PREFS
  // ...TEST_ADMIN_PREFS,
  // ...NICK_PREFS,
}

export default (state = initialState, action = {}) => {
  // NOTE: we use ternary assignment instead of default values
  // for user because it may come back as null, in which case
  // the default value assignment would not occur
  // i.e.
  // const {user={}} = action;
  // user would still be null
  const {
    type,
    jobs,
    location = { },
  } = action
  const { coords = {} } = location
  const user = action.user ? action.user : {}
  const email = user.email ? user.email : ''
  const password = user.password ? user.password : ''
  const returnArr = []
  const {
    latitude,
    longitude,
  } = coords
  const formattedLocation = {
    lat: latitude,
    lng: longitude,
    available: true,
  }
  const noLocation = {
    lat: 0,
    lng: 0,
    available: false,
  }

  switch (type) {
    case SIGNUP_SUBMIT:
      return {
        ...state,
        email,
      }
    case APPSTATE_STARTUP:
    case SIGNUP_SUCCESS:
      return {
        ...state,
      }
    case LOGIN_SUBMIT:
      return {
        ...state,
        email,
        password,
      }
    case GETPROFILE_SUCCESS:
    case ACCOUNT_UPDATE_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...user,
      }
    case PASSWORD_SETNEW_SUCCESS:
      return {
        ...state,
        password,
      }
    case GETJOBLIST_SUCCESS:
      // turns the array-like object into an array.
      // couldn't use splice.call because the length property wasn't accurate
      Object.keys(jobs).forEach((key) => {
        if (key !== 'length') {
          returnArr[key] = jobs[key]
        }
      })
      return {
        ...state,
        job_list: returnArr,
      }
    case SETLOCATION_SUCCESS:
      return {
        ...state,
        location: formattedLocation,
      }
    case SETLOCATION_ERROR:
      return {
        ...state,
        location: noLocation,
      }
    case LOGOUT:
      return {
        ...initialState,
        location: state.location,
      }
    case TOGGLE_REMEMBERME:
      return {
        ...state,
        rememberMe: !state.rememberMe,
      }
    case CHECKPERSISTANTLOGIN_SUBMIT:
      return {
        ...state,
        checkingPersistantLogin: true,
      }
    case MODAL_OFF:
      return {
        ...state,
        checkingPersistantLogin: false,
      }
    default:
      return state
  }
}

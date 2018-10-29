import {
  LOGIN_SUCCESS,
  ACCOUNT_UPDATE_SUCCESS,
} from '../actions/actionTypes'
import { saveAsync } from '../utils/asyncStorage'

export default ({ getState }) => next => (action) => {
  const state = getState()
  if ((
    action.type === LOGIN_SUCCESS
    || action.type === ACCOUNT_UPDATE_SUCCESS
  )
    && state.user.rememberMe
  ) {
    const password = action.user.password ? { password: action.user.password } : {}
    const user = Object.assign({}, state.user, action.user, password)
    saveAsync({ loggedInUser: user })
  }
  next(action)
}


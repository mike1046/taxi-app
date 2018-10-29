import _ from 'lodash'
import {
  SETPAYMENT,
  JOBCOMPLETED,
  CANCELRIDE_SUCCESS,
  LOGOUT,
  SETTIP,
} from '../actions/actionTypes'

const initialState = {
  base: 0,
  extras: 0,
  tip: 0,
  amount: 0,
  paid: 0,
  due: 0,
  defaultTipInitialized: false,
}

export default (state = initialState, action = {}) => {
  const {
    payment = {},
    tip,
    type,
  } = action

  switch (type) {
    case SETPAYMENT:
      if (state.defaultTipInitialized) {
        return {
          ...state,
          ..._.omit(payment, ['tip']),
        }
      }
      return {
        ...state,
        ...payment,
        defaultTipInitialized: true,
      }
    case SETTIP:
      return {
        ...state,
        tip,
      }
    case LOGOUT:
    case CANCELRIDE_SUCCESS:
    case JOBCOMPLETED:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

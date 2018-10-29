import {
  GETESTIMATE_SUCCESS,
  CONFIRMRIDE_SUCCESS,
  CANCELRIDE_SUCCESS,
  GETJOBINFO_SUCCESS,
  UPDATEJOB_SUCCESS,
  ALERTDRIVER_SUCCESS,
  JOBCOMPLETED,
  LOGOUT,
  SETDRIVERWAITSTATUSMESSAGEINDEX,
} from '../actions/actionTypes'

const initialState = {
  messageIndex: 0,
}

export default (state = initialState, action = {}) => {
  const {
    ride = {},
    messageIndex = 0,
    type,
  } = action

  switch (type) {
    case GETESTIMATE_SUCCESS:
    case CONFIRMRIDE_SUCCESS:
    case GETJOBINFO_SUCCESS:
    case UPDATEJOB_SUCCESS:
    case ALERTDRIVER_SUCCESS:
      return {
        ...state,
        ...ride,
      }
    case SETDRIVERWAITSTATUSMESSAGEINDEX:
      return {
        ...state,
        messageIndex,
      }
    case JOBCOMPLETED:
    case CANCELRIDE_SUCCESS:
    case LOGOUT:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

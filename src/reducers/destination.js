import {
  GETESTIMATE_SUBMIT,
  CANCELRIDE_SUCCESS,
  GETJOBINFO_SUCCESS,
  UPDATEJOB_SUCCESS,
  JOBCOMPLETED,
  LOGOUT,
} from '../actions/actionTypes'

const initialState = {}

export default (state = initialState, action = {}) => {
  const {
    type,
    destination = {},
  } = action
  if (destination.latitude) destination.lat = destination.latitude
  if (destination.longitude) destination.lng = destination.longitude

  switch (type) {
    case GETESTIMATE_SUBMIT:
    case GETJOBINFO_SUCCESS:
    case UPDATEJOB_SUCCESS:
      return {
        ...state,
        ...destination,
      }
    case CANCELRIDE_SUCCESS:
    case LOGOUT:
    case JOBCOMPLETED:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

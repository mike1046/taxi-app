import {
  GETESTIMATE_SUBMIT,
  CANCELRIDE_SUCCESS,
  GETJOBINFO_SUCCESS,
  JOBCOMPLETED,
  LOGOUT,
} from '../actions/actionTypes'

const initialState = {}
export default (state = initialState, action = {}) => {
  const {
    type,
    meeting = {},
  } = action

  switch (type) {
    case GETJOBINFO_SUCCESS:
    case GETESTIMATE_SUBMIT:
      return {
        ...state,
        ...meeting,
      }
    case CANCELRIDE_SUCCESS:
    case JOBCOMPLETED:
    case LOGOUT:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

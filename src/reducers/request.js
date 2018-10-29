import {
  GETESTIMATE_SUBMIT,
  GETESTIMATE_SUCCESS,
  CANCELRIDE_SUCCESS,
  UPDATEJOB_SUCCESS,
  JOBCOMPLETED,
  GETJOBINFO_SUCCESS,
  LOGOUT,
} from '../actions/actionTypes'
import {
  formatRequestAddressForGetEstimates,
  formatAllowPetForGetEstimates,
} from '../utils'

const initialState = {}

export default (state = initialState, action = {}) => {
  const { request = {}, type, ride } = action
  const updatedState = {}

  switch (type) {
    case GETESTIMATE_SUCCESS:
    case UPDATEJOB_SUCCESS:
    case GETESTIMATE_SUBMIT:
      return {
        ...state,
        ...request,
      }
    case GETJOBINFO_SUCCESS:
      updatedState.meeting = formatRequestAddressForGetEstimates(ride.pickup)
      updatedState.special_requests = ride.special_request
      updatedState.service_type = ride.service_type
      updatedState.childseats = ride.extras.childseat
      updatedState.meet_greet = ride.extras.meet_greet
      updatedState.allow_pet = formatAllowPetForGetEstimates(ride.extras.pet)
      return {
        ...state,
        ...updatedState,
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

import {
  GETRECEIPT_SUCCESS,
  LOGOUT,
} from '../actions/actionTypes'

const initialState = {
  cc_token: false,
  destination: {},
  driver_info: {},
  extras: {},
  job_no: 0,
  job_status: 0,
  passenger_info: {},
  payment: {},
  pick_up_time: '',
  pick_up_type: '',
  pickup: {},
  pricing: {},
  service_type: '',
  special_request: '',
}

export default function (state = initialState, action = {}) {
  const { receipt = {}, type } = action
  switch (type) {
    case GETRECEIPT_SUCCESS :
      return {
        ...state,
        ...receipt,
      }
    case LOGOUT:
      return {
        ...initialState,
      }
    default :
      return state
  }
}

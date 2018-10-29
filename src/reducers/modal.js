import {
  MODAL_ON,
  MODAL_OFF,
  LOGOUT,
} from '../actions/actionTypes'

const initialState = {
  on: false,
  component: '',
  props: '',
}

export default (state = initialState, action = {}) => {
  const {
    type,
    component,
    props = {},
  } = action

  switch (type) {
    case MODAL_ON:
      return {
        ...state,
        on: true,
        props: { ...props },
        component,
      }
    case MODAL_OFF:
    case LOGOUT:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

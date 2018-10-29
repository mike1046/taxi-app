import {
  SET_AIRPORTS_LIST,
  SET_AIRLINES_LIST,
} from '../actions/actionTypes'

const initialState = {
  airports: [],
  airlines: [],
}

export default (state = initialState, action = {}) => {
  const { type, results } = action
  switch (type) {
    case SET_AIRLINES_LIST:
      return {
        ...state,
        airlines: results,
      }
    case SET_AIRPORTS_LIST:
      return {
        ...state,
        airports: results,
      }
    default:
      return state
  }
}

import {
  GETJOBINFO_SUCCESS,
  JOBCOMPLETED,
  LOGOUT,
} from '../actions/actionTypes'

const initialState = {
  coordinates: [],
}

function isChangedFromLast(arr, coordinatesArray) {
  const lastElement = arr.slice(-1)[0] || [0, 0] // driver not yet assigned
  return coordinatesArray.some((num, index) => num !== lastElement[index])
}

export default (state = initialState, action = {}) => {
  const {
    type,
    driver = {},
  } = action
  const {
    driver_lat,
    driver_lng,
  } = driver
  const coordinates = [...state.coordinates]

  if (driver_lat && driver_lng) {
    const isDifferent = isChangedFromLast(coordinates, [driver_lat, driver_lng])
    if (isDifferent) coordinates.push([driver_lat, driver_lng])
  }

  switch (type) {
    case GETJOBINFO_SUCCESS:
      return {
        ...state,
        ...driver,
        coordinates,
      }
    case LOGOUT:
    case JOBCOMPLETED:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

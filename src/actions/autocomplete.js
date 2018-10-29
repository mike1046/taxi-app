import { values } from 'lodash'
import {
  SET_AIRPORTS_LIST,
  SET_AIRLINES_LIST,
} from './actionTypes'
import {
  searchAPI,
} from '../api/user'

export function setAirportsList(results) {
  return {
    type: SET_AIRPORTS_LIST,
    results,
  }
}

export function setAirlinesList(results) {
  return {
    type: SET_AIRLINES_LIST,
    results,
  }
}

export function searchAPIThunk(searchText, user, type) {
  let method
  let setResultsAction

  switch (type) {
    case 'airports':
      method = 'search_airport'
      setResultsAction = setAirportsList
      break
    case 'airlines':
      method = 'search_airline'
      setResultsAction = setAirlinesList
      break
    default:
      throw Error('searchAPIThunk: type must be \'airlines\' or \'airports\'')
  }

  return dispatch => fetch(searchAPI(user, searchText.toUpperCase(), method))
    .then(data => data.json())
    .then(response => values(response[type]))
    .then(results => dispatch(setResultsAction(results)))
}

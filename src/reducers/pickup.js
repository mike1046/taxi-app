import moment from 'moment'
import {
  SET_SCHEDULE_PICKUP,
  SET_PICKUP_LOCATION,
  SET_DESTINATION,
  SET_DESTINATION_AIRLINE,
  SET_PICKUP_AIRLINE,
  SET_PICKUP_MEET_GREET,
  SET_PICKUP_TIME,
  SET_DEFAULT_PICKUP,
  SET_PICKUP_FLIGHT_NUM,
  RESET_PICKUP_OPTIONS,
} from '../actions/actionTypes'
import { shortenAddress } from '../utils'

const formatGooglePlacesAddress = (result) => {
  const { data, details } = result
  if (!details) return
  const { geometry = {}, formatted_address } = details
  const { description } = data
  const { location = {} } = geometry
  const {
    lat,
    lng,
  } = location

  let fromAutofill = false
  if (data.fromAutofill) {
    fromAutofill = true
  }

  const shortenedAddress = description ?
    shortenAddress(description) : shortenAddress(formatted_address)

  const formattedDestination = {
    address: shortenedAddress,
    latlng: `${lat},${lng}`,
    lat,
    lng,
    fromAutofill,
  }

  return formattedDestination
}

const formatAutocompleteAddress = (result) => {
  const { airport_name, latlon } = result
  const latlons = latlon.split(',')
  const formattedDestination = {
    address: airport_name,
    latlng: latlon,
    lat: Number(latlons[0]),
    lng: Number(latlons[1]),
    fromAutofill: false,
  }
  return formattedDestination
}

const initialState = {
  isPickupAirport: false,
  isDestinationAirport: false,
  isScheduledPickup: false,
  pickupTime: moment()
  .add(1, 'day')
  .hour(12).minutes(0)
  .toDate(),
  meet_greet: false,
  pickupLocation: {
    address: '',
    airline: {
      airline_name: '',
      code: '',
    },
  },
  destination: {
    address: '',
    airline: {
      airline_name: '',
      code: '',
    },
  },
}

export default (state = initialState, action = {}) => {
  const {
    type,
    isScheduledPickup,
    isDestinationAirport,
    isPickupAirport,
    pickupLocation,
    destination,
    airline,
    meet_greet,
    pickupTime,
    flightNum,
    defaultPickup,
  } = action

  // TODO: Split into two
  const formatPickupAddress = isPickupAirport
    ? formatAutocompleteAddress
    : formatGooglePlacesAddress

  const formatDestinationAddress = isDestinationAirport
    ? formatAutocompleteAddress
    : formatGooglePlacesAddress

  const emptyAirline = {
    airline_name: '',
    code: '',
  }

  switch (type) {
    case SET_SCHEDULE_PICKUP:
      return {
        ...state,
        isScheduledPickup,
      }
    case SET_PICKUP_LOCATION:
      return {
        ...state,
        isPickupAirport,
        pickupLocation: {
          ...state.pickupLocation,
          airline: isPickupAirport ? state.pickupLocation.airline : emptyAirline,
          flightNum: isPickupAirport ? state.pickupLocation.flightNum : '',
          ...formatPickupAddress(pickupLocation),
        },
      }
    case SET_DESTINATION:
      return {
        ...state,
        isDestinationAirport,
        destination: {
          ...state.destination,
          airline: isDestinationAirport ? state.destination.airline : emptyAirline,
          ...formatDestinationAddress(destination),
        },
      }
    case SET_DEFAULT_PICKUP:
      return {
        ...state,
        defaultPickup,
      }
    case SET_PICKUP_AIRLINE:
      return {
        ...state,
        pickupLocation: {
          ...state.pickupLocation,
          airline,
        },
      }
    case SET_PICKUP_FLIGHT_NUM:
      return {
        ...state,
        pickupLocation: {
          ...state.pickupLocation,
          flightNum,
        },
      }
    case SET_DESTINATION_AIRLINE:
      return {
        ...state,
        destination: {
          ...state.destination,
          airline,
        },
      }
    case SET_PICKUP_MEET_GREET:
      return {
        ...state,
        meet_greet,
      }
    case SET_PICKUP_TIME:
      return {
        ...state,
        pickupTime,
      }
    case RESET_PICKUP_OPTIONS:
      return initialState
    default:
      return state
  }
}

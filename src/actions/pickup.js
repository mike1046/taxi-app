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
} from './actionTypes'

export function setSchedulePickup(isScheduledPickup) {
  return {
    type: SET_SCHEDULE_PICKUP,
    isScheduledPickup,
  }
}

export function setPickupLocation(pickupLocation, options) {
  return {
    type: SET_PICKUP_LOCATION,
    pickupLocation,
    isPickupAirport: options.isAirport || false,
  }
}

export function setDestination(destination, options) {
  return {
    type: SET_DESTINATION,
    destination,
    isDestinationAirport: options.isAirport || false,
  }
}

export function setPickupAirline(airline) {
  return {
    type: SET_PICKUP_AIRLINE,
    airline,
  }
}

export function setPickupMeetGreet(bool) {
  return {
    type: SET_PICKUP_MEET_GREET,
    meet_greet: bool,
  }
}

export function setDestinationAirline(airline) {
  return {
    type: SET_DESTINATION_AIRLINE,
    airline,
  }
}

export function setPickupTime(pickupTime) {
  return {
    type: SET_PICKUP_TIME,
    pickupTime,
  }
}

export function setDefaultPickup(defaultPickup) {
  return {
    type: SET_DEFAULT_PICKUP,
    defaultPickup,
  }
}

export function setPickupFlightNum(flightNum) {
  return {
    type: SET_PICKUP_FLIGHT_NUM,
    flightNum,
  }
}

export function resetPickupOptions() {
  return {
    type: RESET_PICKUP_OPTIONS,
  }
}

import {
  NAVIGATE_TO,
  NAVIGATE_BACK,
} from './actionTypes'

export function navigateTo(destination, viewProps) {
  return {
    type: NAVIGATE_TO,
    destination,
    viewProps,
  }
}

export function navigateBack() {
  return { type: NAVIGATE_BACK }
}

import { RESETDEBOUNCE, TOGGLECLICKABILITY } from './actionTypes'

export function resetDebounce() {
  return {
    type: RESETDEBOUNCE,
  }
}

export function toggleClickability(buttonName) {
  return {
    type: TOGGLECLICKABILITY,
    buttonName,
  }
}


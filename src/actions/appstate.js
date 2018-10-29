import { APPSTATE_STARTUP } from './actionTypes'

export function appStartup(state) {
  return {
    type: APPSTATE_STARTUP,
    state,
  }
}

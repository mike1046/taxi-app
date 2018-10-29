import { SETAPISETTINGS } from './actionTypes'

export function setApiSettings(api) {
  return {
    type: SETAPISETTINGS,
    api,
  }
}

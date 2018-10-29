import { TOGGLE_MENU, OPEN_MENU, CLOSE_MENU } from './actionTypes'

export function toggleMenu() {
  return { type: TOGGLE_MENU }
}

export function openMenu() {
  return { type: OPEN_MENU }
}

export function closeMenu() {
  return { type: CLOSE_MENU }
}

import {
  MODAL_ON,
  MODAL_OFF,
  ALERT_TEXT,
} from './actionTypes'

export function modalShow(component, props) {
  return {
    type: MODAL_ON,
    component,
    props,
  }
}

export function modalHide() {
  return {
    type: MODAL_OFF,
  }
}

export function loaderShow(props) {
  return {
    type: MODAL_ON,
    component: 'LoaderModal',
    props,
  }
}

export function loaderHide() {
  return {
    type: MODAL_OFF,
  }
}

export function loaderActionShow(props) {
  return {
    type: MODAL_ON,
    component: 'LoaderWithActionModal',
    props,
  }
}

export function alertText(title, message) {
  return {
    type: ALERT_TEXT,
    title,
    message,
  }
}

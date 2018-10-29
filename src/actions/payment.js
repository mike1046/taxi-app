import {
  CHARGETOKEN_SUCCESS,
  CHARGETOKEN_ERROR,
  SETPAYMENT,
  SETTIP,
} from './actionTypes'
import { ServerResponseException } from '../utils'
import { chargeToken } from '../api/user'

import {
  loaderShow,
  loaderHide,
  loaderActionShow,
} from './modal'

// Set Payment
export function setPayment(payment) {
  return {
    type: SETPAYMENT,
    payment,
  }
}

// Charge Token
function chargeTokenSuccess() {
  return {
    type: CHARGETOKEN_SUCCESS,
  }
}

function chargeTokenError(error) {
  return {
    type: CHARGETOKEN_ERROR,
    error,
  }
}


export function chargeTokenThunk(email, password, jobNumber, amount, tip, onSuccess) {
  return (dispatch) => {
    dispatch(loaderShow({
      text: 'Processing Payment...',
    }))
    return fetch(chargeToken(email, password, jobNumber, amount, tip))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse
      })
      .then(() => {
        const successActions = [
          loaderActionShow({
            text: 'Payment successfully processed. Thank you for riding with us.',
          }),
          chargeTokenSuccess(),
        ]

        if (onSuccess instanceof Function) successActions.push(onSuccess())

        dispatch(successActions)
      })
      .catch((err) => {
        const errorActions = [
          loaderHide(),
          chargeTokenError(err),
        ]

        dispatch(errorActions)
      })
  }
}

export function setTip(tip) {
  return {
    type: SETTIP,
    tip,
  }
}

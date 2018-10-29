import { GETRECEIPT_SUCCESS } from './actionTypes'
import { getJobInfo } from '../api/user'
import { navigateTo } from './navigation'
import { loaderShow, loaderHide } from './modal'
import { getJobInfoError } from './ride'
import { ServerResponseException } from '../utils'

function getReceiptSuccess(receipt) {
  return {
    type: GETRECEIPT_SUCCESS,
    receipt,
  }
}

export function getReceiptThunk(email, password, jobNumber, location) {
  return (dispatch) => {
    dispatch(loaderShow())
    return fetch(getJobInfo(email, password, jobNumber, location))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse.job_info
      })
      .then((jobInfo) => {
        const successActions = [
          getReceiptSuccess(jobInfo),
          loaderHide(),
          navigateTo('Receipt'),
        ]
        dispatch(successActions)
      })
      .catch((err) => {
        const errorActions = [
          loaderHide(),
          getJobInfoError(err),
        ]
        dispatch(errorActions)
      })
  }
}

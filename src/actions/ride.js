/* eslint no-console:0 */
// Handles Ride Related Actions
import {
  getEstimates,
  cancelTrip,
  bookTrip,
  getJobInfo,
  updateJob,
  alertDriver,
} from '../api/user'
import {
  polling,
  ServerResponseException,
} from '../utils'
import {
  jobStatuses,
  isJobCompleted,
  formatPricingToPayment,
} from '../api/data'
import {
  GETESTIMATE_SUBMIT,
  GETESTIMATE_SUCCESS,
  GETESTIMATE_ERROR,
  CONFIRMRIDE_SUCCESS,
  CONFIRMRIDE_ERROR,
  CANCELRIDE_SUCCESS,
  CANCELRIDE_ERROR,
  GETJOBINFO_SUCCESS,
  GETJOBINFO_ERROR,
  UPDATEJOB_SUCCESS,
  UPDATEJOB_ERROR,
  ALERTDRIVER_SUCCESS,
  ALERTDRIVER_ERROR,
  SETDRIVERWAITSTATUSMESSAGEINDEX,
  JOBCOMPLETED,
} from './actionTypes'
import {
  navigateTo,
  navigateBack,
} from './navigation'
import {
  loaderShow,
  loaderActionShow,
  loaderHide,
  modalShow,
  alertText,
} from './modal'
import { toggleClickability } from './debounce'
import { setApiSettings } from './api'
import { setPayment } from './payment'
import rewardActions from '../redux/RewardRedux'

function getEstimateSubmit(request) {
  const {
    meeting,
    destination,
  } = request
  return {
    type: GETESTIMATE_SUBMIT,
    meeting,
    destination,
    request,
  }
}

function getEstimateSuccess(ride) {
  return {
    type: GETESTIMATE_SUCCESS,
    request: ride,
    ride,
  }
}

function getEstimateError(error) {
  return {
    type: GETESTIMATE_ERROR,
    error,
  }
}

// Get Estimates for The Ride to Location
export function getEstimateThunk(email, password, ride, location, isScheduledPickup) {
  return (dispatch) => {
    dispatch(loaderShow())
    dispatch(getEstimateSubmit(ride))
    return fetch(getEstimates(email, password, ride, location))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse
      })
      .then((jsonResponse) => {
        const {
          estimates,
          estimates: { pricing: { total } },
          api_settings: apiSettings,
        } = jsonResponse
        const successActions = [
          loaderHide(),
          setApiSettings(apiSettings),
          getEstimateSuccess(estimates),
          navigateTo('DriverOnTheWay'),
        ]

        if (!location.available) {
          successActions.push(
            alertText('Warning',
              'You are requesting a ride without location service enabled. This may cause delays in your service.'),
          )
        }
        if (
          apiSettings.booking_minimum
          && (total < apiSettings.booking_minimum)
          && isScheduledPickup
        ) {
          dispatch([
            toggleClickability('requestRide'),
            loaderHide(),
            alertText('We\'re Sorry', `We currently do not take Advanced Reservations for trips under $${apiSettings.booking_minimum}. We are sorry for this inconvenience`),
          ])
        } else dispatch(successActions)
      })
      .catch((err) => {
        const errorActions = [
          loaderHide(),
        ]

        if (err.code === 418 && err.reason === 'A valid credit card is required to continue') {
          errorActions.push(navigateTo('AddCard', { shouldResetRoutes: true }))
        } else if (err.code === 451) {
          errorActions.push(
            alertText('Sorry', 'You are out of the service area. Please make a reservation instead.'),
            navigateTo('BookNow'),
          )
        } else errorActions.push(getEstimateError(err))

        dispatch(errorActions)
      })
  }
}

export function cancelRideSuccess() {
  return {
    type: CANCELRIDE_SUCCESS,
  }
}

function cancelRideError(error) {
  return {
    type: CANCELRIDE_ERROR,
    error,
  }
}

export function confirmRideThunk(
  email, password, name, quote_id, request, location, isScheduledPickup, couponCode,
) {
  return dispatch =>
    fetch(bookTrip(email, password, name, quote_id, request, couponCode))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse
      })
      .then((jsonResponse) => {
        const { job_no: jobNumber, api_settings: apiSettings } = jsonResponse
        const successActions = [
          loaderHide(),
          confirmRideSuccess(jobNumber),
          setApiSettings(apiSettings),
          rewardActions.getRewardsRequest(),
        ]
        if (request.pickupTime) {
          if (isScheduledPickup) {
            successActions.push(navigateTo('ThankYou', { message: '* The ride will become active 15 minutes prior to the scheduled pickup time. You can cancel your reservation from your receipt.', job_no: jobNumber }))
          } else {
            successActions.push(navigateTo('BookNow'))
          }
        } else successActions.push(getJobInfoThunk(email, password, jobNumber, location))
        console.log(
          `Job In Progress is : %c${jobNumber}`,
          'color:orange; background:blue; font-size: 16pt',
        )
        dispatch(successActions)
      })
      .catch((err) => {
        const errorActions = [
          loaderHide(),
          confirmRideError(err),
        ]
        dispatch(errorActions)
      })
}


export function cancelRideThunk(email, password, jobNo) {
  return (dispatch) => {
    dispatch(loaderShow())
    return fetch(cancelTrip(email, password, jobNo))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse
      })
      .then(() => {
        const successActions = [
          loaderHide(),
          navigateTo('BookNow', { shouldResetRoutes: true }),
          cancelRideSuccess(),
        ]

        dispatch(successActions)
      })
      .catch((err) => {
        const errorActions = [
          loaderHide(),
          cancelRideError(err),
        ]

        dispatch(errorActions)
      })
  }
}

export function cancelRide() {
  return (dispatch) => {
    const actions = [
      loaderHide(),
      cancelRideSuccess(),
      navigateTo('BookNow', { shouldResetRoutes: true }),
    ]
    dispatch(actions)
  }
}

function getJobInfoSuccess(ride, destination, meeting, driver) {
  return {
    type: GETJOBINFO_SUCCESS,
    ride,
    destination,
    meeting,
    driver,
  }
}

export function getJobInfoError(error) {
  return {
    type: GETJOBINFO_ERROR,
    error,
  }
}


export function jobCompleted() {
  return {
    type: JOBCOMPLETED,
  }
}

function pollingPromise(fetchPromise, dispatch, user) {
  function isComplete(data) {
    const { job_status } = data
    return isJobCompleted(job_status)
  }

  function onComplete(data) {
    const {
      job_status,
      destination,
      pickup,
      driver_info,
      pricing,
      payment,
      job_no,
    } = data
    const formattedPayment = formatPricingToPayment({
      ...pricing,
      ...payment,
    })
    const jobStatus = jobStatuses
      .filter(status => status.code === job_status)
      .reduce((obj, selected) => Object.assign(obj, selected), {})
    const {
        display,
        label,
      } = jobStatus
    const {
        email,
        password,
      } = user
    const completeActions = [
      getJobInfoSuccess(data, destination, pickup, driver_info),
      setPayment(formattedPayment),
    ]
    if (display) {
      const loaderActionShowConfig = {
        text: label,
      }
      if (job_status === 10) {
        loaderActionShowConfig.closeOverride = () => {
          dispatch(cancelRideThunk(email, password, job_no))
        }
      }
      completeActions.push(loaderActionShow(loaderActionShowConfig))
    } else if (job_status !== 13 && job_status !== 14) {
      completeActions.push(navigateTo('ThankYou', { job_no }))
    }
    completeActions.push(jobCompleted())
    dispatch(completeActions)
  }

  function onContinue(data) {
    const {
      destination,
      pickup,
      driver_info,
      pricing,
      payment,
    } = data
    const formattedPayment = formatPricingToPayment({
      ...pricing,
      ...payment,
    })
    const continueActions = [
      getJobInfoSuccess(data, destination, pickup, driver_info),
      setPayment(formattedPayment),

    ]
    dispatch(continueActions)
  }

  return polling(fetchPromise, isComplete, onComplete, onContinue, 10000)
}

export function getJobInfoThunk(email, password, jobNumber, location) {
  return (dispatch) => {
    const fetchPromise = () =>
      fetch(getJobInfo(email, password, jobNumber, location))
        .then(response => response.json())
        .then((jsonResponse) => {
          if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
          return jsonResponse
        })
        .then(jsonResponse => jsonResponse.job_info)
        .catch(err => err)

    const user = {
      email,
      password,
    }

    return pollingPromise(fetchPromise, dispatch, user)
      .catch((err) => {
        const errorActions = [
          loaderHide(),
          getJobInfoError(err),
        ]

        dispatch(errorActions)
      })
  }
}

// Confirm the Ride By the Get Estimates
function confirmRideSuccess(jobNo) {
  return {
    type: CONFIRMRIDE_SUCCESS,
    ride: {
      job_no: jobNo,
    },
  }
}

function confirmRideError(error) {
  return {
    type: CONFIRMRIDE_ERROR,
    error,
  }
}

export function handleInProgressJobThunk(email, password, jobNumber, location) {
  return (dispatch) => {
    dispatch(loaderShow({
      text: 'Loading Job In Progress',
    }))
    return fetch(getJobInfo(email, password, jobNumber, location))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse
      })
      .then((jsonResponse) => {
        const {
          destination,
          pickup,
          driver_info,
          pricing,
          payment,
        } = jsonResponse.job_info
        const { api_settings } = jsonResponse
        const formattedPayment = formatPricingToPayment({
          ...pricing,
          ...payment,
        })
        const successActions = [
          getJobInfoSuccess(jsonResponse.job_info, destination, pickup, driver_info),
          setPayment(formattedPayment),
          navigateTo('DriverOnTheWay'),
          loaderHide(),
          setApiSettings(api_settings), // update api settings for payment calculations
          getJobInfoThunk(email, password, jobNumber, location),
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

// Update Job
function updateJobSuccess(ride, destination, vouchers_id) {
  const request = {
    ...ride,
    destination,
    vouchers_id,
  }
  return {
    type: UPDATEJOB_SUCCESS,
    destination,
    ride,
    request,
  }
}

function updateJobError(error) {
  return {
    type: UPDATEJOB_ERROR,
    error,
  }
}

export function updateJobThunk(email, password, jobNumber, destination,
  estimates, parameters) {
  return (dispatch) => {
    dispatch(loaderShow({
      text: 'Updating Job...',
    }))
    return fetch(updateJob(email, password, jobNumber, parameters))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse
      })
      .then((jsonResponse) => {
        const { api_settings: apiSettings } = jsonResponse
        const successActions = [
          loaderHide(),
          setApiSettings(apiSettings), // update api settings for payment calculations
          updateJobSuccess(estimates, destination, parameters.vouchers_id),
        ]
        if (parameters.vouchers_id) successActions.push(navigateBack())
        dispatch(successActions)
      })
      .catch((err) => {
        const errorActions = [
          loaderHide(),
          updateJobError(err),
        ]

        dispatch(errorActions)
      })
  }
}

// Change Destination
export function getQuoteThunk(email, password, ride, destination, jobNumber, onReject, location) {
  return (dispatch) => {
    // wait for the google places modal to go away before popping up another modal
    setTimeout(() => {
      dispatch(loaderShow({
        text: ' Getting Quote... ',
        showSpinner: true,
      }))
    }, 0)

    return fetch(getEstimates(email, password, ride, location, jobNumber))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse
      })
      .then(jsonResponse => jsonResponse.estimates)
      .then((estimates) => {
        const onAccept = () => {
          const { quote_id } = estimates
          const parameters = { quote_id }
          dispatch(
            updateJobThunk(email, password, jobNumber, destination, estimates, parameters),
          )
        }
        const component = 'UpdateDestinationModal'
        const props = {
          destination,
          estimates,
          onReject,
          onAccept,
        }
        const successActions = [
          loaderHide(),
          modalShow(component, props),
        ]

        dispatch(successActions)
      })
      .catch((err) => {
        const errorActions = [
          loaderHide(),
          getEstimateError(err),
        ]

        dispatch(errorActions)
      })
  }
}

// Driver Arrived - To Wait or Not to Wait
function alertDriverSuccess(alertDriverMinutes) {
  const ride = {
    alertDriverTime: new Date(),
    alertDriverMinutes,
  }
  return {
    type: ALERTDRIVER_SUCCESS,
    ride,
  }
}

function alertDriverError(error) {
  return {
    type: ALERTDRIVER_ERROR,
    error,
  }
}

export function alertDriverThunk(email, password, jobNumber, minutes) {
  return (dispatch) => {
    dispatch(loaderShow({
      text: 'Letting Driver Know... ',
    }))

    return fetch(alertDriver(email, password, jobNumber, minutes))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new Error(jsonResponse.error)
        return jsonResponse
      })
      .then(() => {
        const successActions = [
          loaderHide(),
          alertDriverSuccess(minutes),
        ]

        dispatch(successActions)
      })
      .catch((err) => {
        const errorActions = [
          loaderHide(),
          alertDriverError(err),
        ]

        dispatch(errorActions)
      })
  }
}

export function setDriverWaitStatusMessageIndex(messageIndex) {
  return {
    type: SETDRIVERWAITSTATUSMESSAGEINDEX,
    messageIndex,
  }
}

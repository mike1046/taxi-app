/* eslint no-console:0 */
// Handles User Account Related Actions
import {
  signup,
  login,
  verifyCode,
  resendCode,
  resetPasswordCode,
  verifyPasswordCode,
  resetPassword,
  updateAccount,
  addCard,
  getProfile,
  getJobList,
} from '../api/user'

import {
  SIGNUP_SUBMIT,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_SUBMIT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  GETPROFILE_SUCCESS,
  GETPROFILE_ERROR,
  CODE_VERIFY_SUCCESS,
  CODE_VERIFY_ERROR,
  CODE_RESEND_SUCCESS,
  CODE_RESEND_ERROR,
  PASSWORD_RESETCODE_SUCCESS,
  PASSWORD_RESETCODE_ERROR,
  PASSWORD_VERIFY_SUCCESS,
  PASSWORD_VERIFY_ERROR,
  PASSWORD_SETNEW_SUCCESS,
  PASSWORD_SETNEW_ERROR,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_ERROR,
  ADDCARD_SUCCESS,
  ADDCARD_ERROR,
  SETLOCATION_SUCCESS,
  SETLOCATION_ERROR,
  TOGGLE_REMEMBERME,
  CHECKPERSISTANTLOGIN_SUBMIT,
  CHECKPERSISTANTLOGIN_ERROR,
}
from './actionTypes'
import { navigateTo } from './navigation'
import { setApiSettings } from './api'
import { alertText, loaderShow, loaderActionShow, loaderHide } from './modal'
import { handleInProgressJobThunk } from './ride'
import { ServerResponseException } from '../utils'
import { loadAsync, saveAsync } from '../utils/asyncStorage'

// Signing up for users
function signupSubmit(user) {
  // on signup success there is no information provided
  return {
    type: SIGNUP_SUBMIT,
    user,
  }
}

function signupSuccess() {
  // on signup success there is no information provided
  return {
    type: SIGNUP_SUCCESS,
  }
}

function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    error,
  }
}

export function signupThunk(user) {
  return (dispatch) => {
    const submitActions = [
      loaderShow(),
      signupSubmit(user),
    ]

    dispatch(submitActions)

    return fetch(signup(user))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse
      })
      .then((userResponse) => {
        const title = 'Successfully Signed Up'
        const message = `Please check your texts for a verification code
        or email for a verification link.`
        const successActions = [
          loaderHide(),
          signupSuccess(userResponse),
          navigateTo('VerifyAccount', { user }),
          alertText(title, message),
        ]
        dispatch(successActions)
      })
      .catch((err) => {
        const errorActions = [
          loaderHide(),
          signupError(err),
        ]

        dispatch(errorActions)
      })
  }
}


// Login users
function loginSubmit(user) {
  return {
    type: LOGIN_SUBMIT,
    user,
  }
}

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  }
}

function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  }
}


export function loginThunk(user) {
  return (dispatch) => {
    const submitActions = [
      loaderShow(),
      loginSubmit(user),
    ]

    dispatch(submitActions)

    return fetch(login(user))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse
      })
      .then(({ settings: returnedUser, api_settings }) => {
        // settings have all the user information
        const successActions = [
          loaderHide(),
          loginSuccess(returnedUser),
          setApiSettings(api_settings),
          navigateTo('BookNow'),
        ]
        dispatch(successActions)
      })
      .catch((err) => {
        const errorActions = [
          loaderHide(),
        ]
        if (err.code === 409 && err.reason === 'Account has not been verified') {
          errorActions.push(navigateTo('VerifyAccount', { user }))
        } else errorActions.push(loginError(err))
        dispatch(errorActions)
      })
  }
}

// Logout from account
export function logOut() {
  return {
    type: LOGOUT,
  }
}

// Verifies the code that the user was sent for account verification
function codeVerifySuccess() {
  return {
    type: CODE_VERIFY_SUCCESS,
  }
}

function codeVerifyError(error) {
  return {
    type: CODE_VERIFY_ERROR,
    error,
  }
}

export function codeVerifyThunk(user) {
  return (dispatch) => {
    dispatch(loaderShow())

    return fetch(verifyCode(user))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse
      })
      .then(() => {
        const title = 'Account Verified'
        const message = 'Please log in.'
        dispatch([
          loaderHide(),
          codeVerifySuccess(),
          loginSuccess(user),
          alertText(title, message),
          navigateTo('BookNow'),
        ])
      })
      .catch(err =>
        dispatch([
          loaderHide(),
          codeVerifyError(err),
        ]),
      )
  }
}

// Resends account verification code
function codeResendSuccess() {
  return {
    type: CODE_RESEND_SUCCESS,
  }
}

function codeResendError(error) {
  return {
    type: CODE_RESEND_ERROR,
    error,
  }
}

export function codeResendThunk(user) {
  return (dispatch) => {
    dispatch(loaderShow())
    return fetch(resendCode(user))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse
      })
      .then(returnedUser =>
        dispatch([
          loaderHide(),
          codeResendSuccess(returnedUser),
        ]),
      )
      .catch(err =>
        dispatch([
          loaderHide(),
          codeResendError(err),
        ]),
      )
  }
}

// Sends a code to user so that they have can have the password reset
function passwordResetCodeSuccess() {
  return {
    type: PASSWORD_RESETCODE_SUCCESS,
  }
}

function passwordResetCodeError(error) {
  return {
    type: PASSWORD_RESETCODE_ERROR,
    error,
  }
}

export function passwordResetCodeThunk(user) {
  return (dispatch) => {
    dispatch(loaderShow())

    return fetch(resetPasswordCode(user))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse
      })
      .then((returnedUser) => {
        const title = 'Reset Password Code is Sent'
        const message = 'Please check your text or email'
        dispatch([
          loaderHide(),
          passwordResetCodeSuccess(returnedUser),
          navigateTo('SetNewPassword'),
          alertText(title, message),
        ])
      })
      .catch(err =>
        dispatch([
          loaderHide(),
          passwordResetCodeError(err),
        ]),
      )
  }
}

// Verifies Password Code That Was Sent to User
function passwordVerifySuccess() {
  return {
    type: PASSWORD_VERIFY_SUCCESS,
  }
}

function passwordVerifyError(error) {
  return {
    type: PASSWORD_VERIFY_ERROR,
    error,
  }
}

export function passwordVerifyThunk(user) {
  return (dispatch) => {
    dispatch(loaderShow())

    return fetch(verifyPasswordCode(user))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse
      })
      .then((returnedUser) => {
        const successActions = [
          loaderHide(),
          passwordVerifySuccess(returnedUser),
        ]

        dispatch(successActions)
      })
      .catch((err) => {
        const errorActions = [
          loaderHide(),
          passwordVerifyError(err),
        ]

        dispatch(errorActions)
      })
  }
}

// Sets New Password
function setNewPasswordSuccess() {
  return {
    type: PASSWORD_SETNEW_SUCCESS,
  }
}

function setNewPasswordError(error) {
  return {
    type: PASSWORD_SETNEW_ERROR,
    error,
  }
}

export function setNewPasswordThunk(user) {
  return (dispatch) => {
    dispatch(loaderShow())

    return fetch(resetPassword(user))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse
      })
      .then((returnedUser) => {
        const title = ''
        const message = 'Password was successfully set'
        dispatch([
          loaderHide(),
          setNewPasswordSuccess(returnedUser),
          navigateTo('Login'),
          alertText(title, message),
        ])
      })
      .catch((err) => {
        const errorActions = [
          loaderHide(),
          setNewPasswordError(err),
        ]

        dispatch(errorActions)
      })
  }
}

// Updates Account Information
function updateAccountSuccess(user) {
  return {
    type: ACCOUNT_UPDATE_SUCCESS,
    user,
  }
}

function updateAccountError(error) {
  return {
    type: ACCOUNT_UPDATE_ERROR,
    error,
  }
}

export function updateAccountThunk(email, oldPassword, update, onChangeOldPassword) {
  return (dispatch) => {
    dispatch(loaderShow())

    return fetch(updateAccount(email, oldPassword, update))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse
      })
      .then(() => {
        if (onChangeOldPassword) onChangeOldPassword(update.password)
      })
      .then(() => dispatch([
        loaderHide(),
        updateAccountSuccess(update),
      ]))
      .catch(err => dispatch([
        loaderHide(),
        updateAccountError(err),
      ]))
  }
}

// Add card
function addCardSuccess() {
  return {
    type: ADDCARD_SUCCESS,
  }
}

function addCardError(error) {
  return {
    type: ADDCARD_ERROR,
    error,
  }
}

export function addCardThunk(email, password, card) {
  return (dispatch) => {
    dispatch(loaderShow())

    return fetch(addCard(email, password, card))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse
      })
      .then(() => dispatch([
        loaderActionShow({
          text: 'Card Successfully Added',
        }),
        addCardSuccess(),
        navigateTo('BookNow'),
      ]))
      .catch(err => dispatch([
        loaderHide(),
        addCardError(err),
      ]))
  }
}

export function getProfileSuccess(user) {
  return {
    type: GETPROFILE_SUCCESS,
    user,
  }
}

export function getProfileError(error) {
  return {
    type: GETPROFILE_ERROR,
    error,
  }
}

// this is being replaced with the getProfile saga
export function getProfileThunk(email, password, location, currentState) {
  return dispatch =>
    fetch(getProfile(email, password, location))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        return jsonResponse
      })
      .then((jsonResponse) => {
        const jobNumber = jsonResponse.current_job
        const successActions = [
          getProfileSuccess(jsonResponse.info),
        ]
        if (jobNumber !== '' && (currentState === 'RequestPickup' || currentState === 'BookNow' || currentState === 'Home')) {
          console.log(
            `Current Job is : %c${jsonResponse.current_job}`,
            'color:orange; background:blue; font-size: 16pt',
          )
          successActions.push(
            handleInProgressJobThunk(email, password, jobNumber, location),
          )
        } else {
          successActions.push(loaderHide())
        }
        dispatch(successActions)
      })
      .catch((err) => {
        const errorActions = [
          loaderHide(),
          getProfileError(err),
        ]
        if (err.code === 418 && err.reason === 'A valid credit card is required to continue') {
          errorActions.push(navigateTo('AddCard', { shouldResetRoutes: true }))
        }
        dispatch(errorActions)
      })
}

// get list of jobs for user
function getJobListSuccess(jobs) {
  return {
    type: 'GETJOBLIST_SUCCESS',
    jobs,
  }
}

export function setLocationSuccess(location) {
  return {
    type: SETLOCATION_SUCCESS,
    location,
  }
}

export function setLocationError(error) {
  return {
    type: SETLOCATION_ERROR,
    error,
  }
}

export function getJobListThunk(email, password, limit = 20) {
  return (dispatch) => {
    dispatch(loaderShow())
    return fetch(getJobList(email, password, limit))
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.error) throw new ServerResponseException(jsonResponse)
        const jobs = jsonResponse.job_list.results || []
        dispatch([
          loaderHide(),
          getJobListSuccess(jobs),
        ])
      })
      .catch((err) => {
        const errorActions = [
          loaderHide(),
          getProfileError(err),
        ]
        dispatch(errorActions)
      })
  }
}

export function logOutThunk() {
  return dispatch =>
    saveAsync({ loggedInUser: {} })
      .then(() => {
        const actions = [
          logOut(),
          navigateTo('Home'),
        ]
        dispatch(actions)
      })
}

export function toggleRememberMe() {
  return {
    type: TOGGLE_REMEMBERME,
  }
}

export function checkPersistantLoginSubmit() {
  return {
    type: CHECKPERSISTANTLOGIN_SUBMIT,
  }
}

export function checkPersistantLoginError(error) {
  return {
    type: CHECKPERSISTANTLOGIN_ERROR,
    error,
  }
}

export function checkPersistantLoginThunk() {
  let foundUser = false
  return (dispatch) => {
    dispatch(checkPersistantLoginSubmit())
    return loadAsync('loggedInUser')
      .then(({ loggedInUser }) => {
        const successActions = [
          loaderHide(),
        ]
        if (loggedInUser && loggedInUser.hasOwnProperty('email')) {
          foundUser = loggedInUser
        }
        return dispatch(successActions)
      })
      .then(() => {
        if (foundUser) {
          dispatch([
            loginSuccess(foundUser),
            navigateTo('BookNow'),
          ])
        }
      })
      .catch(err =>
        dispatch([
          checkPersistantLoginError(err),
          loaderHide(),
        ]),
      )
  }
}

/* eslint no-console: 0 */
import Raven from 'raven-js'
import {
  put,
  select,
  call,
} from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import _ from 'lodash'
import { getRewards } from './RewardSaga'
import { currentStateKey } from '../reducers/navigation'
import { NAVIGATE_TO } from '../actions/actionTypes'
import { navigateTo } from '../actions/navigation'
import { loaderHide } from '../actions/modal'
import { handleInProgressJobThunk } from '../actions/ride'
import {
  getProfileSuccess,
  getProfileError,
} from '../actions/user'

function* getProfile(api, { destination }) {
  if (destination !== 'BookNow') return

  const args = yield select(state => ([
    state.user.email,
    state.user.password,
    state.user.location.lat,
    state.user.location.lng,
  ]))

  const resp = yield call(api.getProfile, ...args)
  if (resp.ok && !resp.data.error) {
    yield put(getProfileSuccess(resp.data.info))

    const currentJob = resp.data.current_job
    const { location, currentState } = yield select(
      state => ({
        location: state.user.location,
        currentState: currentStateKey(state.navigation),
      }),
    )
    yield call(getRewards, api)
    if (currentJob !== '' && _.includes(['RequestPickup', 'BookNow', 'Home'], currentState)) {
      console.log(
        `Current Job is : %c${currentJob}`,
        'color:orange; background:blue; font-size: 16pt',
      )
      // TODO: REFACTOR
      yield put(handleInProgressJobThunk(args[0], args[1], currentJob, location))
    } else {
      yield put(loaderHide())
    }
  } else {
    const { data: { error: { code, reason } } } = resp
    yield put(loaderHide())
    yield put(getProfileError(resp.data.error))
    if (code === 418 && reason === 'A valid credit card is required to continue') {
      yield put(navigateTo('AddCard', { shouldResetRoutes: true }))
    } else {
      Raven.captureException(reason, {
        level: 'info',
        logger: 'api',
        extra: {
          message: 'Get profile error',
          code,
        },
      })
    }
  }
}

export default function* userSaga(api) {
  yield [
    takeEvery(NAVIGATE_TO, getProfile, api),
  ]
}


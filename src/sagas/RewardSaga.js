import Raven from 'raven-js'
import {
  put,
  select,
  call,
} from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import RewardActions, { RewardTypes } from '../redux/RewardRedux'
import { navigateTo } from '../actions/navigation'

export function* getRewards(api) {
  const args = yield select(state => ([
    state.user.email,
    state.user.password,
  ]))
  const resp = yield call(api.getRewards, ...args)

  if (resp.ok && !resp.data.error) {
    const { points, percentage, coupons } = resp.data.rewards
    yield put(RewardActions.getRewardsSuccess(points, percentage, coupons))
  } else {
    yield put(RewardActions.getRewardsFailure(resp.data.error))
  }
}

export function* applyCoupon(api, { coupon_id }) {
  const args = yield select(state => ([
    state.user.email,
    state.user.password,
    state.ride.quote_id,
    coupon_id,
  ]))
  const resp = yield call(api.applyCoupon, ...args)
  if (resp.ok && !resp.data.error) {
    yield put(RewardActions.applyRewardSuccess(resp.data.coupon_info.coupons_id))
    yield put(navigateTo('DriverOnTheWay'))
  } else {
    yield put(RewardActions.applyRewardFailure(resp.data.error))
    Raven.capturemessage(resp.data.error.reason, {
      level: 'info',
      logger: 'api',
      extra: {
        message: 'Apply coupon error',
        code: resp.data.error.code,
      },
    })
  }
}

export default function* RewardSaga(api) {
  yield [
    takeLatest(RewardTypes.GET_REWARDS_REQUEST, getRewards, api),
    takeLatest(RewardTypes.APPLY_REWARD_REQUEST, applyCoupon, api),
  ]
}

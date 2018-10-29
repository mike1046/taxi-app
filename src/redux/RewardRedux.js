/* eslint no-underscore-dangle: 0 */
import { createReducer, createActions } from 'reduxsauce'
import Moment from 'moment'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import {
  LOGOUT,
  CANCELRIDE_SUCCESS,
} from '../actions/actionTypes'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getRewardsRequest: null,
  getRewardsSuccess: ['points', 'percentage', 'coupons'],
  getRewardsFailure: ['error'],
  applyRewardRequest: ['coupon_id'],
  applyRewardSuccess: ['coupon_id'],
  applyRewardFailure: ['error'],
})

export const RewardTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  points: 0,
  percentage: 0,
  coupons: {},
  couponIdToApply: '',
})

/* ------------- Reducers ------------- */


export const getRewardsSuccessReducer = (state, { points, percentage, coupons }) =>
  state.merge({ points, percentage, coupons })

export const applyRewardSuccessReducer = (state, { coupon_id }) =>
  state.merge({ couponIdToApply: coupon_id })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_REWARDS_SUCCESS]: getRewardsSuccessReducer,
  [Types.APPLY_REWARD_SUCCESS]: applyRewardSuccessReducer,
  [LOGOUT]: () => INITIAL_STATE,
  [CANCELRIDE_SUCCESS]: () => INITIAL_STATE,
})

/* ------------- Selectors ------------- */

export const validRewards = (globalState) => {
  try {
    const {
      rewards: { coupons },
      ride: {
        pricing: { total },
      },
      pickup: {
        isDestinationAirport,
        isPickupAirport,
      },
      request: {
        allow_pet,
        childseats: {
          booster,
          infant,
          toddler,
        },
      },
    } = globalState
    return Object.keys(coupons)
      .map(key => (coupons[key]))
      .filter(({ coupons_expires, coupons_condition, coupons_type, effective_date }) => {
        const expires = Moment(coupons_expires)
        const hasNotExpired = (!expires.isValid() || Moment().isBefore(expires))
        const effective = Moment(effective_date)
        const isEffective = (!effective.isValid() || Moment().isAfter(effective))
        const notAirportCoupon = coupons_type !== 'ap'
        const isAirportRide = isPickupAirport || isDestinationAirport
        const minimumCost = coupons_condition.match(/\$(\d*\.?\d+?)/)
        const atLeastMinimumCost = !minimumCost ? true : (total > parseInt(minimumCost[1]))
        const notPetCoupon = coupons_type !== 'p'
        const isPetRide = [1, 2].indexOf(allow_pet) !== -1
        const notChildCoupon = coupons_condition.indexOf('Child') === -1
        const isChildRide = booster > 0 || infant > 0 || toddler > 0
        return (
          hasNotExpired
          && isEffective
          && (notAirportCoupon || isAirportRide)
          && atLeastMinimumCost
          && (notPetCoupon || isPetRide)
          && (notChildCoupon || isChildRide)
        )
      })
  } catch (e) {
    return []
  }
}

export const priceToDeductForCoupon = ({ coupons, couponIdToApply }) => {
  try {
    const couponsArr = Object.keys(coupons).map(key => (coupons[key]))
    return _.find(couponsArr, { coupons_id: couponIdToApply }).coupons_value
  } catch (e) {
    return 0
  }
}

export const hasValidRewards = globalState => validRewards(globalState).length !== 0

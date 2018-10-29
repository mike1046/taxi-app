import React, { PropTypes } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DriverOnTheWayTopBar from '../components/DriverOnTheWayTopBar'
import DriverOnTheWayFooter from '../components/DriverOnTheWayFooter'
import DriverMap from '../components/DriverMap'
import { iconColor, androidMarginFix } from '../styles'
import { modalShow } from '../actions/modal'
import { confirmRideThunk, getQuoteThunk, alertDriverThunk } from '../actions/ride'
import { navigateTo } from '../actions/navigation'
import {
  hasValidRewards,
  priceToDeductForCoupon,
} from '../redux/RewardRedux'

const DriverOnTheWay = ({
  driver: {
    coordinates,
  },
  meeting,
  destination,
  ride,
  user,
  request,
  payment,
  api,
  pickup: {
    isScheduledPickup,
  },
  modalShow,
  getQuoteThunk,
  navigateTo,
  alertDriverThunk,
  confirmRideThunk,
  hasValidRewards,
  priceToDeductForCoupon,
  couponCode,
}) =>
  <View
    style={[
      styles.container,
      androidMarginFix,
    ]}>
    <DriverOnTheWayTopBar
      navigateTo={navigateTo}
      ride={ride}
      payment={payment} />
    <DriverMap
      destination={destination}
      driver={coordinates}
      meeting={meeting}
      isScheduledPickup={isScheduledPickup}
      ride={ride}
      user={user} />
    <DriverOnTheWayFooter
      confirmRideThunk={confirmRideThunk}
      getQuoteThunk={getQuoteThunk}
      navigateTo={navigateTo}
      modalShow={modalShow}
      user={user}
      ride={ride}
      payment={payment}
      isScheduledPickup={isScheduledPickup}
      request={request}
      alertDriverThunk={alertDriverThunk}
      hasValidRewards={hasValidRewards}
      priceToDeductForCoupon={priceToDeductForCoupon}
      couponCode={couponCode}
      api={api} />
  </View>

DriverOnTheWay.propTypes = {
  user: PropTypes.object.isRequired,
  ride: PropTypes.object.isRequired,
  meeting: PropTypes.object.isRequired,
  destination: PropTypes.object.isRequired,
  driver: PropTypes.shape({
    coordinates: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number),
    ),
  }).isRequired,
  api: PropTypes.object,
  request: PropTypes.object.isRequired,
  payment: PropTypes.object.isRequired,
  pickup: PropTypes.object.isRequired,
  modalShow: PropTypes.func.isRequired,
  getQuoteThunk: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  alertDriverThunk: PropTypes.func.isRequired,
  confirmRideThunk: PropTypes.func.isRequired,
  hasValidRewards: PropTypes.bool.isRequired,
  priceToDeductForCoupon: PropTypes.number.isRequired,
  couponCode: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  map: {
    flex: 1,
    borderTopColor: iconColor,
    borderTopWidth: 2,
    justifyContent: 'center',
  },
})

function mapStateToProps(state) {
  const {
    user,
    ride,
    request,
    api,
    destination,
    driver,
    meeting,
    payment,
    pickup,
    rewards,
  } = state
  const validRewards = hasValidRewards(state)
  const priceToDeduct = priceToDeductForCoupon(rewards)
  return {
    user,
    ride,
    request,
    api,
    destination,
    driver,
    meeting,
    payment,
    pickup,
    hasValidRewards: validRewards,
    priceToDeductForCoupon: priceToDeduct,
    couponCode: rewards.couponIdToApply,
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    navigateTo,
    confirmRideThunk,
    modalShow,
    getQuoteThunk,
    alertDriverThunk,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverOnTheWay)

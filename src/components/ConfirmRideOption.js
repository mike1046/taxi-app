import React, {
  Component,
  PropTypes,
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import moment from 'moment'
import { formatDollars } from '../utils'
import PressOnceTouchableOpacity from './PressOnceTouchableOpacity'
import {
  buttonContainerStyleLarge,
  buttonTextStyle,
  iconColor,
  accentColor,
  navbarBackground,
  textLink,
} from '../styles'

function shouldShowDiscount(instant_discount, service_type) {
  return typeof instant_discount !== 'undefined'
  && instant_discount !== null
  && instant_discount !== 0
  && service_type === 'economy'
}

function getPrice(total, discount) {
  if (total - discount < 0) return 0
  return total - discount
}

class ConfirmRideOption extends Component {
  static propTypes = {
    confirmRideThunk: PropTypes.func.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }).isRequired,
    api: PropTypes.object,
    ride: PropTypes.shape({
      quote_id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      driver_eta: PropTypes.number,
      pricing: PropTypes.shape({
        total: PropTypes.number.isRequired,
      }),
    }),
    navigateTo: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    isScheduledPickup: PropTypes.bool,
    hasValidRewards: PropTypes.bool.isRequired,
    priceToDeductForCoupon: PropTypes.number.isRequired,
    couponCode: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.confirmRide = this.confirmRide.bind(this)
    this.navigateToApplyRewards = this.navigateToApplyRewards.bind(this)
    this.renderRewardsDisplay = this.renderRewardsDisplay.bind(this)
  }

  confirmRide() {
    const {
      user,
      ride,
      request,
      confirmRideThunk,
      isScheduledPickup,
      couponCode,
    } = this.props
    const {
      email,
      password,
      name,
      location,
    } = user
    const { quote_id } = ride
    confirmRideThunk(
      email, password, name, quote_id, request, location, isScheduledPickup, couponCode,
    )
  }

  navigateToApplyRewards() {
    this.props.navigateTo('ApplyRewards')
  }

  renderRewardsDisplay() {
    if (this.props.priceToDeductForCoupon !== 0) {
      return
    }
    if (this.props.hasValidRewards) {
      return (
        <TouchableOpacity
          onPress={this.navigateToApplyRewards}
          style={{ marginBottom: 10 }}>
          <Text style={textLink}>Apply Rewards</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    const {
      ride,
      request = {},
      api,
      isScheduledPickup,
      priceToDeductForCoupon,
    } = this.props
    const { service_type } = request
    const { instant_discount } = api
    const {
        driver_eta,
        pricing = {},
      } = ride
    const { total } = pricing
    const prettyTotal = formatDollars(getPrice(total, priceToDeductForCoupon))
    const prettyEta = Math.ceil(driver_eta / 60) || 1
    const plural = prettyEta === 1 ? '' : 's'
    const disclaimerBase = '*Price subject to change'
    const disclaimer = pricing.tolls == 0
      ? `${disclaimerBase} and does not include tolls`
      : disclaimerBase
    const pickupText = isScheduledPickup ? 'Scheduled Pickup' : 'Estimated Pickup'
    const etaText = isScheduledPickup
      ? moment(request.pickupTime).format('ddd, MMM D, h:mm a ')
      : `${prettyEta} Minute${plural}`
    const cashPrice = getPrice(total, instant_discount)
    const cashPriceWithCoupon = getPrice(cashPrice, priceToDeductForCoupon)
    return (
      <View style={styles.container}>
        {
          isScheduledPickup
            ? <View style={{ flex: 1 }} />
            : null
        }
        <Text style={[styles.green, styles.textLabel, styles.paddingTop]}>{pickupText}</Text>
        <Text
          style={[styles.white, styles.text, styles.bold]}>
          {etaText}
        </Text>
        {
          shouldShowDiscount(instant_discount, service_type)
            ? <View style={{ flexDirection: 'column', alignItems: 'center', padding: 10 }}>
              <Text style={[styles.white, styles.text, styles.bold]}>{`$${prettyTotal}`}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <View style={{ flex: 1 }} />
                <Text
                  style={[styles.white, styles.text, styles.bold, { color: accentColor }]}>
                  {`$${formatDollars(cashPriceWithCoupon)}`}
                </Text>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={[styles.discount, styles.green]}>(cash price)</Text>
                </View>
              </View>
            </View>
            : <Text
              style={[{ color: accentColor }, styles.text, styles.bold]}>
              {`$${prettyTotal}`}
            </Text>
        }
        { this.renderRewardsDisplay() }
        {
          isScheduledPickup
            ? <View style={{ flex: 1 }} />
            : null
        }
        <PressOnceTouchableOpacity
          buttonName={'confirmRide'}
          style={buttonContainerStyleLarge}
          onPress={this.confirmRide} >
          <Text style={buttonTextStyle}>CONFIRM</Text>
        </PressOnceTouchableOpacity>
        <Text
          style={[styles.green, styles.textLabel, styles.paddingBottom]}>
          {disclaimer}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: navbarBackground,
    borderTopWidth: 1,
    borderTopColor: iconColor,
  },
  green: {
    color: iconColor,
  },
  white: {
    color: 'white',
  },
  text: {
    fontSize: 25,
  },
  textLabel: {
    fontSize: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
  discount: {
    fontStyle: 'italic',
  },
  paddingTop: {
    paddingTop: 10,
  },
  paddingBottom: {
    paddingBottom: 10,
  },
})

export default ConfirmRideOption

import React, {
  Component,
  PropTypes,
} from 'react'
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
} from 'react-native'
import CancelBookingButton from './CancelBookingButton'
import EtaDisplay from './EtaDisplay'
import EtaIncrementer from './EtaIncrementer'
import MoneyDisplay from './MoneyDisplay'
import EstimatedTimeDisplay from './EstimatedTimeDisplay'
import { isDriverArrived } from '../api/data'
import { navbarBackground } from '../styles'

const { width } = Dimensions.get('window')
const isIn = (codes, code) => codes.some(status => status === code)
const cancelBookingStatuses = [0, 1, 2, 5, 7, 8, 9, 10, 11, 12, 14]
const moneyStatuses = [1, 2, 3, 4, 11]
const arrivedDestinationStatuses = [4]
const passengerEnrouteStatuses = [3]
const driverEnrouteStatuses = [1, 11]
const isCancelBooking = code => isIn(cancelBookingStatuses, code)
const isMoney = code => isIn(moneyStatuses, code)
const isArrivedDestination = code => isIn(arrivedDestinationStatuses, code)
const isPassengerEnroute = code => isIn(passengerEnrouteStatuses, code)
const isDriverEnroute = code => isIn(driverEnrouteStatuses, code)

class DriverOnTheWayTopBar extends Component {
  renderCancelBooking(jobStatus) {
    return (jobStatus === undefined || isCancelBooking(jobStatus)) ?
      <CancelBookingButton navigateTo={this.props.navigateTo} /> :
      null
  }

  renderEstimatedTime(jobStatus) {
    const { ride } = this.props
    const { destination_eta = 0 } = ride

    if (isArrivedDestination(jobStatus)) return (<EstimatedTimeDisplay seconds={0} arrived />)
    else if (isPassengerEnroute(jobStatus)) {
      return (
        <EstimatedTimeDisplay
          seconds={destination_eta}
          arrived={false} />
      )
    }
    return null
  }

  renderEta(jobStatus) {
    const { ride } = this.props
    const {
      driver_info = {},
        alertDriverTime,
    } = ride

    if (isDriverEnroute(jobStatus)) {
      const { driver_eta } = driver_info
      return <EtaDisplay seconds={driver_eta} />
    } else if (isPassengerEnroute(jobStatus) || isArrivedDestination(jobStatus)) {
      return null
    } else if (isDriverArrived(jobStatus) && !!alertDriverTime) {
      return <EtaIncrementer />
    }
    return null
  }

  renderMoney(jobStatus) {
    const { payment } = this.props
    const { due } = payment
    return isMoney(jobStatus)
      ? <MoneyDisplay dollars={due} />
      : null
  }

  renderWaitPayment() {
    const { payment } = this.props
    const {
      due,
      paid,
    } = payment
    const WaitPaymentElement = <Text style={styles.waitText}>Waiting for Payment</Text>
    return (due && paid && (due < paid)) ? WaitPaymentElement : null
  }

  renderWaitExtraCharges() {
    const { ride } = this.props
    const {
      job_status,
      alertDriverTime,
    } = ride
    const WaitExtraChargesElement =
      <Text style={styles.waitText}>Extra charges may apply past 5 minutes.</Text>

    return (isDriverArrived(job_status) && !!alertDriverTime) ? WaitExtraChargesElement : null
  }

  render() {
    const { ride } = this.props
    const { job_status } = ride
    const CancelBookingElement = this.renderCancelBooking(job_status)
    const EstimateTimeElement = this.renderEstimatedTime(job_status)
    const EtaElement = this.renderEta(job_status)
    const MoneyElement = this.renderMoney(job_status)
    const WaitPaymentElement = this.renderWaitPayment()
    const WaitExtraChargesElement = this.renderWaitExtraCharges()
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          {CancelBookingElement}
          {EstimateTimeElement}
          {EtaElement}
          {MoneyElement}
        </View>
        <View style={styles.waitContainer}>
          {WaitPaymentElement}
          {WaitExtraChargesElement}
        </View>
      </View>
    )
  }
}

DriverOnTheWayTopBar.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  ride: PropTypes.shape({
    job_status: PropTypes.number,
    alertDriverTime: PropTypes.instanceOf(Date),
  }).isRequired,
  payment: PropTypes.shape({
    due: PropTypes.number,
    paid: PropTypes.number,
  }).isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: navbarBackground,
    padding: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width,
  },
  waitContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width,
  },
  waitText: {
    color: 'white',
    fontSize: 15,
  },
})

export default DriverOnTheWayTopBar

import React, {
  Component,
  PropTypes,
} from 'react'
import { View } from 'react-native'
import ConfirmRideOption from './ConfirmRideOption'
import ProcessRequestLoader from './ProcessRequestLoader'
import DriverReassigned from './DriverReassigned'
import DriverOnTheWayInfo from './DriverOnTheWayInfo'
import EnRouteOptions from './EnRouteOptions'

function isDriverAssigned(driver) {
  return !!driver.driver_id
}

function isDriverPickup(jobStatus) {
  return jobStatus === 3
}

function isEmptyObject(object) {
  return Object.keys(object).length === 0
}

class DriverOnTheWayFooter extends Component {
  static propTypes = {
    confirmRideThunk: PropTypes.func.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }).isRequired,
    ride: PropTypes.shape({
      quote_id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      pricing: PropTypes.shape({
        total: PropTypes.number.isRequired,
      }),
      driver_info: PropTypes.object,
      job_status: PropTypes.number,
    }),
    request: PropTypes.object.isRequired,
    api: PropTypes.object,
    payment: PropTypes.object,
    isScheduledPickup: PropTypes.bool,
    isDestinationAirport: PropTypes.bool,
    modalShow: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired,
    getQuoteThunk: PropTypes.func.isRequired,
    alertDriverThunk: PropTypes.func.isRequired,
    hasValidRewards: PropTypes.bool.isRequired,
    priceToDeductForCoupon: PropTypes.number.isRequired,
    couponCode: PropTypes.string.isRequired,
  }

  updateFooter() {
    const {
      user = {},
      ride = {},
      request = {},
      payment = {},
      api = {},
      isScheduledPickup,
      confirmRideThunk,
      getQuoteThunk,
      navigateTo,
      modalShow,
      alertDriverThunk,
      isDestinationAirport,
      hasValidRewards,
      priceToDeductForCoupon,
      couponCode,
    } = this.props
    const {
      job_no,
      job_status,
      driver_info = {},
      destination = {},
    } = ride
    const { car_type } = request

    if (isEmptyObject(ride)) {
      // when ride is over, hide the loader
      return null
    } else if (!job_no) {
      // Client needs to confirm the job
      return (
        <ConfirmRideOption
          api={api}
          confirmRideThunk={confirmRideThunk}
          navigateTo={navigateTo}
          ride={ride}
          request={request}
          isScheduledPickup={isScheduledPickup}
          isDestinationAirport={isDestinationAirport}
          hasValidRewards={hasValidRewards}
          priceToDeductForCoupon={priceToDeductForCoupon}
          couponCode={couponCode}
          user={user} />
      )
    } else if (job_status === undefined) {
      // Driver is no assigned yet && Request is still being processed
      return (
        <ProcessRequestLoader car={car_type} />
      )
    } else if (job_status === 0) {
      // Dispatcher is assigning driver
      return (
        <ProcessRequestLoader car={car_type} isDispatching />
      )
    } else if (job_status === 7) {
      // Dispatcher is re-assigning driver
      return (
        <View>
          <DriverReassigned />
          <ProcessRequestLoader car={car_type} isDispatching />
        </View>
      )
    } else if (isDriverPickup(job_status)) {
      // Passenger was picked up - status code 3
      return (
        <EnRouteOptions
          destination={destination}
          modalShow={modalShow}
          navigateTo={navigateTo}
          getQuoteThunk={getQuoteThunk}
          request={request}
          ride={ride}
          user={user}
          payment={payment} />
      )
    } else if (isDriverAssigned(driver_info)) {
      // Driver is assigned and enroute to meet with the client (Driver exists),
      // should be status code 1-2
      return (
        <DriverOnTheWayInfo
          alertDriverThunk={alertDriverThunk}
          driver={driver_info}
          ride={ride}
          user={user} />
      )
    }
    // Driver is being reassigned
    return <DriverReassigned />
  }

  render() {
    const FooterComponent = this.updateFooter()
    return FooterComponent
  }
}

export default DriverOnTheWayFooter

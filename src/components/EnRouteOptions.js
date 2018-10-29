import React, {
  Component,
  PropTypes,
} from 'react'
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import InputIconWrapper from './InputIconWrapper'
import {
  placeholderText,
  primaryColor,
  accentColor,
  navbarBackground,
} from '../styles'

const { width } = Dimensions.get('window')

class EnRouteOptions extends Component {
  constructor(props) {
    super(props)
    const { destination } = this.props
    this.state = {
      open: false,
      destination,
    }
  }

  onChangeDestination(data, details) {
    const {
      formatted_address,
      geometry = {},
    } = details
    const {
      lat,
      lng,
    } = geometry.location
    const destination = {
      address: formatted_address,
      latlng: `${lat},${lng}`,
      lat,
      lng,
    }
    this.setState({ destination })
    // fetches an estimate of basic route
    const {
      user,
      request,
      ride,
      getQuoteThunk,
    } = this.props
    const {
      email,
      password,
      location,
    } = user
    const { job_no } = ride
    const {
      allow_pet,
      childseats,
      car_type,
      service_type,
      meet_greet,
      wheelchair_access,
      special_requests,
      meeting,
    } = request
    const newRide = {
      destination,
      allow_pet,
      childseats,
      car_type,
      service_type,
      meet_greet,
      wheelchair_access,
      special_requests,
      meeting,
    }
    const onReject = () => {
      this.setState({
        destination: this.props.destination,
      })
    }

    // get quotes
    getQuoteThunk(email, password, newRide, destination, job_no, onReject, location)
  }

  getDestinationElement() {
    const { modalShow } = this.props
    const {
      open,
      destination,
    } = this.state
    if (open) {
      return (
        <View style={[styles.line, styles.marginBottom]}>
          <View style={styles.bufferView}>
            <InputIconWrapper
              source="destination"
              InputType="GooglePlacesInput"
              modalShow={modalShow}
              onPress={(data, details) => this.onChangeDestination(data, details)}
              placeholder={'Change Destination'}
              placeholderTextColor={placeholderText}
              value={destination.address} />
          </View>
        </View>
      )
    }
    return null
  }
  toggleChangeDestination() {
    const { open } = this.state
    this.setState({
      open: !open,
    })
  }

  render() {
    const {
      user,
      payment,
    } = this.props
    const { open } = this.state
    const buttonText = open ? '-' : '+'
    const DestinationElement = this.getDestinationElement()
    const voucherAccount = user.voucher_account
    const navigationText = voucherAccount ? 'Enter Voucher Id' : 'PAY NOW'

    const payButton = (
      <TouchableOpacity
        style={{ flex: 100 }}
        onPress={() => {
          if (voucherAccount) this.props.navigateTo('EnterVoucherId')
          else this.props.navigateTo('Payment')
        }}>
        <View style={[styles.button, styles.accentButton, styles.payButton]}>
          <Text style={[styles.text, styles.textNavy]}>{navigationText}</Text>
        </View>
      </TouchableOpacity>
    )
    const alreadyPaidButton = (
      <View style={[styles.button, styles.accentButton, styles.payButton, { opacity: 0.8 }]}>
        <Text style={[styles.text, styles.textNavy]}>Paid</Text>
      </View>
    )
    const alreadyPaid = payment.due <= 0
    return (
      <View style={styles.container}>
        {DestinationElement}
        <View style={styles.line}>
          <TouchableOpacity onPress={() => this.toggleChangeDestination()}>
            <View style={[styles.button, styles.accentButton, styles.toggleButton]}>
              <Text style={[styles.text, styles.textNavy]}>{buttonText}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.bufferView}>
            {alreadyPaid ? alreadyPaidButton : payButton}
          </View>
        </View>
      </View>
    )
  }
}

EnRouteOptions.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  destination: PropTypes.shape({
    address: PropTypes.string.isRequired,
  }).isRequired,
  request: PropTypes.shape({

  }).isRequired,
  ride: PropTypes.shape({
    job_no: PropTypes.number.isRequired,
  }).isRequired,
  payment: PropTypes.object,
  modalShow: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  getQuoteThunk: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width,
  },
  marginBottom: {
    marginBottom: 5,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  textNavy: {
    color: primaryColor,
  },
  textWhite: {
    color: 'white',
  },
  accentButton: {
    backgroundColor: accentColor,
  },
  primaryButton: {
    backgroundColor: navbarBackground,
  },
  toggleButton: {
    width: 40,
  },
  payButton: {
    marginLeft: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bufferView: {
    flex: 100,
  },
})

export default EnRouteOptions

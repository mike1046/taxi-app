/* eslint no-return-assign: 0 */
import React, {
  Component,
  PropTypes,
} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Switch,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  petOptions,
  carClassedOptions,
  childOptions,
} from '../api/data'
import ToggleElementsMenu from '../components/ToggleElementsMenu'
import PressOnceTouchableOpacity from '../components/PressOnceTouchableOpacity'
import CarSwiper from '../components/CarSwiper'
import InputIconWrapper from '../components/InputIconWrapper'
import PhoneInput from '../components/PhoneInput'
import {
  buttonContainerStyleLarge,
  buttonTextStyle,
  placeholderText,
  generalFontSize,
  androidMarginFix,
  accentColor,
  darkAccentColor,
  primaryOutlineColor,
  primaryTransparentColor,
  itemGroupLabel,
} from '../styles'
import { loadAsync } from '../utils/asyncStorage'
import { getEstimateThunk } from '../actions/ride'
import {
  setPickupLocation,
  setPickupTime,
  setPickupMeetGreet,
  setPickupAirline,
  setDestination,
  setDestinationAirline,
  setPickupFlightNum,
} from '../actions/pickup'
import {
  modalShow,
  alertText,
} from '../actions/modal'

function chooseCarList(num) {
  switch (num) {
    case 1:
      return 'eco'
    case 2:
      return 'prem'
    default:
    case 0:
      return 'all'
  }
}

class RequestPickup extends Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
      vip_account: PropTypes.bool,
      tip_type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      voucher_account: PropTypes.bool,
    }),
    pickup: PropTypes.object.isRequired,
    api: PropTypes.object.isRequired,
    getEstimateThunk: PropTypes.func.isRequired,
    modalShow: PropTypes.func.isRequired,
    setPickupLocation: PropTypes.func.isRequired,
    setPickupTime: PropTypes.func.isRequired,
    setPickupMeetGreet: PropTypes.func.isRequired,
    setPickupAirline: PropTypes.func.isRequired,
    setDestination: PropTypes.func.isRequired,
    setDestinationAirline: PropTypes.func.isRequired,
    setPickupFlightNum: PropTypes.func.isRequired,
    alertText: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.onChangePickup = this.onChangePickup.bind(this)
    this.onChangeDestination = this.onChangeDestination.bind(this)
    this.onChangeCar = this.onChangeCar.bind(this)
    this.onChangeChildren = this.onChangeChildren.bind(this)
    this.onChangePets = this.onChangePets.bind(this)
    this.onChangeCountryCode = this.onChangeCountryCode.bind(this)
    this.onChangePickupTime = this.onChangePickupTime.bind(this)
    this.onBlurAlternatePhone = this.onBlurAlternatePhone.bind(this)
    this.onBlurPassengerName = this.onBlurPassengerName.bind(this)
    this.onBlurPassengerEmail = this.onBlurPassengerEmail.bind(this)
    this.onBlurSpecialRequests = this.onBlurSpecialRequests.bind(this)
    this.onBlurVouchersId = this.onBlurVouchersId.bind(this)
    this.onChangeWheelchairAccess = this.onChangeWheelchairAccess.bind(this)
    this.submitRide = this.submitRide.bind(this)
    this.scrollToMoreOptions = this.scrollToMoreOptions.bind(this)

    this.state = {
      allow_pet: petOptions[0],
      childseats: childOptions[0],
      car_type: 'any',
      service_type: this.props.user.vip_account ? 'premium' : 'economy',
      meet_greet: false,
      wheelchair_access: false,
      special_request: '',
      phone2: '',
      phone2_code: '255',
      displayCountry: '+1',
      passenger_name: '',
      passenger_email: '',
      vouchers_id: '',
      tip_rate: isNaN(props.user.tip_type) ? 0 : props.user.tip_type,
    }
  }

  componentDidMount() {
    const {
      setPickupLocation,
      pickup: { isScheduledPickup },
    } = this.props
    if (!isScheduledPickup) {
      const pickupKey = `${this.props.user.email}-default_pickup`
      loadAsync(pickupKey)
        .then((response) => {
          if (response[pickupKey]) {
            setPickupLocation(response[pickupKey], { isAirport: false })
          }
        })
    }
  }

  onChangeCar(car) {
    if (!car) return
    const car_type = car.value.type
    this.setState({ car_type })
    this.setState({ service_type: car.isPremium ? 'premium' : 'economy' })
  }

  onChangeCountryCode(countryValue) {
    const {
      id,
      code,
    } = countryValue
    const update = {
      phone2_code: id,
      displayCountry: code,
    }
    this.setState(update)
  }

  onChangePets(allow_pet) {
    this.setState({ allow_pet })
  }

  onChangeChildren(childseats) {
    this.setState({ childseats })
  }

  onChangeWheelchairAccess(wheelchair_access) {
    this.setState({ wheelchair_access })
    if (wheelchair_access) {
      Alert.alert(
        'Wheelchair Access',
        `This feature is not yet available in app. Please call 718-499-6227
        to request a wheelchair accessible vehicle.`, [
          {
            text: 'Cancel',
            onPress: () => this.setState({ wheelchair_access: false }),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => this.setState({ wheelchair_access: false }),
          },
        ],
      )
    }
  }

  onChangePickup(data) {
    const {
      setPickupLocation,
      pickup: {
        isPickupAirport,
      },
    } = this.props
    setPickupLocation(data, { isAirport: isPickupAirport })
  }


  onChangeDestination(data) {
    const {
      setDestination,
      pickup: {
        isDestinationAirport,
      },
    } = this.props
    setDestination(data, { isAirport: isDestinationAirport })
  }

  onChangePickupTime(pickupTime) {
    this.setState({ pickupTime })
  }
  onBlurAlternatePhone(phone2) {
    this.setState({ phone2 })
  }
  onBlurVouchersId(vouchers_id) {
    this.setState({ vouchers_id })
  }
  onBlurPassengerName(passenger_name) {
    this.setState({ passenger_name })
  }
  onBlurPassengerEmail(passenger_email) {
    this.setState({ passenger_email })
  }
  onBlurSpecialRequests(special_request) {
    this.setState({ special_request })
  }

  submitRide() {
    const {
      user,
      pickup,
      getEstimateThunk,
    } = this.props
    const {
      pickupLocation,
      destination,
      meet_greet,
      pickupTime,
      isPickupAirport,
      isDestinationAirport,
      isScheduledPickup,
    } = pickup
    const {
      email,
      password,
      location,
    } = user

    // messy: getting information both from local state and reducers
    // also messy: morphing the shape for the API in this component
    // todo: fix
    const updatedRide = Object.assign({}, this.state, {
      meeting: { ...pickupLocation },
      destination: { ...destination }, // spread so UI doesn't break if anything is missing
      meet_greet,
      pickupTime,
      childseats: this.state.childseats.value,
      allow_pet: this.state.allow_pet.value,
      tip_rate: isNaN(user.tip_type) ? 0 : user.tip_type,
      flight_no: pickupLocation.flightNum || destination.flightNum || '',
      airline: pickupLocation.airline.airline_name, // put it in the correct place for API
    })

    // todo: ask marvin if a destination's airline is important
    // update: it's not
    delete updatedRide.destination.airline
    delete updatedRide.destination.flightNum
    delete updatedRide.meeting.airline // get rid of redundant data
    delete updatedRide.meeting.flightNum

    if (!isPickupAirport) {
      delete updatedRide.flight_no
      delete updatedRide.airline
    }
    if (!isDestinationAirport) delete updatedRide.destination.airline
    if (!isScheduledPickup) delete updatedRide.pickupTime

    getEstimateThunk(
      email,
      password,
      updatedRide,
      location,
      isScheduledPickup,
    )
  }

  fieldsFilled() {
    const { pickup } = this.props
    return pickup.isScheduledPickup
      ? (
        pickup.pickupLocation.address.length !== 0
        && pickup.destination.address.length !== 0
        && pickup.pickupTime
      )
      : (
        pickup.pickupLocation.address.length !== 0
        && pickup.destination.address.length !== 0
      )
  }

  scrollToMoreOptions(show_more, yOffset) {
    if (!show_more) this.scroll.scrollToPosition(0, yOffset, true)
  }

  render() {
    const {
      user,
      pickup: {
        pickupLocation,
        destination,
        isScheduledPickup,
        isPickupAirport,
        isDestinationAirport,
        pickupTime,
        meet_greet,
      },
      api: {
        meet_greet_val,
      },
      modalShow,
      setPickupMeetGreet,
      setPickupFlightNum,
      setPickupAirline,
      setPickupTime,
      setDestinationAirline,
      alertText,
    } = this.props
    const {
      wheelchair_access,
      displayCountry,
      childseats,
      allow_pet,
    } = this.state
    const isVoucher = this.props.user.voucher_account
    const carSet = chooseCarList(user.service_type)

    return (
      <View style={[styles.container, styles.outer, androidMarginFix]}>
        <KeyboardAwareScrollView ref={scroll => this.scroll = scroll}>
          <View style={styles.container}>
            <CarSwiper
              options={carClassedOptions[carSet]}
              onChange={this.onChangeCar} />
            {
              isScheduledPickup || isPickupAirport
              ? <Text style={[styles.text, itemGroupLabel]}>PICKUP INFORMATION:</Text>
              : null
            }
            {
              isScheduledPickup
                ? <InputIconWrapper
                  source="ccmonth"
                  InputType="TimePickerInput"
                  alertText={alertText}
                  handleDateChange={setPickupTime}
                  modalShow={modalShow}
                  value={pickupTime} />
                : null
            }
            {
              isPickupAirport
              ? <View>
                <InputIconWrapper
                  source="pickup"
                  InputType="AutocompleteInput"
                  modalShow={modalShow}
                  type="airports"
                  onPress={this.onChangePickup}
                  placeholder="Pickup"
                  searchPlaceholder="Search Airports"
                  placeholderTextColor={placeholderText}
                  value={pickupLocation.address} />
                <InputIconWrapper
                  source="airline"
                  InputType="AutocompleteInput"
                  modalShow={modalShow}
                  type="airlines"
                  onPress={setPickupAirline}
                  placeholder="Airline"
                  searchPlaceholder="Pickup Airline"
                  placeholderTextColor={placeholderText}
                  value={pickupLocation.airline.airline_name} />
                <InputIconWrapper
                  source="number"
                  InputType="TextInput"
                  keyboardType="number-pad"
                  onChangeText={setPickupFlightNum}
                  placeholder="Enter Flight Number"
                  value={pickupLocation.flightNum}
                  placeholderTextColor={placeholderText} />
                <View style={[styles.row, styles.inline, styles.meetGreetBox]}>
                  <View style={[styles.inline]}>
                    <Text style={[styles.text, { color: 'white' }]}>Meet and Greet?</Text>
                    <Text style={{ color: accentColor, fontSize: 15 }}> {`(+$${meet_greet_val})`}</Text>
                  </View>
                  <Switch
                    thumbTintColor={accentColor}
                    onTintColor={darkAccentColor}
                    tintColor={primaryOutlineColor}
                    onValueChange={setPickupMeetGreet}
                    value={meet_greet} />
                </View>
              </View>
              : <InputIconWrapper
                source="pickup"
                InputType="GooglePlacesInput"
                currentLocation={user.location.available}
                autoFillFirstResult={user.location.available}
                modalShow={modalShow}
                onPress={this.onChangePickup}
                placeholder="Pickup"
                placeholderTextColor={placeholderText}
                value={pickupLocation.address} />
            }
            {
              isScheduledPickup || isPickupAirport
              ? <Text style={[styles.text, itemGroupLabel]}>DROPOFF INFORMATION:</Text>
              : null
            }
            {
              isDestinationAirport
              ? <View>
                <InputIconWrapper
                  source="destination"
                  InputType="AutocompleteInput"
                  style={{ marginBottom: 5 }}
                  modalShow={modalShow}
                  type="airports"
                  onPress={this.onChangeDestination}
                  placeholder="Destination"
                  searchPlaceholder="Search Airports"
                  placeholderTextColor={placeholderText}
                  value={destination.address} />
                <InputIconWrapper
                  source="airline"
                  style={{ marginBottom: 5 }}
                  InputType="AutocompleteInput"
                  modalShow={modalShow}
                  type="airlines"
                  onPress={setDestinationAirline}
                  placeholder="Airline"
                  searchPlaceholder="Search Airlines"
                  placeholderTextColor={placeholderText}
                  value={destination.airline.airline_name} />
              </View>
              : <InputIconWrapper
                source="destination"
                InputType="GooglePlacesInput"
                currentLocation={user.location.available}
                autoFillFirstResult={user.location.available}
                modalShow={modalShow}
                onPress={this.onChangeDestination}
                placeholder="Destination"
                placeholderTextColor={placeholderText}
                value={destination.address} />
            }
            <ToggleElementsMenu
              ref={moreOptionsElement => this.moreOptionsElement = moreOptionsElement}
              onChange={this.scrollToMoreOptions}
              text="More options">
              <InputIconWrapper
                source="childseat"
                InputType="PickerInput"
                inputTitle="CHILDSEAT OPTIONS"
                handleChange={this.onChangeChildren}
                modalShow={modalShow}
                options={childOptions}
                label={childseats.label} />
              <InputIconWrapper
                source="pet"
                InputType="PickerInput"
                inputTitle="PET OPTIONS"
                handleChange={this.onChangePets}
                modalShow={modalShow}
                options={petOptions}
                label={allow_pet.label} />
              <PhoneInput
                countryCodeValue={displayCountry}
                onPressCountryCode={this.onChangeCountryCode}
                onChangePhoneNum={this.onBlurAlternatePhone}
                placeholder="Alternate Phone #"
                placeholderTextColor={placeholderText}
                modalShow={modalShow} />
              <InputIconWrapper
                source="cardname"
                InputType="TextInput"
                placeholder="Passenger Name"
                placeholderTextColor={placeholderText}
                onChangeText={this.onBlurPassengerName} />
              <InputIconWrapper
                source="email"
                InputType="TextInput"
                placeholder="Passenger Email"
                placeholderTextColor={placeholderText}
                keyboardType="email-address"
                onChangeText={this.onBlurPassengerEmail} />
              <InputIconWrapper
                source="specialrequests"
                InputType="TextInput"
                keyboardType="default"
                placeholder="Special Requests"
                placeholderTextColor={placeholderText}
                onChangeText={this.onBlurSpecialRequests} />
              {
                isVoucher
                  ? <InputIconWrapper
                    InputType="TextInput"
                    keyboardType="default"
                    placeholder="Voucher Id"
                    placeholderTextColor={placeholderText}
                    onChangeText={this.onBlurVouchersId}
                    autoCorrect={false}
                    autoCapitalize="none" />
                  : null
              }
              <View style={[styles.row, styles.inline]}>
                <Text style={[styles.text, { color: 'white' }]}>Wheelchair Accessible?</Text>
                <Switch
                  thumbTintColor={accentColor}
                  onTintColor={darkAccentColor}
                  tintColor={primaryOutlineColor}
                  onValueChange={this.onChangeWheelchairAccess}
                  value={wheelchair_access} />
              </View>
            </ToggleElementsMenu>
          </View>
        </KeyboardAwareScrollView>

        {
          !this.fieldsFilled()
            ? <View style={buttonContainerStyleLarge}>
              <Text style={[buttonTextStyle, styles.disabled]}>REQUEST A RIDE</Text>
            </View>
            : <PressOnceTouchableOpacity
              style={buttonContainerStyleLarge}
              buttonName="requestRide"
              onPress={this.submitRide}>
              <Text style={buttonTextStyle}>REQUEST A RIDE</Text>
            </PressOnceTouchableOpacity>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  outer: {
    justifyContent: 'space-between',
    flex: 100,
  },
  row: {
    height: 45,
    padding: 10,
    marginBottom: 11,
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: generalFontSize,
  },
  meetGreetBox: {
    backgroundColor: primaryTransparentColor,
    marginLeft: 10,
    marginRight: 10,
    padding: 15,
    marginBottom: 0,
    height: 55,
  },
  disabled: {
    opacity: 0.8,
  },
})

function mapStateToProps({ user, pickup, api }) {
  return { user, pickup, api }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    getEstimateThunk,
    alertText,
    modalShow,
    setPickupLocation,
    setPickupTime,
    setPickupMeetGreet,
    setPickupAirline,
    setDestination,
    setDestinationAirline,
    setPickupFlightNum,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestPickup)

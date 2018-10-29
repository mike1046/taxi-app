import React, {
  Component,
  PropTypes,
} from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Switch,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputIconWrapper from '../components/InputIconWrapper'
import { navigateTo } from '../actions/navigation'
import {
  setPickupAirline,
  setPickupLocation,
  setPickupMeetGreet,
  setPickupFlightNum,
} from '../actions/pickup'
import { modalShow } from '../actions/modal'
import {
  buttonContainerStyleLarge,
  buttonTextStyle,
  placeholderText,
  generalFontSize,
  accentColor,
  darkAccentColor,
  primaryOutlineColor,
} from '../styles'


class AirportPickupOptions extends Component {
  static propTypes = {
    pickup: PropTypes.object.isRequired,
    api: PropTypes.object.isRequired,
    navigateTo: PropTypes.func.isRequired,
    modalShow: PropTypes.func.isRequired,
    setPickupMeetGreet: PropTypes.func.isRequired,
    setPickupAirline: PropTypes.func.isRequired,
    setPickupLocation: PropTypes.func.isRequired,
    setPickupFlightNum: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.onChangeAirport = this.onChangeAirport.bind(this)
    this.onPressContinue = this.onPressContinue.bind(this)
    this.onChangeMeetGreet = this.onChangeMeetGreet.bind(this)
  }

  onPressContinue() {
    this.props.navigateTo('SelectDestination')
  }

  onChangeAirport(result) {
    this.props.setPickupLocation(result, { isAirport: true })
  }

  onChangeMeetGreet(bool) {
    this.props.setPickupMeetGreet(bool)
  }

  render() {
    const {
      pickup: { pickupLocation, meet_greet },
      api: { meet_greet_val },
      modalShow,
    } = this.props
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text style={styles.bigText}>Pickup information</Text>
        </View>
        <InputIconWrapper
          source="pickup"
          InputType="AutocompleteInput"
          modalShow={modalShow}
          type="airports"
          onPress={this.onChangeAirport}
          placeholder="Destination"
          searchPlaceholder="Search Airports"
          placeholderTextColor={placeholderText}
          value={pickupLocation.address} />
        <InputIconWrapper
          source="airline"
          InputType="AutocompleteInput"
          modalShow={modalShow}
          type="airlines"
          onPress={this.props.setPickupAirline}
          placeholder="Enter Airline"
          searchPlaceholder="Search Airlines"
          placeholderTextColor={placeholderText}
          value={pickupLocation.airline.airline_name} />
        <InputIconWrapper
          source="number"
          InputType="TextInput"
          keyboardType="number-pad"
          onChangeText={this.props.setPickupFlightNum}
          placeholder="Enter Flight Number"
          value={pickupLocation.flightNum}
          placeholderTextColor={placeholderText} />
        <View style={[styles.row, styles.inline]}>
          <View style={[styles.inline]}>
            <Text style={[styles.text, { color: 'white' }]}>Meet and Greet?</Text>
            <Text style={{ color: accentColor, fontSize: 15 }}> {`(+$${meet_greet_val})`}</Text>
          </View>
          <Switch
            thumbTintColor={accentColor}
            onTintColor={darkAccentColor}
            tintColor={primaryOutlineColor}
            onValueChange={this.onChangeMeetGreet}
            value={meet_greet} />
        </View>
        <TouchableOpacity
          style={buttonContainerStyleLarge}
          onPress={this.onPressContinue} >
          <Text style={buttonTextStyle}>CONTINUE</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  bigText: {
    color: 'white',
    fontSize: 24,
    margin: 10,
  },
  row: {
    height: 45,
    padding: 12,
    marginBottom: 10,
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: generalFontSize,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 100,
  },
})


function mapStateToProps({ user, pickup, api }) {
  const props = { user, pickup, api }
  return props
}

function mapDispatchToProps(dispatch) {
  const actions = {
    navigateTo,
    setPickupAirline,
    setPickupLocation,
    setPickupMeetGreet,
    setPickupFlightNum,
    modalShow,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(AirportPickupOptions)

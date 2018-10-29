import React, {
  Component,
  PropTypes,
} from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AutocompleteRow from '../components/AutocompleteRow'
import { navigateTo } from '../actions/navigation'
import { modalShow } from '../actions/modal'
import { loadAsync } from '../utils/asyncStorage'
import { setDefaultPickup, setPickupLocation } from '../actions/pickup'
import {
  buttonContainerStyleLarge,
  buttonTextStyle,
  placeholderText,
} from '../styles'


class SelectPickup extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    setDefaultPickup: PropTypes.func.isRequired,
    modalShow: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired,
    setPickupLocation: PropTypes.func.isRequired,
    pickup: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.selectAirport = this.selectAirport.bind(this)
    this.selectAddress = this.selectAddress.bind(this)
    this.useDefaultPickup = this.useDefaultPickup.bind(this)
  }

  componentWillMount() {
    const { setDefaultPickup, user } = this.props
    const pickupKey = `${user.email}-default_pickup`
    loadAsync(pickupKey)
      .then((response) => {
        const default_pickup = response[pickupKey]
        setDefaultPickup(default_pickup)
      })
  }

  selectAirport() {
    const {
      modalShow,
      navigateTo,
      setPickupLocation,
    } = this.props
    modalShow('AutocompleteModal',
      {
        type: 'airports',
        rowComponent: AutocompleteRow,
        placeholderText: 'Search Airports',
        onPressResult: (result) => {
          setPickupLocation(result, { isAirport: true })
          navigateTo('AirportPickupOptions', navigator)
        },
      },
    )
  }

  useDefaultPickup() {
    const {
      pickup: { defaultPickup },
      setPickupLocation,
      navigateTo,
    } = this.props
    setPickupLocation(defaultPickup, { isAirport: false })
    navigateTo('SelectDestination')
  }

  selectAddress() {
    const {
      modalShow,
      setPickupLocation,
      navigateTo,
      user,
    } = this.props
    modalShow('GooglePlacesAutocompleteModal',
      {
        currentLocation: user.location.available,
        placeholderTextColor: placeholderText,
        autoFillFirstResult: true,
        placeholder: 'Search Places',
        onPress: (data) => {
          setPickupLocation(data, { isAirport: false })
          navigateTo('SelectDestination', navigator)
        },
      },
    )
  }

  render() {
    const { pickup: { defaultPickup } } = this.props
    return (
      <View style={styles.content} >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text style={styles.bigText}>Where are we picking you up?</Text>
        </View>
        <TouchableOpacity
          style={buttonContainerStyleLarge}
          onPress={this.selectAddress} >
          <Text style={buttonTextStyle}>ADDRESS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonContainerStyleLarge}
          onPress={this.selectAirport} >
          <Text style={buttonTextStyle}>AIRPORT</Text>
        </TouchableOpacity>
        {
          defaultPickup
          ? <View>
            <TouchableOpacity
              style={buttonContainerStyleLarge}
              onPress={this.useDefaultPickup} >
              <Text style={buttonTextStyle}>{defaultPickup.details.formatted_address}</Text>
            </TouchableOpacity>
            <Text style={styles.littleText}>(Saved pickup location)</Text>
          </View>
          : null
        }
        <View style={{ flex: 1 }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bigText: {
    color: 'white',
    fontSize: 24,
    margin: 10,
  },
  littleText: {
    color: 'white',
    fontSize: 16,
    margin: 10,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 100,
  },
})


function mapStateToProps({ user, pickup }) {
  const props = { user, pickup }
  return props
}

function mapDispatchToProps(dispatch) {
  const actions = {
    navigateTo,
    modalShow,
    setDefaultPickup,
    setPickupLocation,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPickup)

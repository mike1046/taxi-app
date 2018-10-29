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
import { setDestination } from '../actions/pickup'
import {
  buttonContainerStyleLarge,
  buttonTextStyle,
  placeholderText,
} from '../styles'


class SelectDestination extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    pickup: PropTypes.object.isRequired,
    navigateTo: PropTypes.func.isRequired,
    setDestination: PropTypes.func.isRequired,
    modalShow: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.selectAirport = this.selectAirport.bind(this)
    this.selectAddress = this.selectAddress.bind(this)
  }

  selectAirport() {
    this.props.modalShow('AutocompleteModal',
      {
        type: 'airports',
        rowComponent: AutocompleteRow,
        placeholderText: 'Search Airports',
        onPressResult: (result) => {
          this.props.setDestination(result, { isAirport: true })
          this.props.navigateTo('AirportDropoffOptions')
        },
      },
    )
  }

  selectAddress() {
    const { user } = this.props
    this.props.modalShow('GooglePlacesAutocompleteModal',
      {
        currentLocation: user.location.available,
        placeholderTextColor: placeholderText,
        autoFillFirstResult: true,
        placeholder: 'Search Places',
        onPress: (data) => {
          this.props.setDestination(data, { isAirport: false })
          this.props.navigateTo('RequestPickup')
        },
      },
    )
  }

  render() {
    const { pickup: { pickupLocation } } = this.props
    return (
      <View style={styles.content} >
        <View style={{ flex: 0.5, justifyContent: 'flex-end' }}>
          <Text style={[styles.littleText, { marginBottom: 0, fontWeight: 'bold' }]}>Pickup address:</Text>
          <Text style={styles.littleText}>{pickupLocation.address}</Text>
        </View>
        <View style={{ flex: 0.5, justifyContent: 'flex-end' }}>
          <Text style={styles.bigText}>Where are you going?</Text>
        </View>
        <TouchableOpacity
          style={buttonContainerStyleLarge}
          onPress={this.selectAddress} >
          <Text style={buttonTextStyle}>STANDARD ADDRESS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonContainerStyleLarge}
          onPress={this.selectAirport} >
          <Text style={buttonTextStyle}>AIRPORT DROPOFF</Text>
        </TouchableOpacity>
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
    setDestination,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectDestination)

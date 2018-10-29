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
import InputIconWrapper from '../components/InputIconWrapper'
import { navigateTo } from '../actions/navigation'
import { modalShow } from '../actions/modal'
import { setDestinationAirline, setDestination } from '../actions/pickup'
import {
  buttonContainerStyleLarge,
  buttonTextStyle,
  placeholderText,
  generalFontSize,
} from '../styles'

class AirportDropoffOptions extends Component {
  static propTypes = {
    pickup: PropTypes.object.isRequired,
    navigateTo: PropTypes.func.isRequired,
    setDestinationAirline: PropTypes.func.isRequired,
    setDestination: PropTypes.func.isRequired,
    modalShow: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.onChangeAirport = this.onChangeAirport.bind(this)
    this.onPressContinue = this.onPressContinue.bind(this)
  }

  onPressContinue() {
    this.props.navigateTo('RequestPickup')
  }

  onChangeAirport(result) {
    this.props.setDestination(result, { isAirport: true })
  }

  render() {
    const { pickup: { destination }, modalShow } = this.props
    return (
      <View style={styles.content} >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text style={styles.bigText}>Dropoff information</Text>
        </View>
        <InputIconWrapper
          source="pickup"
          InputType="AutocompleteInput"
          type="airports"
          modalShow={modalShow}
          onPress={this.onChangeAirport}
          placeholder="Destination"
          searchPlaceholder="Search Airports"
          placeholderTextColor={placeholderText}
          value={destination.address} />
        <InputIconWrapper
          source="airline"
          InputType="AutocompleteInput"
          type="airlines"
          modalShow={modalShow}
          onPress={this.props.setDestinationAirline}
          placeholder="Enter Airline"
          searchPlaceholder="Search Airlines"
          placeholderTextColor={placeholderText}
          value={destination.airline.airline_name} />
        <TouchableOpacity
          style={buttonContainerStyleLarge}
          onPress={this.onPressContinue} >
          <Text style={buttonTextStyle}>CONTINUE</Text>
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


function mapStateToProps({ pickup }) {
  const props = { pickup }
  return props
}

function mapDispatchToProps(dispatch) {
  const actions = {
    navigateTo,
    setDestinationAirline,
    setDestination,
    modalShow,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(AirportDropoffOptions)

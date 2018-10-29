import React, {
  Component,
  PropTypes,
} from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native'
import { PLACES_BROWSER } from '../api/keys'
import { GooglePlacesAutocomplete } from './GooglePlacesAutocompleteWithAutofill'
import {
  buttonContainerStyle,
  buttonTextStyle,
  primaryColor,
  darkLineColor,
} from '../styles'

const { height } = Dimensions.get('window')

class GooglePlacesAutocompleteModal extends Component {
  constructor(props) {
    super(props)
    this.modalHide = this.props.modalHide.bind(this)
    this.pressHandler = this.pressHandler.bind(this)
  }
  pressHandler(data, details) {
    const {
      modalHide,
      onPress,
    } = this.props
    onPress({ data, details })
    modalHide()
  }

  render() {
    return (
      <View style={[styles.container]}>
        <ScrollView style={[styles.content]}>
          <GooglePlacesAutocomplete
            {...this.props}
            onPress={this.pressHandler} />
          <TouchableOpacity
            style={buttonContainerStyle}
            onPress={this.modalHide}>
            <Text style={buttonTextStyle}>CANCEL</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

GooglePlacesAutocompleteModal.propTypes = {
  modalHide: PropTypes.func,
  onPress: PropTypes.func.isRequired,
}

GooglePlacesAutocompleteModal.defaultProps = {
  minLength: 2,
  autoFocus: true,
  fetchDetails: true,
  query: {
    key: PLACES_BROWSER,
    language: 'en', // language of the results
  },
  styles: {
    textInputContainer: {
      backgroundColor: 'transparent',
      height: 44,
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopWidth: 1,
      borderBottomWidth: 1,
    },
    textInput: {
      color: '#222',
      fontWeight: 'bold',
      backgroundColor: 'lightgrey',
      height: 40,
      borderRadius: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 0,
      marginLeft: 8,
      marginRight: 8,
      fontSize: 18,
    },
    row: {
      height: 50,
    },
    description: {
      fontSize: 18,
      color: 'white',
    },
    separator: {
      height: 1,
      backgroundColor: darkLineColor,
    },
  },
  currentLocation: false,
  // Will add a 'Current location' button at the top of the predefined places list
  currentLocationLabel: 'Use Current Location',
  nearbyPlacesAPI: 'GoogleReverseGeocoding',
  predefinedPlaces: [],
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: primaryColor,
    height: height * 0.8,
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
})

export default GooglePlacesAutocompleteModal

/* eslint react/prefer-stateless-function:0 */
/* eslint prefer-const:0 */
import React, {
  PropTypes,
  Component,
} from 'react'
import {
  StyleSheet,
  View,
  Image,
  TextInput,
} from 'react-native'
import GooglePlacesInput from './GooglePlacesInput'
import CountryCodeInput from './CountryCodeInput'
import AutocompleteInput from './AutocompleteInput'
import TimePickerInput from './TimePickerInput'
import PickerInput from './PickerInput'

import {
  generalFontSize,
  primaryTransparentColor,
} from '../styles'

const inputTypes = {
  TextInput,
  GooglePlacesInput,
  CountryCodeInput,
  TimePickerInput,
  AutocompleteInput,
  PickerInput,
}

const icons = {
  cardname: require('../images/input-icon-cardname/input-icon-cardname.png'),
  ccnum: require('../images/input-icon-ccnum/input-icon-ccnum.png'),
  addstop: require('../images/input-icon-addstop/input-icon-addstop.png'),
  ccmonth: require('../images/input-icon-ccmonth/input-icon-ccmonth.png'),
  ccyear: require('../images/input-icon-ccyear/input-icon-ccyear.png'),
  countrycode: require('../images/input-icon-countrycode/input-icon-countrycode.png'),
  cvv: require('../images/input-icon-cvv/input-icon-cvv.png'),
  destination: require('../images/input-icon-destination/input-icon-destination.png'),
  email: require('../images/input-icon-email/input-icon-email.png'),
  password: require('../images/input-icon-password/input-icon-password.png'),
  pet: require('../images/input-icon-pet/input-icon-pet.png'),
  phone: require('../images/input-icon-phone/input-icon-phone.png'),
  pickup: require('../images/input-icon-pickup/input-icon-pickup.png'),
  tip: require('../images/input-icon-tip/input-icon-tip.png'),
  childseat: require('../images/input-icon-childseat/input-icon-childseat.png'),
  zip: require('../images/input-icon-zipcode/input-icon-zipcode.png'),
  cardtype: require('../images/input-icon-cardtype/input-icon-cardtype.png'),
  airline: require('../images/input-icon-airline/input-icon-airline.png'),
  number: require('../images/input-icon-number/input-icon-number.png'),
  specialrequests: require('../images/input-icon-special-requests/input-icon-special-requests.png'),
}

class InputIconWrapper extends Component {
  render() {
    let {
      source,
      InputType,
      applyInvalidStyle,
      style,
      styleInput,
      ...other
    } = this.props
    let Input = inputTypes[InputType]
    let border
    let inputStyle = [
      styles.allInputs,
      styles[InputType],
      styleInput,
    ]
    if (applyInvalidStyle) border = styles.redBorder
    return (
      <View style={[styles.view, border, style]}>
        <View style={styles.imageWrapper}>
          {
            source
              ? <Image source={icons[source]} style={styles.image} />
              : null
          }
        </View>
        <Input
          {...other}
          style={inputStyle} />
      </View>
    )
  }
}

InputIconWrapper.propTypes = {
  source: PropTypes.string,
  InputType: PropTypes.string.isRequired,
  applyInvalidStyle: PropTypes.bool,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  styleInput: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: primaryTransparentColor,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  imageWrapper: {
    width: 50,
  },
  image: {
    marginLeft: 15,
  },
  allInputs: {
    marginLeft: -45,
    paddingLeft: 60,
    flex: 1,
    height: 55,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  TextInput: {
    color: 'white',
    fontSize: generalFontSize,
  },
  GooglePlacesInput: {},
  CountryCodeInput: {},
  AutocompleteInput: {},
  TimePickerInput: {},
  PickerInput: {},
  redBorder: {
    borderWidth: 2,
    borderColor: 'red',
  },
})


export default InputIconWrapper

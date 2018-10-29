import {
  View,
  Text,
  Image,
  TextInput,
} from 'react-native'
import React, { PropTypes } from 'react'

import {
  primaryTransparentColor,
  generalFontSize,
} from '../styles'
import CountryCodeInput from '../components/CountryCodeInput'

const phoneImg = require('../images/input-icon-phone/input-icon-phone.png')

const PhoneInput = ({
  modalShow,
  onPressCountryCode,
  countryCodeValue,
  onChangePhoneNum,
  placeholder,
  value,
  placeholderTextColor,
  applyInvalidStyle,
}) =>
  <View style={{ flexDirection: 'row' }}>
    <View
      style={styles.countryInputContainer} >
      <View style={{ width: 50 }}>
        <Image source={phoneImg} style={{ marginLeft: 15 }} />
      </View>
      <CountryCodeInput
        value={countryCodeValue}
        onPress={onPressCountryCode}
        style={styles.countryInput}
        modalShow={modalShow} />
    </View>
    <View
      style={styles.phoneInputContainer} >
      <TextInput
        keyboardType="phone-pad"
        onChangeText={onChangePhoneNum}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        value={value}
        style={[
          styles.phoneInput,
          { borderWidth: applyInvalidStyle ? 2 : 0 },
        ]} />
    </View>
  </View>

const styles = {
  phoneInput: {
    color: 'white',
    fontSize: generalFontSize,
    padding: 10,
    paddingLeft: 15,
    height: 55,
    flex: 1,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderColor: 'red',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 4,
    justifyContent: 'flex-start',
    backgroundColor: primaryTransparentColor,
    marginBottom: 5,
    marginRight: 10,
  },
  countryInput: {
    padding: 15,
    paddingLeft: 60,
    marginLeft: -45,
    paddingBottom: 17,
  },
  countryInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: primaryTransparentColor,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 5,
  },

}

PhoneInput.propTypes = {
  modalShow: PropTypes.func,
  onPressCountryCode: PropTypes.func,
  countryCodeValue: PropTypes.string,
  onChangePhoneNum: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  applyInvalidStyle: PropTypes.bool,
}

export default PhoneInput

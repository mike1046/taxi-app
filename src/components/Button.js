import React, { PropTypes } from 'react'
import {
  TouchableOpacity,
  Text,
} from 'react-native'
import {
  buttonContainerStyleLarge,
  buttonTextStyle,
} from '../styles'

const Button = ({
  onPress,
  label,
}) =>
  <TouchableOpacity
    style={buttonContainerStyleLarge}
    onPress={onPress}>
    <Text style={buttonTextStyle}>{label}</Text>
  </TouchableOpacity>

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default Button

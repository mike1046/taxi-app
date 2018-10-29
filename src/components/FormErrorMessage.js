import React, { PropTypes } from 'react'
import {
  Text,
  StyleSheet,
} from 'react-native'

const FormErrorMessage = ({ message }) =>
  <Text style={styles.message}>{message}</Text>

FormErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  message: {
    color: 'red',
    fontSize: 13,
    paddingBottom: 3,
  },
})

export default FormErrorMessage

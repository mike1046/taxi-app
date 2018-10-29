/* eslint no-unused-expressions:0 */
import React, {
  PropTypes,
} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import {
  primaryColor,
  accentColor,
  generalFontSize,
} from '../styles'

const { width } = Dimensions.get('window')

const LoaderWithActionModal = ({
  text,
  buttonText,
  modalHide,
  closeOverride,
}) =>
  <View style={[styles.content, { width: width * 0.8 }]}>
    <Text style={styles.text}> {text} </Text>
    <TouchableOpacity
      onPress={() => {
        closeOverride ?
          closeOverride()
          : modalHide()
      }}>
      <Text style={styles.button}>{buttonText}</Text>
    </TouchableOpacity>
  </View>

LoaderWithActionModal.propTypes = {
  buttonText: PropTypes.string,
  modalHide: PropTypes.func,
  text: PropTypes.string,
  closeOverride: PropTypes.func,
}

LoaderWithActionModal.defaultProps = {
  buttonText: 'OK',
  text: 'Loading...',
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: primaryColor,
    padding: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: generalFontSize,
    padding: 8,
    color: accentColor,
  },
  button: {
    backgroundColor: accentColor,
    color: primaryColor,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: generalFontSize,
    marginTop: 3,
    marginBottom: 3,
    paddingTop: 10,
    paddingBottom: 10,
  },
})

export default LoaderWithActionModal

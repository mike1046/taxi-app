import React, { PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'
import LoaderSpinner from './LoaderSpinner'
import {
  accentColor,
  generalFontSize,
} from '../styles'

const { width } = Dimensions.get('window')

const LoaderModal = ({
  text,
  showSpinner,
}) =>
  <View style={[styles.content, { width: width * 0.8 }]}>
    {showSpinner ? <LoaderSpinner /> : null}
    <Text style={styles.text}> {text} </Text>
  </View>

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'transparent',
    padding: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: generalFontSize,
    padding: 8,
    color: accentColor,
  },
})

LoaderModal.propTypes = {
  text: PropTypes.string,
  showSpinner: PropTypes.bool,
}

LoaderModal.defaultProps = {
  text: 'Loading...',
  showSpinner: true,
}

export default LoaderModal

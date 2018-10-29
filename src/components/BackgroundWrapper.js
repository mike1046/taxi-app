import React, { PropTypes } from 'react'
import { View, StyleSheet } from 'react-native'

const BackgroundWrapper = ({ children }) =>
  <View
    style={styles.background}>
    {children}
  </View>

BackgroundWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
}

const styles = StyleSheet.create({
  background: {
    flex: 100,
    width: null,
    height: null,
    backgroundColor: '#1C4B6B',
  },
})

export default BackgroundWrapper

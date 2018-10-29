import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import {
  iconColor,
  navbarBackground,
} from '../styles'

const DriverReassigned = () =>
  <View style={styles.container}>
    <Text style={[styles.green, styles.text]}>We're sorry, your driver has been reassigned.</Text>
    <Text style={[styles.white, styles.text, styles.bold]}>... please wait ...</Text>
  </View>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: navbarBackground,
    borderTopWidth: 1,
    borderTopColor: iconColor,
  },
  green: {
    color: iconColor,
  },
  white: {
    color: 'white',
  },
  text: {
    fontSize: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
})

export default DriverReassigned

import React, { PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native'
import { formatDollars } from '../utils'

const MoneyDisplay = ({ dollars }) => {
  const prettyDollars = formatDollars(dollars)
  return (
    <View style={styles.container}>
      <Image source={require('../images/dollar/dollar.png')} style={styles.part} />
      <Text style={[styles.text, styles.white, styles.part]}>${prettyDollars}</Text>
    </View>
  )
}

MoneyDisplay.propTypes = {
  dollars: PropTypes.number.isRequired,
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
  },
  white: {
    color: 'white',
  },
  part: {
    paddingLeft: 4,
    paddingRight: 4,
  },
})

export default MoneyDisplay

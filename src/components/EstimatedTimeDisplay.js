import React, { PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native'
import { iconColor } from '../styles'
import { formatSeconds } from '../utils'

const EstimatedTimeDisplay = ({ seconds, arrived }) => {
  const prettyTime = formatSeconds(seconds)
  const EstimatedArrivalElement = [
    <Text key={0} style={[styles.textLabel, styles.bold, styles.green]}>ESTIMATED</Text>,
    <Text key={1} style={[styles.textLabel, styles.bold, styles.green]}>TRAVEL TIME</Text>,
  ]
  const ArrivedElement = [
    <Image key={0} source={require('../images/arrived/arrived.png')} />,
    <Text key={1} style={[styles.textLabel, styles.bold, styles.green]}>ARRIVED</Text>,
  ]
  const StatusElement = arrived ? ArrivedElement : EstimatedArrivalElement
  return (
    <View style={styles.container}>
      <View style={styles.part}>{StatusElement}</View>
      <Text style={[styles.text, styles.bold, styles.white, styles.part]}>{prettyTime}</Text>
    </View>
  )
}

EstimatedTimeDisplay.propTypes = {
  seconds: PropTypes.number,
  arrived: PropTypes.bool.isRequired,
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
  textLabel: {
    fontSize: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  green: {
    color: iconColor,
  },
  white: {
    color: 'white',
  },
  part: {
    paddingLeft: 4,
    paddingRight: 4,
  },
})

export default EstimatedTimeDisplay

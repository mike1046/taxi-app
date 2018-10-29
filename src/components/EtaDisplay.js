import React, { PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native'

const generateTimeObject = (sec) => {
  const minutes = Math.floor(sec / 60)
  const seconds = Math.floor(sec - (minutes * 60))
  return {
    minutes,
    seconds,
  }
}

const EtaDisplay = ({ seconds }) => {
  const time = generateTimeObject(seconds)
  const prettySeconds = time.seconds < 10 ? `0${time.seconds}` : time.seconds
  const { minutes } = time
  return (
    <View style={styles.container}>
      <Image source={require('../images/clock/clock.png')} style={styles.part} />
      <Text style={[styles.text, styles.bold, styles.white, styles.part]}>
        {`${minutes}:${prettySeconds}`}
      </Text>
    </View>
  )
}

EtaDisplay.propTypes = {
  seconds: PropTypes.number,
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
  bold: {
    fontWeight: 'bold',
  },
  part: {
    paddingLeft: 4,
    paddingRight: 4,
  },
})

export default EtaDisplay

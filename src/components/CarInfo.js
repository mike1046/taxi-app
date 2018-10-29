import React, {
  View,
  StyleSheet,
  Text,
  PropTypes,
} from 'react'
import { primaryColor } from '../styles'

const CarInfo = ({
  carType,
  seconds,
  cost,
}) => {
  const mins = Math.floor(seconds / 60) || 0
  const secs = seconds - (mins * 60)
  const secString = secs > 9 ? secs : `0${secs}`
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Car Type : ${carType}`}</Text>
      <Text style={styles.text}>{`Time : ${mins}:${secString}`}</Text>
      <Text style={styles.text}>{`Cost : ${cost}.00`}</Text>
    </View>
  )
}

CarInfo.propTypes = {
  carType: PropTypes.string.isRequired,
  seconds: PropTypes.number,
  cost: PropTypes.number.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    color: 'white',
  },
})

export default CarInfo

import React, { PropTypes } from 'react'
import {
  Text,
  View,
} from 'react-native'

import {
  accentColor,
  darkLineColor,
} from '../styles'

const styles = {
  row: {
    paddingTop: 6,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: darkLineColor,
  },
  text: {
    color: accentColor,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    fontSize: 18,
  },
  location: {
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    fontSize: 14,
  },
}

const Row = ({ data }) => {
  if (data.airport_name) {
    const parts = data.airport_name.split(',')
    const main = parts[0].trim()
    const location = `${parts[1].trim()}, ${parts[2]}`

    return (
      <View style={styles.row}>
        <Text style={styles.text}>{main}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
    )
  }
  return (
    <View style={styles.row}>
      <Text style={styles.text}>{data.airline_name}</Text>
    </View>
  )
}

Row.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Row

import React, { PropTypes } from 'react'
import {
  View,
  Text,
} from 'react-native'
import {
  primaryTransparentColor,
  accentColor,
} from '../styles'

const RewardsProgressBar = ({ total, currentPoints, currentPercentage }) =>
  <View style={styles.horizontal}>
    <View style={styles.labelContainer}>
      <Text style={styles.textLabel}>0</Text>
    </View>
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBarInner, { flex: currentPercentage }]} >
        <Text>{currentPoints}</Text>
      </View>
      <View style={[styles.progressBarSpacer, { flex: 100 - currentPercentage }]} />
    </View>
    <View style={styles.labelContainer}>
      <Text style={styles.textLabel}>{total}</Text>
    </View>
  </View>

RewardsProgressBar.propTypes = {
  total: PropTypes.number.isRequired,
  currentPoints: PropTypes.number.isRequired,
  currentPercentage: PropTypes.number.isRequired,
}

const height = 30

const styles = {
  horizontal: {
    flexDirection: 'row',
    margin: 5,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  progressBarContainer: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  progressBarInner: {
    height,
    backgroundColor: accentColor,
    flexDirection: 'row',
    paddingRight: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  progressBarSpacer: {
    height,
    backgroundColor: primaryTransparentColor,
  },
  labelContainer: {
    height,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  textLabel: {
    color: 'white',
  },
}

export default RewardsProgressBar

/* eslint no-unneeded-ternary:0 */
import React, { PropTypes } from 'react'
import moment from 'moment'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { accentColor } from '../styles'

const Coupon = ({
  coupons_condition,
  coupons_expires,
  effective_date,
  coupons_name,
  coupons_value,
  onPress,
}) => {
  const expires =
    moment().to(coupons_expires) === 'Invalid date'
    ? 'none'
    : moment().to(coupons_expires)
  let effective = moment(effective_date)
  if (!effective.isValid()) {
    effective = 'now'
  } else {
    effective = moment().isAfter(effective) ? 'now' : moment().to(effective)
  }
  const pressHandler = onPress ? onPress : () => {}
  return (
    <TouchableOpacity
      disabled={!onPress}
      style={styles.container}
      onPress={pressHandler}>
      <View style={styles.header}>
        <Text style={styles.nameStyle}>{coupons_name}</Text>
        <Text style={styles.valueStyle}>${coupons_value}</Text>
      </View>
      <Text style={styles.textStyle}>Condition: {coupons_condition}</Text>
      <Text style={styles.textStyle}>Effective Date: {effective}</Text>
      <Text style={styles.textStyle}>Expiration Date: {expires}</Text>
    </TouchableOpacity>
  )
}

Coupon.propTypes = {
  coupons_condition: PropTypes.string.isRequired,
  coupons_expires: PropTypes.string.isRequired,
  effective_date: PropTypes.string.isRequired,
  coupons_name: PropTypes.string.isRequired,
  coupons_value: PropTypes.number.isRequired,
  onPress: PropTypes.func,
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  container: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: accentColor,
  },
  nameStyle: {
    color: accentColor,
    fontSize: 18,
  },
  valueStyle: {
    color: accentColor,
    fontSize: 18,
  },
  textStyle: {
    color: 'white',
  },
})

export default Coupon


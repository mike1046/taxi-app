import React, { PropTypes } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native'
import {
  generalFontSize,
  accentColor,
  primaryTransparentColor,
} from '../styles'
import CarImage from './CarImage'

const CarDisplay = ({
  type,
  luggage,
  people,
  isPremium,
  display,
}) =>
  <View style={styles.container}>
    <CarImage
      isPremium={isPremium}
      type={type}
      style={{ width: 150, height: 100 }}
      resizeMode={'contain'} />
    <Text style={[styles.text, styles.emphasize]} >
      {display}
    </Text>
    <View style={styles.details}>
      <Image source={require('../images/select-car-passenger/select-car-passenger.png')} />
      <Text style={[styles.text, styles.detailItem]}>
        :{`${people}`}
      </Text>
      <Image source={require('../images/select-car-luggage/select-car-luggage.png')} />
      <Text style={[styles.text, styles.detailItem]}>
        :{`${luggage}`}
      </Text>
    </View>
  </View>

CarDisplay.propTypes = {
  type: PropTypes.string.isRequired,
  luggage: PropTypes.number.isRequired,
  display: PropTypes.string.isRequired,
  people: PropTypes.number.isRequired,
  isPremium: PropTypes.bool,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: primaryTransparentColor,
    alignItems: 'center',
    padding: 5,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  main: {
    borderBottomWidth: 1,
  },
  text: {
    fontSize: generalFontSize,
    color: 'white',
  },
  emphasize: {
    fontWeight: 'bold',
    color: accentColor,
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailItem: {
    padding: 3,
  },
})

export default CarDisplay

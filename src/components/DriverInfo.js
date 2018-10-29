import React, { PropTypes } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native'
import { iconColor } from '../styles'
import CarImage from './CarImage'
import { reverseCarLookup } from '../api/data'

function getDriverStatus(arrived, alerted) {
  if (!arrived) return 'is on the way'
  else if (alerted) return 'is waiting'
  return 'has arrived'
}

const DriverInfo = ({
  driver,
  imageURL,
  arrived,
  alerted,
}) => {
  const {
    driver_base_id,
    driver_car_class,
    driver_car_color,
    driver_car_make,
    driver_car_name,
    driver_name,
    driver_call_id,
  } = driver
  const carName = `${driver_car_color} ${driver_car_make} ${driver_car_name}`
  const licensePlate = driver_base_id || 'Not Provided'
  const driverStatus = getDriverStatus(arrived, alerted)
  const DefaultDriverImageElement = (
    <Image
      style={styles.driverImage}
      source={require('../images/driver/driver.png')} />
  )
  const DriverElement = imageURL
    ? (
      <Image
        style={styles.driverImage}
        source={{ uri: imageURL }} />
    )
    : DefaultDriverImageElement

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {DriverElement}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.line}>
          <Text style={[styles.text, styles.green]}>{`${driver_name}`}</Text>
          <Text style={[styles.text, styles.white, styles.italic]}>{driverStatus}</Text>
        </View>
        <View style={styles.line}>
          <Text style={[styles.text, styles.green]}>Driver ID:</Text>
          <Text style={[styles.text, styles.white, styles.italic]}>{driver_call_id}</Text>
        </View>
        <View style={styles.line}>
          <View style={styles.commContainer}>
            <CarImage
              style={styles.image}
              type={reverseCarLookup[driver_car_class.toUpperCase()]}
              resizeMode={'contain'} />
          </View>
          <Text style={styles.white}>{carName}</Text>
        </View>
        <View style={styles.line}>
          <View style={styles.commContainer} >
            <Image
              style={styles.image}
              source={require('../images/license/license.png')}
              resizeMode={'contain'} />
          </View>
          <Text style={styles.white}>{licensePlate}</Text>
        </View>
      </View>
    </View>
  )
}


DriverInfo.propTypes = {
  driver: PropTypes.shape({
    driver_base_id: PropTypes.string,
    driver_car_class: PropTypes.string,
    driver_car_color: PropTypes.string,
    driver_car_make: PropTypes.string,
    driver_car_name: PropTypes.string,
    driver_name: PropTypes.string,
  }).isRequired,
  imageURL: PropTypes.string,
  arrived: PropTypes.bool.isRequired,
  alerted: PropTypes.bool.isRequired,
}

DriverInfo.defaultProps = {
  arrived: false,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    padding: 2,
  },
  driverImage: {
    flex: 1,
    height: 50,
    resizeMode: 'contain',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  },
  text: {
    paddingLeft: 2,
    paddingRight: 2,
  },
  green: {
    color: iconColor,
  },
  white: {
    color: 'white',
  },
  italic: {
    fontStyle: 'italic',
  },
  image: {
    width: 30,
    height: 15,
  },
  commContainer: {
    marginTop: 3,
    marginBottom: 3,
    marginRight: 5,
  },
})

export default DriverInfo

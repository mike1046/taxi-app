import React, {
  Component,
  PropTypes,
} from 'react'
import {
  View,
  StyleSheet,
  Platform,
} from 'react-native'
import _ from 'lodash'
import MapboxContainer from './MapboxContainer'
import { getLocationFromCoordinates } from '../utils'

function createAnnotations(meeting, destination, driver = [], location, job_status) {
  const driverLast = (driver && driver.length) ? driver[driver.length - 1] : null
  const meetingProps = {
    id: 'pickup',
    coordinates: [meeting.lat, meeting.lng],
    type: 'point',
    title: 'Pickup',
    subtitle: meeting.address,
    annotationImage: {
      source: {
        uri: Platform.OS === 'ios'
        ? 'https://www.easterncarservice.com/images/icons/large/map-pickup_3x.png'
        : 'map_pickup', // android image assets are in /android/app/src/main/res/drawable
      },
      height: 25,
      width: 17,
    },
  }
  const destinationProps = {
    id: 'destination',
    coordinates: [destination.lat, destination.lng],
    type: 'point',
    title: 'Destination',
    subtitle: destination.address,
    annotationImage: {
      source: {
        uri: Platform.OS === 'ios'
          ? 'https://www.easterncarservice.com/images/icons/large/map-destination_3x.png'
          : 'map_destination',
      },
      height: 24,
      width: 25,
    },
  }
  const driverProps = {
    id: 'driver',
    coordinates: driverLast,
    type: 'point',
    title: 'Driver',
    annotationImage: {
      source: {
        uri: Platform.OS === 'ios'
          ? 'https://www.easterncarservice.com/images/icons/large/car-map-3x.png'
          : 'map_car',
      },
      height: 18,
      width: 25,
    },
  }

  const riderPath = {
    id: 'path',
    coordinates: driver,
    type: 'polyline',
    title: 'Path',
    strokeColor: '#00FB00',
    strokeWidth: 4,
    strokeAlpha: 0.5,
  }

  const annotations = []

  if (!_.isEmpty(meeting)) annotations.push(meetingProps)
  if (!_.isEmpty(destination)) annotations.push(destinationProps)
  if (driverLast) {
    if (!location.available || job_status !== 3) {
      /* explanation:
        job_status == 3 assumes a person is in the vehicle

        if location is available, a little blue marker
        appears on the map so we dont need to show
        the car icon.

        else show the car icon instead
      */
      annotations.push(driverProps)
    }
  }
  if (driver.length > 1 && job_status == 3) {
    annotations.push(riderPath)
  }
  return annotations
}

// decides where to put the center of the map in regards to job status
function pickCenter(job_status = 0, driver, meeting, destination, location) {
  const driverLast = driver.length ? getLocationFromCoordinates(driver) : meeting

  // if for whatever reason we want to center on the driver, and there is no driver,
  // center on the meeting instead
  const maps = {
    0: meeting,
    1: driverLast,
    2: meeting,
    3: location.available ? location : driverLast,
    4: destination,
    5: meeting,
    6: meeting,
    7: meeting,
    8: meeting,
    9: meeting,
    10: meeting,
    11: driverLast,
    12: meeting,
    13: meeting,
    14: meeting,
  }
  return maps[job_status]
}

class DriverMap extends Component {
  constructor(props) {
    super(props)
    const {
      meeting,
      destination,
      driver,
      ride,
      user = {},
    } = this.props
    const { job_status } = ride
    const { location } = user
    this.state = {
      annotations: createAnnotations(meeting, destination, driver, location, job_status),
      center: pickCenter(job_status, driver, meeting, destination, location),
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      meeting,
      destination,
      driver,
      ride,
      user = {},
    } = nextProps
    const { job_status } = ride
    const { location } = user
    this.setState({
      annotations: createAnnotations(meeting, destination, driver, location, job_status),
      center: pickCenter(job_status, driver, meeting, destination, location),
    })
  }

  render() {
    const {
      annotations,
      center,
    } = this.state
    const {
      user: { location },
      isScheduledPickup,
    } = this.props
    if (isScheduledPickup) return null
    const MapboxContainerElement = (
      <MapboxContainer
        annotations={annotations}
        center={center}
        userLocation={location} />
    )
    const MapContainer = _.isEmpty(annotations) ?
      null
      : MapboxContainerElement
    return (
      <View style={styles.container}>
        {MapContainer}
      </View>
    )
  }
}

DriverMap.propTypes = {
  destination: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
    address: PropTypes.string,
  }),
  meeting: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
    address: PropTypes.string,
  }),
  driver: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number),
  ).isRequired,
  ride: PropTypes.object,
  user: PropTypes.object,
  isScheduledPickup: PropTypes.bool,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default DriverMap

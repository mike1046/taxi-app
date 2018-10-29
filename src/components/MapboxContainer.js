/* eslint import/no-unresolved:0 */
import React, {
  Component,
  PropTypes,
} from 'react'
import { StyleSheet } from 'react-native'
import Mapbox, { MapView } from 'react-native-mapbox-gl'
import { MAPBOX as API_KEY } from '../api/keys'

Mapbox.setAccessToken(API_KEY)

class MapboxContainer extends Component {
  static propTypes = {
    annotations: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.number.isRequired,
            PropTypes.arrayOf(PropTypes.number).isRequired,
          ]),
        ).isRequired,
        type: PropTypes.oneOf(['point', 'polyline', 'polygon']).isRequired,
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        annotationImage: PropTypes.shape({
          source: PropTypes.object.isRequired,
          height: PropTypes.number.isRequired,
          width: PropTypes.number.isRequired,
        }),
      }),
    ).isRequired,
    mapStyle: PropTypes.string,
    center: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    userLocation: PropTypes.object,
  }

  static defaultProps = {
    mapStyle: 'streets',
  }

  constructor(props) {
    super(props)
    this.state = {
      zoom: 15,
    }
  }

  componentDidUpdate() {
    const { center } = this.props
    if (this.mapRef) this.mapRef.setCenterCoordinate(center.lat, center.lng)
  }

  render() {
    const {
      mapStyle,
      annotations,
      center,
      userLocation,
    } = this.props
    const { zoom } = this.state
    const styleURL = Mapbox.mapStyles[mapStyle]
    const userTrackingMode = userLocation.available
      ? Mapbox.userTrackingMode.follow
      : Mapbox.userTrackingMode.none
    const formattedCenter = {
      latitude: center.lat,
      longitude: center.lng,
    }
    return (
      <MapView
        style={styles.map}
        direction={0}
        rotateEnabled
        scrollEnabled
        zoomEnabled
        showsUserLocation
        annotationsAreImmutable
        ref={(map) => { this.mapRef = map }}
        styleURL={styleURL}
        userTrackingMode={userTrackingMode}
        initialCenterCoordinate={formattedCenter}
        initialZoomLevel={zoom}
        annotations={annotations} />
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})

export default MapboxContainer

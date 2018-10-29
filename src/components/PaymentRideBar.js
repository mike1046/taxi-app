import React, {
  Component,
  PropTypes,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react'
import { navigateBack } from '../actions/navigation'
import { iconColor } from '../styles'

const formatAddress = address =>
  address.split(',')
    .slice(0, 2)
    .join(',')

class PaymentRideBar extends Component {
  goBack() {
    const {
      dispatch,
    } = this.props
    dispatch(navigateBack())
  }

  render() {
    const {
      destination,
      pickup,
    } = this.props
    const prettyDestination = formatAddress(destination)
    const prettyPickup = formatAddress(pickup)

    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={() => this.goBack()}>
            <Image style={styles.image} source={require('../images/cancel/cancel.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.row}>
              <Image style={styles.image}source={require('../images/map-pickup/map-pickup.png')} />
              <Text style={[styles.text, styles.green]}>PICK UP: </Text>
            </View>
            <Text style={[styles.text, styles.white]}>{`${prettyDestination}`}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.row}>
              <Image
                style={styles.image}
                source={require('../images/map-destination/map-destination.png')} />
              <Text style={[styles.text, styles.green]}>DROP OFF: </Text>
            </View>
            <Text style={[styles.text, styles.white]}>{`${prettyPickup}`}</Text>
          </View>
        </View>
      </View>
    )
  }
}

PaymentRideBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  destination: PropTypes.string.isRequired,
  pickup: PropTypes.string.isRequired,

}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  green: {
    color: iconColor,
  },
  white: {
    color: 'white',
  },
  image: {
    resizeMode: 'contain',
    height: 15,
  },
  text: {
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
})

export default PaymentRideBar

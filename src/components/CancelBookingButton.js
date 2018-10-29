import React, {
  Component,
  PropTypes,
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'
import { accentColor } from '../styles'

class CancelBookingButton extends Component {
  cancelBooking() {
    this.props.navigateTo('ConfirmCancellation')
  }
  render() {
    return (
      <TouchableOpacity onPress={() => this.cancelBooking()}>
        <View style={styles.container}>
          <Image source={require('../images/cancel/cancel.png')} style={styles.part} />
          <View style={[styles.part]}>
            <Text style={[styles.text, styles.bold, styles.yellow]}>
              CANCEL
            </Text>
            <Text style={[styles.text, styles.bold, styles.yellow]}>
              BOOKING
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

CancelBookingButton.propTypes = {
  navigateTo: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 5,
  },
  text: {
    fontSize: 10,
  },
  yellow: {
    color: accentColor,
  },
  bold: {
    fontWeight: 'bold',
  },
  part: {
    paddingLeft: 4,
    paddingRight: 4,
  },
})

export default CancelBookingButton

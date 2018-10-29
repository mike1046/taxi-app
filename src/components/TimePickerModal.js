import React, {
  Component,
  PropTypes,
} from 'react'
import {
  DatePickerIOS,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import moment from 'moment'
import {
  navbarBackground,
  buttonContainerStyleLarge,
  buttonTextStyle,
} from '../styles'

class TimePicker extends Component {
  constructor(props) {
    super(props)
    this.modalHide = props.modalHide.bind(this)
    this.handleDateChange = props.handleDateChange.bind(this)
    this.setPickupTime = this.setPickupTime.bind(this)
    this.submitPickupTime = this.submitPickupTime.bind(this)
    this.state = { pickupTime: props.date }
  }

  setPickupTime(pickupTime) {
    this.setState({ pickupTime })
  }

  submitPickupTime() {
    this.handleDateChange(this.state.pickupTime)
    this.modalHide()
  }

  render() {
    const currentMinutes = moment().minutes()
    const difference = 5 - (currentMinutes % 5)
    const additionalMinutesToAdd = difference === 5 ? 0 : difference

    return (
      <View style={styles.container}>
        <DatePickerIOS
          date={this.state.pickupTime}
          mode="datetime"
          minuteInterval={5}
          minimumDate={moment().add(30 + additionalMinutesToAdd, 'minutes').toDate()}
          onDateChange={this.setPickupTime} />
        <View
          style={styles.buttonFrame} >
          <TouchableOpacity
            style={buttonContainerStyleLarge}
            onPress={this.submitPickupTime}>
            <Text style={buttonTextStyle}>SELECT PICKUP TIME</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

TimePicker.propTypes = {
  modalHide: PropTypes.func,
  handleDateChange: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  buttonFrame: {
    backgroundColor: navbarBackground,
    paddingTop: 6,
    paddingBottom: 6,
  },
})


export default TimePicker

import React, {
  Component,
  PropTypes,
} from 'react'
import {
  Text,
  TouchableHighlight,
  StyleSheet,
  Platform,
  DatePickerAndroid,
  TimePickerAndroid,
} from 'react-native'
import moment from 'moment'
import { generalFontSize } from '../styles'

class TimePickerInput extends Component {
  static propTypes = {
    value: PropTypes.instanceOf(Date).isRequired,
    modalShow: PropTypes.func.isRequired,
    alertText: PropTypes.func.isRequired,
    handleDateChange: PropTypes.func.isRequired,
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  }

  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }
  handlePress() {
    const {
      modalShow,
      alertText,
      value,
      handleDateChange,
    } = this.props
    const component = 'TimePickerModal'
    const props = {
      date: value,
      handleDateChange,
    }
    if (Platform.OS === 'ios') {
      modalShow(component, props)
    } else {
      const datetime = moment(value)
      DatePickerAndroid.open({ date: datetime.toDate() })
        .then(({ action, year, month, day }) => {
          if (action === DatePickerAndroid.dismissedAction) return {}
          datetime.year(year)
          datetime.month(month)
          datetime.date(day)
          return TimePickerAndroid.open({ hour: datetime.hours(), minute: datetime.minutes() })
        })
        .then(({ action, hour, minute }) => {
          if (action === undefined || action === TimePickerAndroid.dismissedAction) return {}
          datetime.hour(hour)
          datetime.minute(minute)
          if (datetime.isBefore(moment().add(30, 'minutes'))) {
            alertText('Invalid Time', 'Please select a time at least 30 minutes from now')
          } else {
            handleDateChange(datetime.toDate())
          }
        })
    }
  }
  render() {
    const {
      value,
      style,
    } = this.props
    const time = moment(value).format('ddd, MMM D, h:mm a ')
    return (
      <TouchableHighlight
        style={style}
        onPress={this.handlePress} >
        <Text style={styles.input}>
          {time}
        </Text>
      </TouchableHighlight>
    )
  }
}


const styles = StyleSheet.create({
  input: {
    color: 'white',
    fontSize: generalFontSize,
    marginTop: 5,
  },
})

export default TimePickerInput

import React, {
  Component,
  PropTypes,
} from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import InputIconWrapper from '../components/InputIconWrapper'
import { navigateTo } from '../actions/navigation'
import { setPickupTime } from '../actions/pickup'
import {
  modalShow,
  alertText,
} from '../actions/modal'
import {
  buttonContainerStyleLarge,
  buttonTextStyle,
} from '../styles'

class SelectPickupTime extends Component {
  static propTypes = {
    setPickupTime: PropTypes.func.isRequired,
    pickup: PropTypes.object.isRequired,
    navigateTo: PropTypes.func.isRequired,
    modalShow: PropTypes.func.isRequired,
    alertText: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.continue = this.continue.bind(this)
    this.onChangePickupTime = this.onChangePickupTime.bind(this)
  }

  onChangePickupTime(pickupTime) {
    this.props.setPickupTime(pickupTime)
  }

  continue() {
    this.props.navigateTo('SelectPickup')
  }

  render() {
    const { pickup: { pickupTime }, modalShow, alertText } = this.props
    return (
      <View style={styles.content}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text style={styles.bigText}>What time do you need to be picked up?</Text>
        </View>
        <InputIconWrapper
          source="ccmonth"
          InputType="TimePickerInput"
          alertText={alertText}
          handleDateChange={this.onChangePickupTime}
          modalShow={modalShow}
          value={pickupTime} />
        <TouchableOpacity
          onPress={this.continue}
          style={buttonContainerStyleLarge}>
          <Text style={buttonTextStyle}>CONTINUE</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 100,
  },
  bigText: {
    color: 'white',
    fontSize: 24,
    margin: 10,
  },
})


function mapStateToProps({ pickup }) {
  return { pickup }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    navigateTo,
    setPickupTime,
    modalShow,
    alertText,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPickupTime)

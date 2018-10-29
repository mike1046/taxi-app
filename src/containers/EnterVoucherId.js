import React, {
  Component,
  PropTypes,
} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  placeholderText,
  buttonContainerStyleLarge,
  buttonTextStyle,
} from '../styles'
import InputIconWrapper from '../components/InputIconWrapper'
import { updateJobThunk } from '../actions/ride'

class EnterVoucherId extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    ride: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    destination: PropTypes.object.isRequired,
    updateJobThunk: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    let vouchers_id
    if (this.props.request.vouchers_id) vouchers_id = this.props.request.vouchers_id
    this.onChangeVouchersId = this.onChangeVouchersId.bind(this)
    this.submitVoucherId = this.submitVoucherId.bind(this)
    this.state = { vouchers_id }
  }

  onChangeVouchersId(vouchers_id) {
    this.setState({ vouchers_id })
  }

  submitVoucherId() {
    const {
      updateJobThunk,
      user: {
        email,
        password,
      },
      ride,
      request: { quote_id },
      destination,
    } = this.props
    const { job_no } = ride
    const vouchers_id = this.state.vouchers_id
    const parameters = {
      vouchers_id,
      quote_id,
    }
    const validKeys = [
      'distance',
      'driver_available',
      'driver_call_id',
      'driver_distance',
      'driver_eta',
      'driver_id',
      'driver_latlng',
      'expiration',
      'pricing',
      'quote_id',
      'travel_time',
    ]
    Object.keys(ride).forEach((key) => {
      if (!validKeys.indexOf(key)) delete ride.key
    })
    updateJobThunk(email, password, job_no, destination, ride, parameters)
  }

  render() {
    const { vouchers_id } = this.state
    return (
      <View style={styles.content}>
        <InputIconWrapper
          InputType="TextInput"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Voucher Id"
          placeholderTextColor={placeholderText}
          onChangeText={this.onChangeVouchersId}
          value={vouchers_id} />
        <TouchableOpacity
          style={buttonContainerStyleLarge}
          onPress={this.submitVoucherId}>
          <Text style={buttonTextStyle}>Submit Voucher Id</Text>
        </TouchableOpacity>
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
})

function mapStateToProps({ user, ride, request, destination }) {
  const props = { user, ride, request, destination }
  return props
}

function mapDispatchToProps(dispatch) {
  const actions = {
    updateJobThunk,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterVoucherId)


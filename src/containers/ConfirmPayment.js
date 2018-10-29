import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { isJobCompleted } from '../api/data'
import InputIconWrapper from '../components/InputIconWrapper'
import { formatCreditCard } from '../utils'
import { buttonContainerStyle, buttonTextStyle, iconColor, placeholderText, line } from '../styles'
import { chargeTokenThunk } from '../actions/payment'
import { navigateTo } from '../actions/navigation'

class ConfirmPayment extends Component {
  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    chargeTokenThunk: PropTypes.func.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      cc_last: PropTypes.number.isRequired,
    }),
    ride: PropTypes.shape({
      job_no: PropTypes.number.isRequired,
    }).isRequired,
    payment: PropTypes.shape({
      base: PropTypes.number.isRequired,
      tip: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      extras: PropTypes.number.isRequired,
      paid: PropTypes.number.isRequired,
      due: PropTypes.number.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)
    this.onChangeDue = this.onChangeDue.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.state = {
      due: props.payment.due.toFixed(2),
    }
  }

  onBlur() {
    let { due } = this.state
    due = parseFloat(due).toFixed(2)
    if (isNaN(due)) due = 0
    this.setState({ due })
  }

  onChangeDue(due) {
    this.setState({ due })
  }

  confirmPayment() {
    const {
      payment,
      user,
      ride,
      navigateTo,
      chargeTokenThunk,
    } = this.props
    const {
      email,
      password,
    } = user
    const {
      job_no,
      job_status,
    } = ride
    const { tip } = payment
    const { due } = this.state

    // set up an onSuccess function to be triggered once payment is successfully made
    let onSuccess
    if (isJobCompleted(job_status)) {
      onSuccess = () => navigateTo('BookNow')
    } else onSuccess = () => navigateTo('DriverOnTheWay')
    chargeTokenThunk(email, password, job_no, due, tip, onSuccess)
  }

  render() {
    const { user } = this.props
    const { due } = this.state
    const { cc_last } = user
    const prettyCC = formatCreditCard(cc_last)

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={line}>
          <Text style={[styles.textLabel, styles.green, styles.bold]}>TOTAL AMOUNT TO PAY</Text>
        </View>
        <InputIconWrapper
          source="tip"
          InputType="TextInput"
          onChangeText={this.onChangeDue}
          onBlur={this.onBlur}
          placeholder={'Amount to pay'}
          keyboardType={'decimal-pad'}
          placeholderTextColor={placeholderText}
          value={due} />
        <View style={line}>
          <Text style={[styles.textLabel, styles.green, styles.bold]}>CREDIT CARD</Text>
          <Text style={[styles.text, styles.white, styles.bold]}>{`${prettyCC}`}</Text>
        </View>
        <TouchableOpacity style={buttonContainerStyle} onPress={() => this.confirmPayment()}>
          <Text style={buttonTextStyle}>PAY NOW</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: iconColor,
    paddingTop: 10,
  },
  text: {
    fontSize: 25,
  },
  textLabel: {
    fontSize: 15,
  },
  green: {
    color: iconColor,
  },
  white: {
    color: 'white',
  },
  bold: {
    fontWeight: 'bold',
  },
})

function mapStateToProps({ user, destination, meeting, ride, payment }) {
  const props = { user, destination, meeting, ride, payment }
  return props
}

function mapDispatchToProps(dispatch) {
  const actions = {
    navigateTo,
    chargeTokenThunk,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPayment)

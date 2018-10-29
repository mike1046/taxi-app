import React, {
  Component,
  PropTypes,
} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { calculatePayment } from '../api/data'
import {
  formatDollars,
  formatCreditCard,
} from '../utils'
import InputIconWrapper from '../components/InputIconWrapper'
import {
  buttonContainerStyleLarge,
  buttonTextStyle,
  iconColor,
  line,
} from '../styles'
import {
  setPayment,
  setTip,
} from '../actions/payment'
import { navigateTo } from '../actions/navigation'
import { getProfileThunk } from '../actions/user'

class Payment extends Component {
  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    setPayment: PropTypes.func.isRequired,
    setTip: PropTypes.func.isRequired,
    getProfileThunk: PropTypes.func.isRequired,
    ride: PropTypes.shape({
      job_no: PropTypes.number.isRequired,
    }).isRequired,
    api: PropTypes.shape({
      black_car_surcharge: PropTypes.number.isRequired,
      tax_rate: PropTypes.number.isRequired,
    }).isRequired,
    payment: PropTypes.shape({
      base: PropTypes.number.isRequired,
      tip: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      extras: PropTypes.number.isRequired,
      paid: PropTypes.number.isRequired,
      due: PropTypes.number.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      cc_last: PropTypes.number,
    }).isRequired,
  }

  constructor(props) {
    super(props)
    const { payment } = this.props
    const {
      base,
      extras,
      tip = 0,
      amount,
      paid,
      due,
    } = payment
    this.onChangeTip = this.onChangeTip.bind(this)
    this.goConfirmPayment = this.goConfirmPayment.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.state = {
      base,
      extras,
      tip: parseFloat(tip).toFixed(2),
      amount,
      paid,
      due,
    }
  }

  componentWillMount() {
    // fetch the fresh credit card information
    const {
      getProfileThunk,
      user: {
        email,
        password,
        location,
      },
    } = this.props
    getProfileThunk(email, password, location, 'Payment')
  }

  onChangeTip(tip) {
    let tipNum = parseFloat(tip)
    if (tipNum === undefined || tipNum === null || tipNum === '' || isNaN(tipNum)) tipNum = 0
    const {
      base,
      extras,
      paid,
    } = this.state
    const {
      api,
      ride,
    } = this.props
    const {
      black_car_surcharge,
      tax_rate,
    } = api
    const { service_type } = ride
    const amount = calculatePayment(
      service_type,
      base,
      extras,
      tipNum,
      tax_rate,
      black_car_surcharge,
    )
    const due = amount - paid
    // after the new amount is calculate it, set it to state
    this.setState({
      amount,
      tip,
      due,
    })
  }

  onBlur() {
    const { tip } = this.state
    let parsedTip = parseFloat(tip)
    if (isNaN(parsedTip)) parsedTip = 0
    this.setState({ tip: parsedTip })
  }

  goConfirmPayment() {
    const payment = Object.assign({}, this.state)
    payment.tip = parseFloat(payment.tip)
    this.props.setPayment(payment)
    this.props.setTip(payment.tip)
    this.props.navigateTo('ConfirmPayment')
  }

  render() {
    const {
      user,
      api,
      ride,
    } = this.props
    const { service_type } = ride
    const { cc_last } = user
    const {
      base,
      extras,
      tip,
      amount,
      due,
      paid,
    } = this.state
    const { black_car_surcharge } = api
    const prettyBase = formatDollars(base)
    const prettyExtras = formatDollars(extras)
    const prettyAmount = formatDollars(amount)
    const prettyDue = formatDollars(due)
    const prettyAmountPaid = formatDollars(paid)
    const prettyCC = formatCreditCard(cc_last)
    let prettySurcharge
    const tipString = typeof tip === 'number' ? tip.toFixed(2) : tip.toString()

    if (black_car_surcharge !== 0) {
      prettySurcharge = `${black_car_surcharge * 100}%`
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={line}>
          <Text style={[styles.green, styles.textLabel, styles.bold]}>BASE FARE</Text>
          <Text style={[styles.text, styles.white, styles.bold]}>{`$${prettyBase}`}</Text>
        </View>
        <View style={line}>
          <Text style={[styles.green, styles.textLabel, styles.bold]}>EXTRAS</Text>
          <Text style={[styles.text, styles.white, styles.bold]}>{`$${prettyExtras}`}</Text>
        </View>
        <View style={line}>
          <Text style={[styles.green, styles.textLabel, styles.bold]}>TIP</Text>
        </View>
        <InputIconWrapper
          source="tip"
          InputType="TextInput"
          onChangeText={this.onChangeTip}
          placeholder={'Tip'}
          keyboardType={'decimal-pad'}
          onBlur={this.onBlur}
          value={tipString} />
        <View style={line}>
          <Text style={[styles.green, styles.textLabel, styles.bold]}>AMOUNT ALREADY PAID</Text>
          <Text style={[styles.text, styles.white, styles.bold]}>{`$${prettyAmountPaid}`}</Text>
        </View>
        <View style={line}>
          {
            service_type.toLowerCase() !== 'economy'
            ? <View style={styles.part}>
              <Text style={[styles.textLabel, styles.green, styles.bold]}>BLACK CAR SURCHARGE</Text>
              <Text style={[styles.text, styles.white, styles.bold]}>{`${prettySurcharge}`}</Text>
            </View>
            : null
          }
          <View style={styles.part}>
            <Text style={[styles.textLabel, styles.green, styles.bold]}>TOTAL FARE</Text>
            <Text style={[styles.text, styles.white, styles.bold]}>{`$${prettyAmount}`}</Text>
          </View>
          <View style={styles.part}>
            <Text style={[styles.textLabel, styles.green, styles.bold]}>TOTAL DUE</Text>
            <Text style={[styles.text, styles.white, styles.bold]}>{`$${prettyDue}`}</Text>
          </View>
        </View>
        <View style={line}>
          <Text style={[styles.green, styles.textLabel, styles.bold]}>CREDIT CARD</Text>
          <Text style={[styles.text, styles.white, styles.bold]}>{`${prettyCC}`}</Text>
        </View>
        <TouchableOpacity
          style={buttonContainerStyleLarge}
          onPress={this.goConfirmPayment}>
          <Text style={buttonTextStyle}>CONTINUE TO PAYMENT</Text>
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
  },
  text: {
    fontSize: 25,
  },
  textLabel: {
    fontSize: 15,
  },
  part: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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

function mapStateToProps({ user, destination, meeting, ride, api, payment }) {
  const props = { user, destination, meeting, ride, api, payment }
  return props
}

function mapDispatchToProps(dispatch) {
  const actions = {
    navigateTo,
    setPayment,
    getProfileThunk,
    setTip,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)

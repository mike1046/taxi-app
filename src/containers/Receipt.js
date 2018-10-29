import React, {
  Component,
  PropTypes,
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import moment from 'moment'
import ToggleElementsMenu from '../components/ToggleElementsMenu'
import {
  formatDollars,
  formatPricingLabel,
} from '../utils'
import { cancelableJobStatuses } from '../api/data'
import {
  primaryColor,
  navbarBackground,
  iconColor,
  androidMarginFix,
  buttonContainerStyleLarge,
  buttonTextStyle,
  line,
} from '../styles'
import { navigateTo } from '../actions/navigation'

class Receipt extends Component {
  constructor(props) {
    super(props)
    this.cancelRide = this.cancelRide.bind(this)
  }

  cancelRide() {
    const { navigateTo, receipt: { job_no } } = this.props
    navigateTo('ConfirmCancellation', { job_no })
  }

  render() {
    const { receipt } = this.props
    return (
      <ScrollView contentContainerStyle={[styles.container, androidMarginFix]}>
        <View>
          <View style={line}>
            <Text style={[styles.green, styles.textLabel, styles.bold]}>Pricing Details</Text>
          </View>
          {
            Object.keys(receipt.pricing).map((key) => {
              if (receipt.pricing[key] > 0) {
                return (
                  <View
                    style={[line, styles.spread]}
                    key={key}>
                    <Text style={[styles.text, styles.white, styles.bold]}>
                      {formatPricingLabel(key)}
                    </Text>
                    <Text style={[styles.text, styles.white, styles.bold]}>
                      ${formatDollars(receipt.pricing[key])}
                    </Text>
                  </View>
                )
              }
              return null
            })
          }
        </View>
        <View style={styles.information}>
          <View style={line}>
            <Text style={[styles.green, styles.textLabel, styles.bold]}>Payment Details</Text>
          </View>
          <View style={[line, styles.spread]}>
            <Text style={[styles.text, styles.white, styles.bold]}>Total Amount Paid</Text>
            <Text style={[styles.text, styles.white, styles.bold]}>
              ${formatDollars(receipt.payment.amount_paid)}
            </Text>
          </View>
          <ToggleElementsMenu
            text="Transactions"
            textStyle={[styles.text, styles.white]}>
            {
              Object.keys(receipt.payment.transactions).map((key) => {
                if (typeof receipt.payment.transactions[key] === 'object') {
                  return (
                    <View key={key} style={[line, styles.spread]}>
                      <Text style={[styles.text, styles.white, styles.bold]}>
                        {receipt.payment.transactions[key].type}
                      </Text>
                      <Text style={[styles.text, styles.white, styles.bold]}>
                        ${formatDollars(receipt.payment.transactions[key].amount)}
                      </Text>
                    </View>
                  )
                }
                return null
              })
            }
          </ToggleElementsMenu>
        </View>
        <View style={styles.information}>
          <View style={line}>
            <Text style={[styles.green, styles.textLabel, styles.bold]}>Job Number</Text>
            <Text style={[styles.text, styles.white, styles.bold]}>{receipt.job_no}</Text>
          </View>
          <View style={line}>
            <Text style={[styles.green, styles.textLabel, styles.bold]}>Pickup Address</Text>
            <Text style={[styles.text, styles.white, styles.bold]}>{receipt.pickup.address}</Text>
          </View>
          <View style={line}>
            <Text style={[styles.green, styles.textLabel, styles.bold]}>Destination Address</Text>
            <Text style={[styles.text, styles.white, styles.bold]}>
              {receipt.destination.address}
            </Text>
          </View>
          <View style={line}>
            <Text style={[styles.green, styles.textLabel, styles.bold]}>Pickup Time</Text>
            <Text style={[styles.text, styles.white, styles.bold]}>
              {moment(receipt.pick_up_time).format('MMMM Do YYYY, h:mm a')}
            </Text>
          </View>
        </View>
        {
          cancelableJobStatuses[receipt.job_status]
            ? <TouchableOpacity
              onPress={this.cancelRide}
              style={buttonContainerStyleLarge}>
              <Text style={buttonTextStyle}>CANCEL TRIP</Text>
            </TouchableOpacity>
            : null
        }
      </ScrollView>
    )
  }
}

Receipt.propTypes = {
  receipt: PropTypes.object.isRequired,
  navigateTo: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 22,
    backgroundColor: navbarBackground,
  },
  information: {
    borderTopWidth: 1,
    borderTopColor: iconColor,
  },
  image: {
    height: 25,
    resizeMode: 'contain',
  },
  spread: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
  },
  textLabel: {
    fontSize: 15,
  },
  right: {
    alignSelf: 'flex-end',
  },
  green: {
    color: iconColor,
  },
  white: {
    color: 'white',
  },
  buttonText: {
    color: primaryColor,
    fontSize: 19,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
})

function mapStateToProps({ receipt }) {
  return { receipt }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    navigateTo,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipt)

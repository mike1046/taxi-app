import React, {
  Component,
  PropTypes,
} from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getReceiptThunk } from '../actions/receipt'
import { navigateTo } from '../actions/navigation'
import {
  buttonContainerStyleLarge,
  buttonTextStyle,
  primaryColor,
  accentColor,
} from '../styles'

class ThankYou extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    getReceiptThunk: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired,
    job_no: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    message: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.goViewReceipt = this.goViewReceipt.bind(this)
    this.goRequestAnother = this.goRequestAnother.bind(this)
  }

  goRequestAnother() {
    this.props.navigateTo('BookNow')
  }

  goViewReceipt() {
    const {
      user: {
        email,
        password,
        location,
      },
      job_no,
      getReceiptThunk,
    } = this.props
    getReceiptThunk(email, password, job_no, location)
  }

  render() {
    const { voucher_account } = this.props.user
    const { message } = this.props
    return (
      <View style={styles.content}>
        <View style={{ flex: 1 }} />
        <View style={styles.textWrapper}>
          <Text style={styles.thanks}>THANK YOU</Text>
          <Text style={styles.thanks}>FOR RIDING</Text>
          <Text style={styles.thanks}>WITH EASTERN!</Text>
          {
            message
              ? <Text style={styles.message}>{message}</Text>
              : null
          }
        </View>
        <View style={styles.buttonsContainer}>
          {
            voucher_account
              ? null
              : <TouchableOpacity
                style={buttonContainerStyleLarge}
                onPress={this.goViewReceipt}>
                <Text style={buttonTextStyle}>VIEW RECEIPT</Text>
              </TouchableOpacity>
          }
          <TouchableOpacity
            style={buttonContainerStyleLarge}
            onPress={this.goRequestAnother}>
            <Text style={buttonTextStyle}>DONE</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 100,
    backgroundColor: 'transparent',
  },
  thanks: {
    color: accentColor,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
  },
  textWrapper: {
    marginBottom: 14,
    flex: 1,
  },
  button: {
    backgroundColor: accentColor,
    color: primaryColor,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 3,
    marginBottom: 3,
    paddingTop: 10,
    paddingBottom: 10,
  },
  message: {
    fontSize: 17,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    color: accentColor,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
})

function mapStateToProps({ user }) {
  const props = { user }
  return props
}

function mapDispatchToProps(dispatch) {
  const actions = {
    getReceiptThunk,
    navigateTo,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou)

import React, {
  Component,
  PropTypes,
} from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  buttonContainerStyleLarge,
  buttonTextStyle,
  placeholderText,
  accentColor,
  generalFontSize,
} from '../styles'
import InputIconWrapper from '../components/InputIconWrapper'
import {
  codeVerifyThunk,
  codeResendThunk,
} from '../actions/user'
/*
 * NOTE: User is coming from navigation viewProps, not the redux store
*/
class VerifyAccount extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    codeVerifyThunk: PropTypes.func.isRequired,
    codeResendThunk: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.verifyAccount = this.verifyAccount.bind(this)
    this.onChangeCode = this.onChangeCode.bind(this)
    this.resendCode = this.resendCode.bind(this)
    this.state = {
      code: '',
      disableSend: true,
    }
  }

  onChangeCode(code) {
    this.setState({ code })
    if (code.length && this.state.disableSend === true) {
      this.setState({ disableSend: false })
    } else if (!code.length) {
      this.setState({ disableSend: true })
    }
  }

  verifyAccount() {
    const {
      user: {
        email,
        password,
      },
      codeVerifyThunk,
    } = this.props
    const { code } = this.state
    codeVerifyThunk({
      password,
      email,
      code,
    })
  }

  resendCode() {
    this.props.codeResendThunk(this.props.user)
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <KeyboardAvoidingView>
          <Text style={styles.bigText}>
            Before using this app, you must first verify your account.
          </Text>
          <InputIconWrapper
            InputType="TextInput"
            keyboardType="numeric"
            onChangeText={this.onChangeCode}
            placeholder="Enter code"
            placeholderTextColor={placeholderText} />
          {
            !this.state.disableSend
              ? <TouchableOpacity
                style={buttonContainerStyleLarge}
                onPress={this.verifyAccount}>
                <Text style={buttonTextStyle}>VERIFY WITH CODE</Text>
              </TouchableOpacity>
            : <TouchableOpacity
              style={buttonContainerStyleLarge}>
              <Text style={[buttonTextStyle, styles.disabled]}>VERIFY WITH CODE</Text>
            </TouchableOpacity>
          }
          <TouchableOpacity
            style={buttonContainerStyleLarge}
            onPress={this.resendCode}>
            <Text style={buttonTextStyle}>SEND NEW CODE</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
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
  bigText: {
    color: accentColor,
    fontSize: 21,
    margin: 10,
  },
  disabled: {
    opacity: 0.8,
  },
  textLink: {
    fontSize: generalFontSize,
    textDecorationLine: 'underline',
    color: accentColor,
    margin: 3,
  },
})

function mapStateToProps() {
  const props = { }
  return props
}

function mapDispatchToProps(dispatch) {
  const actions = {
    codeVerifyThunk,
    codeResendThunk,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccount)

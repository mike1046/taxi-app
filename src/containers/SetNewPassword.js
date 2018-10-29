import React, {
  Component,
  PropTypes,
} from 'react'
import {
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import InputIconWrapper from '../components/InputIconWrapper'
import {
  placeholderText,
  buttonContainerStyleLarge,
  buttonTextStyle,
  primaryColor,
  generalFontSize,
  primaryOutlineColor,
} from '../styles'
import {
  setNewPasswordThunk,
  passwordResetCodeThunk,
} from '../actions/user'

class SetNewPassword extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    setNewPasswordThunk: PropTypes.func.isRequired,
    passwordResetCodeThunk: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    const { email } = this.props.user
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangeCode = this.onChangeCode.bind(this)
    this.setNewPassword = this.setNewPassword.bind(this)
    this.resendPasswordCode = this.resendPasswordCode.bind(this)
    this.state = {
      password: '',
      code: '',
      email,
    }
  }

  onChangeEmail(email) {
    this.setState({ email })
  }

  onChangePassword(password) {
    this.setState({ password })
  }

  onChangeCode(code) {
    this.setState({ code })
  }

  setNewPassword() {
    this.props.setNewPasswordThunk(this.state)
  }

  resendPasswordCode() {
    this.props.passwordResetCodeThunk(this.state)
  }

  render() {
    const { email } = this.state
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <KeyboardAvoidingView>
          <InputIconWrapper
            InputType="TextInput"
            source="email"
            onChangeText={this.onChangeEmail}
            placeholder={'Email'}
            placeholderTextColor={placeholderText}
            value={email} />
          <InputIconWrapper
            InputType="TextInput"
            source="password"
            onChangeText={this.onChangePassword}
            placeholder={'New Password'}
            placeholderTextColor={placeholderText}
            secureTextEntry />
          <InputIconWrapper
            InputType="TextInput"
            onChangeText={this.onChangeCode}
            placeholder={'Code'}
            placeholderTextColor={placeholderText} />
          <TouchableOpacity
            style={buttonContainerStyleLarge}
            onPress={this.setNewPassword}>
            <Text style={buttonTextStyle}>CHANGE PASSWORD</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonContainerStyleLarge}
            onPress={this.resendPasswordCode}>
            <Text style={buttonTextStyle}>RESEND CODE</Text>
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
  },
  input: {
    color: 'white',
    backgroundColor: primaryColor,
    height: 45,
    borderWidth: 1,
    borderColor: primaryOutlineColor,
    padding: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: generalFontSize,
  },
})

function mapStateToProps({ user }) {
  const props = { user }
  return props
}

function mapDispatchToProps(dispatch) {
  const actions = {
    setNewPasswordThunk,
    passwordResetCodeThunk,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetNewPassword)

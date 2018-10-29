import React, {
  Component,
  PropTypes,
} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native'
import InputIconWrapper from '../components/InputIconWrapper'
import {
  placeholderText,
  buttonContainerStyleLarge,
  buttonTextStyle,
  accentColor,
  generalFontSize,
  androidMarginFix,
  darkAccentColor,
  primaryOutlineColor,
  textLink,
} from '../styles'
import { navigateTo } from '../actions/navigation'
import {
  loginThunk,
  toggleRememberMe,
} from '../actions/user'

class Login extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    loginThunk: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired,
    toggleRememberMe: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    const {
      email,
      password,
    } = this.props.user
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.forgotPassword = this.forgotPassword.bind(this)
    this.signup = this.signup.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.submitLogin = this.submitLogin.bind(this)
    this.state = {
      password,
      email,
    }
  }

  onChangeEmail(email) {
    this.setState({ email })
  }

  onChangePassword(password) {
    this.setState({ password })
  }

  submitLogin() {
    const { loginThunk } = this.props
    loginThunk(this.state)
  }

  forgotPassword() {
    const { navigateTo } = this.props
    navigateTo('ForgotPassword')
  }

  signup() {
    const { navigateTo } = this.props
    navigateTo('Signup')
  }

  render() {
    const {
      email,
      password,
    } = this.state
    const {
      user: { rememberMe },
      toggleRememberMe,
    } = this.props

    return (
      <ScrollView contentContainerStyle={[styles.content, androidMarginFix]}>
        <InputIconWrapper
          source="email"
          InputType="TextInput"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={this.onChangeEmail}
          placeholder={'Email'}
          placeholderTextColor={placeholderText}
          keyboardType="email-address"
          value={email} />
        <InputIconWrapper
          source="password"
          InputType="TextInput"
          onChangeText={this.onChangePassword}
          placeholder={'Password'}
          placeholderTextColor={placeholderText}
          secureTextEntry
          value={password} />
        <TouchableOpacity
          style={buttonContainerStyleLarge}
          onPress={this.submitLogin} >
          <Text style={buttonTextStyle}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rememberMeContainer}
          onPress={toggleRememberMe}>
          <Text style={styles.rememberMeText}>Remember Me</Text>
          <Switch
            thumbTintColor={accentColor}
            onTintColor={darkAccentColor}
            tintColor={primaryOutlineColor}
            value={rememberMe}
            onValueChange={toggleRememberMe} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.forgotPassword} >
          <Text style={textLink}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.signup} >
          <Text style={textLink}>Register new account</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    flex: 100,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rememberMeContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rememberMeText: {
    fontSize: generalFontSize,
    color: accentColor,
    margin: 3,
  },
})

function mapStateToProps({ user }) {
  return { user }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    navigateTo,
    loginThunk,
    toggleRememberMe,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

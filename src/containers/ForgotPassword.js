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
} from '../styles'
import InputIconWrapper from '../components/InputIconWrapper'
import { passwordResetCodeThunk } from '../actions/user'

class ForgotPassword extends Component {
  static propTypes = {
    passwordResetCodeThunk: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
    const { email } = this.props.user
    this.state = { email }
  }

  onChangeEmail(email) {
    this.setState({ email })
  }

  resetPassword() {
    this.props.passwordResetCodeThunk(this.state)
  }

  render() {
    const { email } = this.state
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <KeyboardAvoidingView>
          <InputIconWrapper
            source="email"
            InputType="TextInput"
            onChangeText={this.onChangeEmail}
            placeholder="Email"
            placeholderTextColor={placeholderText}
            value={email} />
          <TouchableOpacity
            style={buttonContainerStyleLarge}
            onPress={this.resetPassword}>
            <Text style={buttonTextStyle}>RESET PASSWORD</Text>
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
})

function mapStateToProps({ user }) {
  return { user }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    passwordResetCodeThunk,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)

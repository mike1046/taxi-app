import React, {
  Component,
  PropTypes,
} from 'react'
import { connect } from 'react-redux'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native'
import {
  isEmail,
  isFQDN,
  isMobilePhone,
  isNumeric,
} from 'validator'
import { bindActionCreators } from 'redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputIconWrapper from '../components/InputIconWrapper'
import FormErrorMessage from '../components/FormErrorMessage'
import PhoneInput from '../components/PhoneInput'
import { onChangeCountryCode } from '../utils'
import {
  placeholderText,
  buttonContainerStyleLarge,
  buttonTextStyle,
} from '../styles'
import { signupThunk } from '../actions/user'
import { modalShow } from '../actions/modal'

function checkPassword(length) {
  if (length < 6) {
    return 'Password must be greater than 6 characters'
  }
  if (length > 23) {
    return 'Password must not exceed 24 characters.'
  }
}

function createErrorObject(form) {
  const {
    email,
    password,
    fname,
    lname,
    phone,
    country_id,
  } = form
  return {
    email: isEmail(email) && isFQDN(email.slice(email.indexOf('@') + 1))
    ? null
    : 'Please enter a valid email',
    password: checkPassword(password.length),
    fname: fname ? null : 'Please provide a first name',
    lname: lname ? null : 'Please provide a last name',
    phone: isMobilePhone(phone, 'en-US') ? null : 'Please provide a valid phone number',
    country_id: isNumeric(country_id) ? null : 'Please provide a valid country code',
  }
}

function checkValid(errorObj) {
  return Object.keys(errorObj).every(key => !errorObj[key])
}

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      fname: '',
      lname: '',
      phone: '',
      country_id: '225',
      country_code: '+1',
      company: '',
      error: {},
    }
    this.onChangeCountryCode = onChangeCountryCode.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangeFirstName = this.onChangeFirstName.bind(this)
    this.onChangeLastName = this.onChangeLastName.bind(this)
    this.onChangePhone = this.onChangePhone.bind(this)
    this.onChangeCompany = this.onChangeCompany.bind(this)
    this.submit = this.submit.bind(this)
  }

  onChangeEmail(email) {
    this.setState({ email })
  }
  onChangePassword(password) {
    this.setState({ password })
  }
  onChangeFirstName(fname) {
    this.setState({ fname })
  }
  onChangeLastName(lname) {
    this.setState({ lname })
  }
  onChangePhone(phone) {
    this.setState({ phone })
  }
  onChangeCompany(company) {
    this.setState({ company })
  }

  submit() {
    const { signupThunk } = this.props
    const error = createErrorObject(this.state)
    const isValid = checkValid(error)

    // update error object
    this.setState({ error })

    const update = Object.assign({}, this.state)
    update.phone = parseInt(update.phone)
    update.country_id = parseInt(update.country_id)
      // only when valid do you send the requests
    if (isValid) signupThunk(update)
  }

  render() {
    const {
      email,
      password,
      fname,
      lname,
      country_code,
      phone,
      company,
      error,
    } = this.state

    function createFormErrorMessage(message) {
      return (
        <FormErrorMessage message={message} />
      )
    }

    return (
      <View style={styles.contentWrapper}>
        <KeyboardAwareScrollView>
          <View style={styles.content}>
            <InputIconWrapper
              source="email"
              InputType="TextInput"
              keyboardType={'email-address'}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={this.onChangeEmail}
              placeholder={'Email'}
              placeholderTextColor={placeholderText}
              applyInvalidStyle={!!error.email}
              value={email} />
            {error.email ? createFormErrorMessage(error.email) : null}
            <InputIconWrapper
              source="password"
              InputType="TextInput"
              onChangeText={this.onChangePassword}
              placeholder={'Password'}
              placeholderTextColor={placeholderText}
              secureTextEntry
              applyInvalidStyle={!!error.password}
              value={password} />
            {error.password ? createFormErrorMessage(error.password) : null}
            <InputIconWrapper
              InputType="TextInput"
              onChangeText={this.onChangeFirstName}
              autoCorrect={false}
              placeholder={'First Name'}
              placeholderTextColor={placeholderText}
              applyInvalidStyle={!!error.fname}
              value={fname} />
            {error.fname ? createFormErrorMessage(error.fname) : null}
            <InputIconWrapper
              InputType="TextInput"
              onChangeText={this.onChangeLastName}
              autoCorrect={false}
              placeholder={'Last Name'}
              placeholderTextColor={placeholderText}
              applyInvalidStyle={!!error.lname}
              value={lname} />
            {error.lname ? createFormErrorMessage(error.lname) : null}
            <PhoneInput
              modalShow={this.props.modalShow}
              onPressCountryCode={value => this.onChangeCountryCode(value)}
              countryCodeValue={country_code}
              onChangePhoneNum={this.onChangePhone}
              placeholder={'Phone'}
              applyInvalidStyle={!!error.phone}
              placeholderTextColor={placeholderText} />
            {error.country ? createFormErrorMessage(error.country) : null}
            {error.phone ? createFormErrorMessage(error.phone) : null}
            <InputIconWrapper
              InputType="TextInput"
              onChangeText={this.onChangeCompany}
              placeholder={'Company'}
              placeholderTextColor={placeholderText}
              value={company} />
            <TouchableOpacity
              style={buttonContainerStyleLarge}
              onPress={this.submit}>
              <Text style={buttonTextStyle}>REGISTER</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

Signup.propTypes = {
  signupThunk: PropTypes.func.isRequired,
  modalShow: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 100,
    flexDirection: 'column',
    justifyContent: 'center',
  },
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
    signupThunk,
    modalShow,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

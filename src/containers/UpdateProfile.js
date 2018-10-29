import React, {
  Component,
  PropTypes,
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TextOrInput from '../components/TextOrInput'
import InputIconWrapper from '../components/InputIconWrapper'
import TextOrGooglePlacesInput from '../components/TextOrGooglePlacesInput'
import {
  accentColor,
  primaryColor,
  darkLineColor,
  primaryOutlineColor,
  generalFontSize,
  navbarBackground,
  androidMarginFix,
  buttonTextStyle,
  buttonContainerStyle,
  placeholderText,
  darkAccentColor,
} from '../styles'
import { onChangeCountryCode } from '../utils'
import { tipOptions } from '../api/data'
import {
  saveAsync,
  loadAsync,
} from '../utils/asyncStorage'
import { updateAccountThunk } from '../actions/user'
import { navigateTo } from '../actions/navigation'
import { modalShow } from '../actions/modal'
import PhoneInput from '../components/PhoneInput'

class UpdateProfile extends Component {
  constructor(props) {
    super(props)
    const { user = {} } = this.props
    const {
      email,
      company,
      phone,
      country_code,
      country_id,
      password,
      name,
      cc_last,
      cc_token,
      cc_type,
      receive_email = false,
      receive_sms = false,
      default_pickup,
      tip_type,
      editSettings = false,
      editPreferences = false,
    } = user
    this.onChangeCountryCode = onChangeCountryCode.bind(this)
    this.onChangeCompany = this.onChangeCompany.bind(this)
    this.onChangePhone = this.onChangePhone.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangeReceiveEmail = this.onChangeReceiveEmail.bind(this)
    this.onChangeReceiveSms = this.onChangeReceiveSms.bind(this)
    this.onChangeDefaultPickup = this.onChangeDefaultPickup.bind(this)
    this.onChangeDefaultTip = this.onChangeDefaultTip.bind(this)
    this.submitUpdateAccount = this.submitUpdateAccount.bind(this)
    this.goEditCreditCard = this.goEditCreditCard.bind(this)
    this.toggleEditSettings = this.toggleEditSettings.bind(this)
    this.toggleEditPreferences = this.toggleEditPreferences.bind(this)
    this.onChangeOldPassword = this.onChangeOldPassword.bind(this)
    this.state = {
      oldPassword: password,
      email,
      company,
      phone,
      country_code,
      country_id,
      password,
      cc_last,
      cc_token,
      cc_type,
      name,
      receive_email,
      receive_sms,
      default_pickup,
      editSettings,
      editPreferences,
      tip_type: _.find(tipOptions, option => option.value === tip_type),
    }
  }

  componentDidMount() {
    const pickupKey = `${this.state.email}-default_pickup`
    loadAsync(pickupKey)
      .then((response) => {
        if (response[pickupKey]) {
          const default_pickup = response[pickupKey]
          this.setState({ default_pickup })
        }
      })
  }

  onChangeCompany(company) {
    this.setState({ company })
  }

  onChangePhone(phone) {
    this.setState({ phone })
  }

  onChangePassword(password) {
    this.setState({ password })
  }

  onChangeOldPassword(oldPassword) {
    this.setState({ oldPassword })
  }
  onChangeReceiveEmail(receive_email) {
    this.setState({ receive_email })
  }

  onChangeReceiveSms(receive_sms) {
    this.setState({ receive_sms })
  }

  onChangeDefaultPickup(default_pickup) {
    this.setState({ default_pickup })
  }

  onChangeDefaultTip(tip_type) {
    this.setState({ tip_type })
  }

  submitUpdateAccount() {
    const { updateAccountThunk } = this.props
    const {
      email,
      oldPassword,
      default_pickup = null,
    } = this.state
    const pickupToSave = { }
    pickupToSave[`${email}-default_pickup`] = default_pickup
    saveAsync(pickupToSave)
    const update = Object.assign({}, this.state)
    update.phone = parseInt(update.phone)
    update.country_id = parseInt(update.country_id)
    update.tip_type = update.tip = update.tip_type.value
    update.editSettings = false
    update.editPreferences = false
    if (update.tip === 0) update.tip = 'n'
    updateAccountThunk(email, oldPassword, update, this.onChangeOldPassword)
  }

  goEditCreditCard() {
    this.props.navigateTo('AddCard')
  }

  toggleEditSettings() {
    this.setState({ editSettings: !this.state.editSettings })
    if (this.state.editSettings) {
      this.submitUpdateAccount()
    }
  }

  toggleEditPreferences() {
    this.setState({ editPreferences: !this.state.editPreferences })
    if (this.state.editPreferences) {
      this.submitUpdateAccount()
    }
  }

  render() {
    const {
      company,
      password,
      receive_email,
      receive_sms,
      default_pickup,
      name,
      cc_last,
      cc_type,
      editSettings,
      editPreferences,
      cc_token,
    } = this.state
    let {
      country_code,
      phone,
      tip_type,
    } = this.state
    const { modalShow } = this.props
    tip_type = tip_type.label
    // don't think these conditions are ever true now
    if (tip_type === 'n%') tip_type = '0%'
    if (tip_type === 'l%') tip_type = 'Decide Later'
    phone = phone && phone.toString ? phone.toString() : phone
    country_code = typeof country_code === 'number' ? `+${country_code.toString()}` : country_code
    return (
      <View style={[styles.container, styles.outer, androidMarginFix]}>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <View style={[styles.section, styles.center]}>
              <Text style={[styles.sectionHeader, styles.name]}>{name}</Text>
              <Image
                style={{ height: 90, resizeMode: 'contain' }}
                source={require('../images/profile-picture/profile-picture.png')} />
            </View>
            <View style={styles.section}>
              <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeader}>Account Settings</Text>
                <TouchableOpacity onPress={this.toggleEditSettings}>
                  {
                    editSettings
                      ? <Text style={(styles.button, styles.editButton)}>SAVE</Text>
                      : <Text style={(styles.button, styles.editButton)}>EDIT</Text>
                  }
                </TouchableOpacity>
              </View>
              <TextOrInput
                styleText={[styles.text, styles.textPadding]}
                editMode={editSettings}
                placeholder="Company"
                value={company}>
                <InputIconWrapper
                  InputType="TextInput"
                  placeholder="Company"
                  value={company}
                  placeholderTextColor={placeholderText}
                  onChangeText={this.onChangeCompany} />
              </TextOrInput>
              <TextOrInput
                styleText={[styles.text, styles.textPadding]}
                placeholder="Phone"
                editMode={editSettings}
                value={`${country_code} ${phone}`}>
                <PhoneInput
                  modalShow={modalShow}
                  onPressCountryCode={this.onChangeCountryCode}
                  countryCodeValue={country_code}
                  onChangePhoneNum={this.onChangePhone}
                  placeholder="Phone"
                  value={phone}
                  placeholderTextColor={placeholderText} />
              </TextOrInput>
              <TextOrInput
                styleText={[styles.text, styles.textPadding]}
                placeholder={'Password'}
                secureTextEntry
                editMode={editSettings}
                value={password}>
                <InputIconWrapper
                  onChangeText={this.onChangePassword}
                  source="password"
                  secureTextEntry
                  value={password}
                  InputType="TextInput" />
              </TextOrInput>
            </View>
            {
              cc_token
                ? <View style={styles.section}>
                  <View style={styles.sectionHeaderContainer}>
                    <Text style={styles.sectionHeader}>Credit Card</Text>
                    <TouchableOpacity onPress={() => this.goEditCreditCard()}>
                      <Text style={(styles.button, styles.editButton)}>EDIT</Text>
                    </TouchableOpacity>
                  </View>
                  <Text

                    style={[styles.text, styles.textPadding]}>
                    {cc_type}: xxxx xxxx xxxx {cc_last}
                  </Text>
                </View>
                : null
            }
            <View style={styles.section}>
              <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeader}>Preferences</Text>
                <TouchableOpacity onPress={this.toggleEditPreferences}>
                  {
                  editPreferences
                    ? <Text style={(styles.button, styles.editButton)}>SAVE</Text>
                    : <Text style={(styles.button, styles.editButton)}>EDIT</Text>
                }
                </TouchableOpacity>
              </View>
              <TextOrGooglePlacesInput
                styleText={[styles.text, styles.textPadding, {marginBottom: 0}]}
                onChangeText={this.onChangeDefaultPickup}
                placeholder={'Default Pickup'}
                editMode={editPreferences}
                value={default_pickup}
                modalShow={modalShow} />
              {
                editPreferences
                  ? <TouchableOpacity
                    style={[buttonContainerStyle, { marginBottom: 10 }]}
                    onPress={() => this.setState({ default_pickup: null })}>
                    <Text style={buttonTextStyle}> Clear Default Pickup </Text>
                  </TouchableOpacity>
                  : null
              }
              <TextOrInput
                styleText={[styles.text, styles.textPadding]}
                placeholder="Default Tip"
                editMode={editPreferences}
                value={tip_type}>
                <InputIconWrapper
                  placeholder="Default Tip"
                  InputType="PickerInput"
                  inputTitle="DEFAULT TIP"
                  label={tip_type}
                  modalShow={modalShow}
                  options={tipOptions}
                  handleChange={this.onChangeDefaultTip}
                  source="tip" />
              </TextOrInput>
              {
                editPreferences
                  ? <TouchableOpacity
                    style={buttonContainerStyle}
                    onPress={() => this.setState({ tip_type: 'l' })}>
                    <Text style={buttonTextStyle}> Clear Default Tip </Text>
                  </TouchableOpacity>
                  : null
              }
              <View style={[styles.inline, styles.row]}>
                <Text style={styles.text}>Receive Text Messages</Text>
                <Switch
                  thumbTintColor={accentColor}
                  onTintColor={darkAccentColor}
                  tintColor={primaryOutlineColor}
                  onValueChange={this.onChangeReceiveSms}
                  value={receive_sms}
                  disabled={!editPreferences} />
              </View>
              <View style={[styles.inline, styles.row]}>
                <Text style={styles.text}>Receive Email</Text>
                <Switch
                  thumbTintColor={accentColor}
                  onTintColor={darkAccentColor}
                  tintColor={primaryOutlineColor}
                  onValueChange={this.onChangeReceiveEmail}
                  value={receive_email}
                  disabled={!editPreferences} />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

UpdateProfile.propTypes = {
  user: PropTypes.object.isRequired,
  updateAccountThunk: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  modalShow: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: navbarBackground,
  },
  outer: {
    justifyContent: 'space-between',
    flex: 100,
  },
  text: {
    fontSize: generalFontSize,
    color: 'white',
  },
  textPadding: {
    padding: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  row: {
    height: 45,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    color: 'white',
    backgroundColor: primaryColor,
    borderWidth: 1,
    borderColor: primaryOutlineColor,
  },
  section: {
    borderBottomWidth: 2,
    borderBottomColor: darkLineColor,
    paddingTop: 4,
    paddingBottom: 4,
  },
  center: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: accentColor,
  },
  name: {
    color: 'white',
    marginBottom: 2,
  },
  info: {
    fontSize: generalFontSize,
    color: 'white',
    flexDirection: 'column',
    padding: 14,
  },
  button: {
    backgroundColor: accentColor,
    fontSize: generalFontSize,
    color: primaryColor,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 3,
    marginBottom: 3,
    paddingTop: 10,
    paddingBottom: 10,
  },
  editButton: {
    backgroundColor: accentColor,
    color: primaryColor,
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    height: 25,
    fontSize: 14,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
  },
  creditCardNumber: {
    paddingTop: 11,
    paddingBottom: 21,
  },
})

function mapStateToProps({ user }) {
  return { user }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    navigateTo,
    updateAccountThunk,
    modalShow,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)

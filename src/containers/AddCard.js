
/* eslint react/jsx-no-bind:0 */
import React, {
  Component,
  PropTypes,
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  monthOptions,
  yearOptions,
  cardOptions,
  termsOfAgreementURL,
} from '../api/data'
import {
  buttonContainerStyleLarge,
  buttonTextStyle,
  placeholderText,
  accentColor,
  primaryColor,
  generalFontSize,
} from '../styles'
import InputIconWrapper from '../components/InputIconWrapper'
import { modalShow } from '../actions/modal'
import { addCardThunk } from '../actions/user'

function handleAgreementLink() {
  Linking.openURL(termsOfAgreementURL)
}

class AddCard extends Component {
  static propTypes = {
    addCardThunk: PropTypes.func.isRequired,
    modalShow: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      cc_type: cardOptions[0],
      cc_name: undefined,
      cc_number: undefined,
      cc_mo: monthOptions[0],
      cc_yr: yearOptions[0],
      cc_code: undefined,
      cc_zip: undefined,
      termsAgreement: ' ',
    }
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeCreditCardNumber = this.onChangeCreditCardNumber.bind(this)
    this.onChangeExpMonth = this.onChangeExpMonth.bind(this)
    this.onChangeExpYear = this.onChangeExpYear.bind(this)
    this.onChangeCVV = this.onChangeCVV.bind(this)
    this.onChangeType = this.onChangeType.bind(this)
    this.onChangeZip = this.onChangeZip.bind(this)
    this.onTermsAgreement = this.onTermsAgreement.bind(this)
    this.handleCard = this.handleCard.bind(this)
  }

  onChangeName(cc_name) {
    this.setState({ cc_name })
  }
  onChangeCreditCardNumber(cc_number) {
    this.setState({ cc_number })
  }
  onChangeExpMonth(cc_mo) {
    this.setState({ cc_mo })
  }
  onChangeExpYear(cc_yr) {
    this.setState({ cc_yr })
  }
  onChangeCVV(cc_code) {
    this.setState({ cc_code })
  }
  onChangeType(cc_type) {
    this.setState({ cc_type })
  }
  onChangeZip(cc_zip) {
    this.setState({ cc_zip })
  }

  onTermsAgreement() {
    if (this.state.termsAgreement === ' ') {
      this.setState({ termsAgreement: '✓' })
    } else {
      this.setState({ termsAgreement: ' ' })
    }
  }

  handleCard() {
    const { addCardThunk, user } = this.props
    const { email, password } = user
    const value = Object.assign({}, this.state)
    value.cc_type = value.cc_type.value
    value.cc_mo = value.cc_mo.value
    value.cc_yr = value.cc_yr.value
    delete value.termsAgreement
    if (this.state.termsAgreement !== ' ') {
      addCardThunk(email, password, value)
    }
  }

  render() {
    const { modalShow } = this.props
    const {
      cc_type,
      cc_mo,
      cc_yr,
    } = this.state
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View
            style={styles.content}>
            <InputIconWrapper
              source="cardname"
              InputType="TextInput"
              onChangeText={this.onChangeName}
              placeholder={'Name on Card'}
              placeholderTextColor={placeholderText} />
            <InputIconWrapper
              source="cardtype"
              InputType="PickerInput"
              inputTitle="CREDITCARD TYPE"
              handleChange={this.onChangeType}
              modalShow={modalShow}
              options={cardOptions}
              label={cc_type.label} />
            <InputIconWrapper
              source="ccnum"
              InputType="TextInput"
              keyboardType="number-pad"
              maxLength={16}
              onChangeText={this.onChangeCreditCardNumber}
              placeholder={'Credit Card Number'}
              placeholderTextColor={placeholderText} />
            <InputIconWrapper
              source="ccmonth"
              InputType="PickerInput"
              inputTitle="EXPIRATION MONTH"
              handleChange={this.onChangeExpMonth}
              modalShow={modalShow}
              options={monthOptions}
              label={cc_mo.label} />
            <InputIconWrapper
              source="ccyear"
              InputType="PickerInput"
              inputTitle="EXPIRATION YEAR"
              handleChange={this.onChangeExpYear}
              modalShow={modalShow}
              options={yearOptions}
              label={cc_yr.label} />
            <InputIconWrapper
              source="cvv"
              InputType="TextInput"
              maxLength={4}
              keyboardType="number-pad"
              onChangeText={this.onChangeCVV}
              placeholder={'CVV'}
              placeholderTextColor={placeholderText} />
            <InputIconWrapper
              source="zip"
              maxLength={5}
              InputType="TextInput"
              keyboardType="number-pad"
              onChangeText={this.onChangeZip}
              placeholder={'Zip Code'}
              placeholderTextColor={placeholderText} />
            <TouchableOpacity
              style={styles.agreementWrapper}
              onPress={this.onTermsAgreement}>
              <Text style={styles.checkBox}>{this.state.termsAgreement}</Text>
              <Text style={styles.agreementText}> I agree to the </Text>
              <Text
                style={styles.agreementLink}
                onPress={handleAgreementLink}>
                Terms of Service
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={buttonContainerStyleLarge}
              onPress={this.handleCard.bind(this)}>
              <Text style={buttonTextStyle}>SUBMIT CARD</Text>
            </TouchableOpacity>
            <View style={styles.skipCardContainer}>
              <Text style={styles.skipCard}>* Skip Card Submission</Text>
              <Text
                style={styles.skipCardDescription}>
                At the end of your trip, you may pay cash, but you must have a credit card on file.
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 100,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: generalFontSize,
  },
  agreementWrapper: {
    flexDirection: 'row',
  },
  checkBox: {
    fontSize: 30,
    fontWeight: '900',
    color: 'white',
    backgroundColor: primaryColor,
    width: 30,
    height: 30,
    margin: 10,
    marginLeft: 20,
  },
  agreementText: {
    fontSize: 20,
    color: 'white',
    marginTop: 12,
  },
  agreementLink: {
    fontSize: 20,
    color: accentColor,
    marginTop: 12,
  },
  skipCard: {
    fontStyle: 'italic',
    fontSize: 17,
    color: accentColor,
  },
  skipCardDescription: {
    fontStyle: 'italic',
    fontSize: 17,
    color: 'white',
  },
  skipCardContainer: {
    padding: 20,
  },
})

function mapStateToProps({ user }) {
  return { user }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    modalShow,
    addCardThunk,
  }
  return { ...bindActionCreators(actions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCard)

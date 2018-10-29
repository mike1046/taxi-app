import React, { PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  primaryColor,
  accentColor,
  generalFontSize,
  buttonContainerStyleLarge,
  buttonTextStyle,
} from '../styles'
import { logOutThunk } from '../actions/user'
import { navigateBack } from '../actions/navigation'

const LogOut = ({
  navigateBack,
  logOutThunk,
  email,
}) =>
  <View style={styles.content}>
    <View style={styles.textWrapper}>
      <Text style={styles.thanks}>Are you sure you</Text>
      <Text style={styles.thanks}>want to log out?</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
    <TouchableOpacity
      style={buttonContainerStyleLarge}
      onPress={logOutThunk}>
      <Text style={buttonTextStyle}>YES</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={buttonContainerStyleLarge}
      onPress={navigateBack}>
      <Text style={buttonTextStyle}>NEVER MIND</Text>
    </TouchableOpacity>
  </View>

LogOut.propTypes = {
  navigateBack: PropTypes.func.isRequired,
  logOutThunk: PropTypes.func.isRequired,
  email: PropTypes.string,
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
  text: {
    fontSize: generalFontSize,
  },
  email: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
})

function mapStateToProps({ user }) {
  const props = { email: user.email }
  return props
}

function mapDispatchToProps(dispatch) {
  const actions = {
    logOutThunk,
    navigateBack,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut)

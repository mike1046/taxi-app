import React, {
  Component,
  PropTypes,
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { navigateTo } from '../actions/navigation'
import { checkPersistantLoginThunk } from '../actions/user'
import {
  buttonContainerStyleLarge,
  buttonTextStyle,
} from '../styles'

class Home extends Component {
  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    checkingPersistantLogin: PropTypes.bool.isRequired,
    checkPersistantLoginThunk: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.goTo = this.goTo.bind(this)
    this.goToLogin = this.goToLogin.bind(this)
    this.goToSignup = this.goToSignup.bind(this)
  }

  componentDidMount() {
    this.props.checkPersistantLoginThunk()
  }

  goTo(destination) {
    const {
      navigateTo,
    } = this.props
    navigateTo(destination)
  }

  goToLogin() {
    this.goTo('Login')
  }

  goToSignup() {
    this.goTo('Signup')
  }

  render() {
    const { checkingPersistantLogin } = this.props
    return (
      <View style={styles.content}>
        {
          checkingPersistantLogin
            ? null
            : <View>
              <TouchableOpacity
                style={buttonContainerStyleLarge}
                onPress={this.goToLogin}
                activeOpacity={0.5}>
                <Text style={buttonTextStyle}>
                  SIGN IN
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={buttonContainerStyleLarge}
                onPress={this.goToSignup}
                activeOpacity={0.7}>
                <Text style={buttonTextStyle}>
                  REGISTER
                </Text>
              </TouchableOpacity>
            </View>
        }
      </View>
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

function mapStateToProps({ user: { checkingPersistantLogin } }) {
  const props = { checkingPersistantLogin }
  return props
}

function mapDispatchToProps(dispatch) {
  const actions = {
    navigateTo,
    checkPersistantLoginThunk,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

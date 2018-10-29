import React, {
  Component,
  PropTypes,
} from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { navigateTo } from '../actions/navigation'
import { getProfileThunk } from '../actions/user'
import { setSchedulePickup, resetPickupOptions } from '../actions/pickup'
import {
  buttonContainerStyleLarge,
  buttonTextStyle,
} from '../styles'

class BookNow extends Component {
  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    setSchedulePickup: PropTypes.func.isRequired,
    getProfileThunk: PropTypes.func.isRequired,
    resetPickupOptions: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.goToBookNow = this.goToBookNow.bind(this)
    this.goToSchedulePickup = this.goToSchedulePickup.bind(this)
  }

  componentWillMount() {
    const {
      user: {
        email,
        password,
        location,
      },
    } = this.props

    this.props.resetPickupOptions()
    // this.props.getProfileThunk(email, password, location, 'BookNow')
  }

  goToBookNow() {
    this.props.resetPickupOptions()
    this.props.setSchedulePickup(false)
    this.props.navigateTo('RequestPickup')
  }

  goToSchedulePickup() {
    this.props.resetPickupOptions()
    this.props.setSchedulePickup(true)
    this.props.navigateTo('SelectPickupTime')
  }

  render() {
    return (
      <View style={styles.content}>
        <TouchableOpacity
          onPress={this.goToBookNow}
          style={buttonContainerStyleLarge}>
          <Text style={buttonTextStyle}>BOOK NOW</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.goToSchedulePickup}
          style={buttonContainerStyleLarge}>
          <Text style={buttonTextStyle}>MAKE RESERVATION</Text>
        </TouchableOpacity>
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


function mapStateToProps({ user, navigation }) {
  return { user, navigation }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    navigateTo,
    getProfileThunk,
    setSchedulePickup,
    resetPickupOptions,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookNow)

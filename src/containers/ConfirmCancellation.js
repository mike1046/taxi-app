import React, {
  Component,
  PropTypes,
} from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  generalFontSize,
  iconColor,
  buttonContainerStyleLarge,
  buttonTextStyle,
} from '../styles'
import { navigateBack } from '../actions/navigation'
import { cancelRideThunk, cancelRide } from '../actions/ride'

class ConfirmCancellation extends Component {
  static propTypes = {
    navigateBack: PropTypes.func.isRequired,
    cancelRide: PropTypes.func.isRequired,
    cancelRideThunk: PropTypes.func.isRequired,
    ride: PropTypes.object.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
    }).isRequired,
    job_no: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.cancelRide = this.cancelRide.bind(this)
  }

  cancelRide() {
    const {
      user,
      cancelRide,
      cancelRideThunk,
      ride = {},
      job_no,
    } = this.props
    const {
      email,
      password,
    } = user
    const jobNo = ride.job_no ? ride.job_no : job_no

    // if job number, cancel thunk otherwise just clean the state
    if (jobNo) cancelRideThunk(email, password, jobNo)
    else cancelRide()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={[styles.text, styles.question]}>
            Are you sure you want to cancel?
          </Text>
        </View>
        <TouchableOpacity
          onPress={this.props.navigateBack}
          style={buttonContainerStyleLarge}>
          <Text style={buttonTextStyle}>
            NO, GO BACK
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.cancelRide}
          style={buttonContainerStyleLarge}>
          <Text style={buttonTextStyle}>
            YES, CANCEL
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 100,
    borderTopWidth: 1,
    borderTopColor: iconColor,
  },
  text: {
    fontSize: generalFontSize,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  question: {
    textAlign: 'center',
    color: 'white',
    flex: 0.5,
  },
})

function mapStateToProps({ user, ride }) {
  return { user, ride }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    cancelRideThunk,
    navigateBack,
    cancelRide,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmCancellation)

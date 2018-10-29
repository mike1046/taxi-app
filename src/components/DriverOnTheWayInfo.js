import React, {
  Component,
  PropTypes,
} from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native'
import DriverInfo from './DriverInfo'
import { isDriverArrived } from '../api/data'
import {
  buttonContainerStyle,
  buttonTextStyle,
  navbarBackground,
  iconColor,
} from '../styles'

class DriverOnTheWayInfo extends Component {
  constructor(props) {
    super(props)
    this.handleComingDown = this.handleComingDown.bind(this)
    this.handleFiveMinutes = this.handleFiveMinutes.bind(this)
  }
  // handlePhone() {
  //   const { driver } = this.props
  //   const { driver_cell_phone } = driver
  // }

  handleComingDown() {
    const {
      alertDriverThunk,
      user,
      ride,
    } = this.props
    const {
      email,
      password,
    } = user
    const { job_no } = ride
    // alerts driver that you dont need 5 minutes
    alertDriverThunk(email, password, job_no, 0)
  }

  handleFiveMinutes() {
    const {
      alertDriverThunk,
      user,
      ride,
    } = this.props
    const {
      email,
      password,
    } = user
    const { job_no } = ride
    // alerts driver that you need 5 more minutes
    alertDriverThunk(email, password, job_no, 5)
  }

  renderArrived(arrived, alerted) {
    const ArrivedElement = (
      <View style={styles.arrivedContainer}>
        <TouchableOpacity
          style={buttonContainerStyle}
          onPress={this.handleComingDown}>
          <Text style={[buttonTextStyle, { fontSize: 25 }]}>COMING DOWN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonContainerStyle}
          onPress={this.handleFiveMinutes}>
          <Text style={[buttonTextStyle, { fontSize: 25 }]}>GIVE ME 5 MINUTES</Text>
        </TouchableOpacity>
      </View>
    )
    return arrived && !alerted ? ArrivedElement : null
  }

  render() {
    const {
      driver,
      ride,
    } = this.props
    // const { driver_cell_phone } = driver
    const {
      job_status,
      alertDriverTime,
    } = ride
    const arrived = isDriverArrived(job_status)
    const hasAlerted = !!alertDriverTime
    // const phone = driver_cell_phone || '+17186225900'
    const ArrivedElement = this.renderArrived(arrived, hasAlerted)
    return (
      <View style={styles.container}>
        {ArrivedElement}
        <View style={styles.driverContainer}>
          <DriverInfo
            driver={driver}
            arrived={arrived}
            alerted={hasAlerted} />
          {/*
            <View style={styles.communication}>
              <TouchableOpacity onPress={() => this.handlePhone()} >
                <View style={styles.image}>
                  <Image source={require('../images/call-driver/call-driver.png')}/>
                </View>
              </TouchableOpacity>
            </View>
          */}
        </View>
      </View>
    )
  }
}

DriverOnTheWayInfo.propTypes = {
  alertDriverThunk: PropTypes.func.isRequired,
  driver: PropTypes.shape({
    driver_cell_phone: PropTypes.number,
  }).isRequired,
  ride: PropTypes.shape({
    job_no: PropTypes.number.isRequired,
    job_status: PropTypes.number.isRequired,
    alertDriverTime: PropTypes.instanceOf(Date),
  }).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: iconColor,
  },
  driverContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: navbarBackground,
    padding: 10,
  },
  communication: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    marginRight: 2,
    marginTop: 5,
    marginBottom: 5,
  },
})

export default DriverOnTheWayInfo

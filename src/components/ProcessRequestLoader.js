import React, {
  Component,
  PropTypes,
} from 'react'
import {
  Text,
  StyleSheet,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { capitalize } from 'lodash'
import {
  carOptions,
  driverWaitStatusMessages,
} from '../api/data'
import CarImage from './CarImage'
import LoaderSpinner from './LoaderSpinner'
import {
  iconColor,
  navbarBackground,
} from '../styles'
import { setDriverWaitStatusMessageIndex } from '../actions/ride'

function getCarName(car) {
  return carOptions.reduce((obj, option) => {
    if (option.id === car) return capitalize(option.display)
    return obj
  }, null)
}

class ProcessRequestLoader extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isDispatching !== this.props.isDispatching && nextProps.isDispatching === true) {
      this.startIntervals()
    }
  }

  startIntervals() {
    (function getNextMessage() {
      if (this.props.messageIndex === driverWaitStatusMessages.length - 1) {
        return
      }
      setTimeout(() => {
        this.props.setDriverWaitStatusMessageIndex(this.props.messageIndex + 1)
        getNextMessage.call(this)
      }, driverWaitStatusMessages[this.props.messageIndex].delay)
    }).call(this)
  }

  render() {
    const {
      car,
      isDispatching,
      messageIndex,
    } = this.props
    const { message } = driverWaitStatusMessages[messageIndex]
    const carName = car ? getCarName(car) : ''
    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.green, styles.padding]}>
          {isDispatching ? message : 'Processing your request'}
        </Text>
        <LoaderSpinner />
        {
          car
            ? <View style={styles.car}>
              <CarImage type={car} style={styles.carImage} resizeMode="contain" />
              <Text style={[styles.text, styles.white]}>{`${carName}`}</Text>
            </View>
            : null
         }
      </View>
    )
  }
}

ProcessRequestLoader.propTypes = {
  car: PropTypes.string,
  isDispatching: PropTypes.bool,
  messageIndex: PropTypes.number.isRequired,
  setDriverWaitStatusMessageIndex: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: navbarBackground,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: iconColor,
  },
  text: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  green: {
    color: iconColor,
  },
  white: {
    color: 'white',
  },
  paddingBottom: {
    padding: 10,
  },
  car: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  carImage: {
    width: 40,
    height: 20,
    paddingTop: 3,
    marginLeft: 5,
    marginRight: 5,
  },
})

function mapStateToProps(state) {
  return { messageIndex: state.ride.messageIndex }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setDriverWaitStatusMessageIndex,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessRequestLoader)

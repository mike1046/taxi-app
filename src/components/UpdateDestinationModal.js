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
import { formatDollars } from '../utils'
import {
  accentColor,
  primaryColor,
  iconColor,
  navbarBackground,
} from '../styles'

class UpdateDestinationModal extends Component {
  constructor(props) {
    super(props)
    this.acceptHandler = this.acceptHandler.bind(this)
    this.cancelHandler = this.cancelHandler.bind(this)
  }

  acceptHandler() {
    const { onAccept } = this.props
    onAccept()
  }

  cancelHandler() {
    const {
      modalHide,
      onReject,
    } = this.props
    onReject()
    modalHide()
  }

  render() {
    const {
      estimates,
      destination,
    } = this.props
    const { address } = destination
    const { pricing = {} } = estimates
    const { total } = pricing
    const prettyTotal = formatDollars(total)

    return (
      <View style={styles.container}>
        <Text style={[styles.green, styles.textLabel, styles.paddingTop]}>{`${address}`}</Text>
        <Text style={[styles.white, styles.textLabel, styles.bold, styles.paddingTop]}>
          New Quote
        </Text>
        <Text style={[styles.white, styles.text, styles.bold, styles.paddingBottom]}>
          {`$${prettyTotal}`}
        </Text>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={() => this.acceptHandler()}>
            <View style={[styles.button, styles.marginRight]}>
              <Text style={[styles.navy, styles.bold, styles.buttonText]}>UPDATE RIDE</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.cancelHandler()}>
            <View style={[styles.button, styles.marginLeft]}>
              <Text style={[styles.navy, styles.bold, styles.buttonText]}>CANCEL</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

UpdateDestinationModal.propTypes = {
  modalHide: PropTypes.func,
  onReject: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  estimates: PropTypes.shape({
    pricing: PropTypes.shape({
      total: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  destination: PropTypes.shape({
    address: PropTypes.string.isRequired,
  }).isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: navbarBackground,
    padding: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  green: {
    color: iconColor,
  },
  white: {
    color: 'white',
  },
  navy: {
    color: primaryColor,
  },
  text: {
    fontSize: 25,
  },
  textLabel: {
    fontSize: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: accentColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonText: {
    fontSize: 20,
  },
  paddingTop: {
    paddingTop: 10,
  },
  paddingBottom: {
    paddingBottom: 10,
  },
  marginLeft: {
    marginLeft: 5,
  },
  marginRight: {
    marginRight: 5,
  },
})

export default UpdateDestinationModal

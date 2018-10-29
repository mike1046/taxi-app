import React, {
  Component,
  PropTypes,
} from 'react'
import {
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'
import { generalFontSize } from '../styles'

class CountryCodeInput extends Component {
  constructor(props) {
    super(props)
    this.pressHandler = this.pressHandler.bind(this)
  }
  pressHandler() {
    const {
      modalShow,
      onPress,
    } = this.props
    const component = 'CountryCodeListModal'
    const props = { onPress }
    modalShow(component, props)
  }

  render() {
    const {
      value,
      style,
    } = this.props
    return (
      <TouchableHighlight
        style={style}
        onPress={this.pressHandler}>
        <Text style={styles.input}>
          {value}
        </Text>
      </TouchableHighlight>
    )
  }
}

CountryCodeInput.propTypes = {
  onPress: PropTypes.func.isRequired,
  value: PropTypes.string,
  modalShow: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
}

const styles = StyleSheet.create({
  input: {
    color: 'white',
    fontSize: generalFontSize,
  },
})

export default CountryCodeInput

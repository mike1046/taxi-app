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

class PickerInput extends Component {
  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    const {
      label,
      options,
      handleChange,
      inputTitle,
      modalShow,
    } = this.props
    modalShow('PickerModal', { label, handleChange, options, inputTitle })
  }

  render() {
    const {
      label,
      style,
    } = this.props
    return (
      <TouchableHighlight
        style={style}
        onPress={this.handlePress} >
        <Text style={styles.input}>
          {label}
        </Text>
      </TouchableHighlight>
    )
  }
}

PickerInput.propTypes = {
  label: PropTypes.string,
  modalShow: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  options: PropTypes.array.isRequired,
  inputTitle: PropTypes.string,
}

const styles = StyleSheet.create({
  input: {
    color: 'white',
    fontSize: generalFontSize,
    marginTop: 5,
  },
})

export default PickerInput

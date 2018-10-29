import React, {
  Component,
  PropTypes,
} from 'react'
import { Text } from 'react-native'
import { placeholderText, primaryColor, primaryOutlineColor, generalFontSize } from '../styles'
import InputIconWrapper from './InputIconWrapper'

class TextOrGooglePlacesInput extends Component {
  constructor(props) {
    super(props)
    this.onChangeValue = this.onChangeValue.bind(this)
    this.state = {
      value: this.props.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  onChangeValue(value) {
    this.setState({ value })
    this.props.onChangeText(value)
  }

  render() {
    const {
      placeholder,
      modalShow,
    } = this.props
    const address = this.state.value ? this.state.value.details.formatted_address : ''

    if (this.props.editMode) {
      return (
        <InputIconWrapper
          source="pickup"
          InputType="GooglePlacesInput"
          currentLocation
          modalShow={modalShow}
          onPress={this.onChangeValue}
          placeholder={placeholder}
          placeholderTextColor={placeholderText}
          value={address} />
      )
    }
    return (
      <Text style={this.props.styleText}>{placeholder}: {address}</Text>
    )
  }
}

TextOrGooglePlacesInput.propTypes = {
  modalShow: PropTypes.func.isRequired,
  onChangeText: PropTypes.func,
  editMode: PropTypes.bool.isRequired,
  value: PropTypes.any,
  styleText: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  placeholder: PropTypes.string,
}

TextOrGooglePlacesInput.defaultProps = {
  styleText: {
    fontSize: generalFontSize,
    color: 'white',
    flexDirection: 'column',
    paddingTop: 11,
    paddingBottom: 21,
    paddingLeft: 10,
    marginLeft: 10,
  },
  styleInput: {
    color: 'white',
    backgroundColor: primaryColor,
    borderWidth: 1,
    fontSize: generalFontSize,
    borderColor: primaryOutlineColor,
    height: 45,
    padding: 10,
    marginBottom: 10,
  },
}

export default TextOrGooglePlacesInput

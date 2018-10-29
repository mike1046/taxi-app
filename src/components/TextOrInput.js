import React, { Component, PropTypes } from 'react'
import {
  Text,
  Platform,
} from 'react-native'
import { generalFontSize } from '../styles'

class TextOrInput extends Component {
  constructor(props) {
    super(props)
    this.onChangeValue = this.onChangeValue.bind(this)
    this.state = {
      value: props.value,
    }
  }

  onChangeValue(val) {
    this.setState({ value: val })
  }

  maybeHideText(text) {
    if (text) {
      if (this.props.secureTextEntry) {
        let str = ''
        for (let i = 0; i < text.length; i++) {
          str += '•'
        }
        return str
      }
      return text
    }
  }

  render() {
    if (this.props.editMode) {
      return (
        this.props.children
      )
    }
    return (
      <Text style={this.props.styleText}>
        {this.props.placeholder}: {this.maybeHideText(this.props.value)}
      </Text>
    )
  }
}

TextOrInput.propTypes = {
  children: PropTypes.element.isRequired,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  editMode: PropTypes.bool.isRequired,
  value: PropTypes.any,
  styleText: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
}

TextOrInput.defaultProps = {
  styleText: {
    fontSize: generalFontSize,
    color: 'white',
    flexDirection: 'column',
    paddingTop: 11,
    paddingBottom: 21,
  },
}

export default TextOrInput

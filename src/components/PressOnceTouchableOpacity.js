import React, { Component, PropTypes } from 'react'
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleClickability } from '../actions/debounce'

class PressOnceTouchableOpacity extends Component {
  constructor(props) {
    super(props)
    this.pressHandler = this.pressHandler.bind(this)
  }

  pressHandler() {
    if (this.props.buttons[this.props.buttonName]) {
      this.props.toggleClickability(this.props.buttonName)
      this.props.onPress()
    }
  }

  render() {
    const {
      activeOpacity,
      buttons,
      buttonName,
    } = this.props
    let { style } = this.props

    if (!buttons[buttonName]) style = Object.assign({ opacity: 0.8 }, style)
    return (
      <TouchableOpacity
        style={{ ...style, alignSelf: 'stretch' }}
        activeOpacity={activeOpacity}
        onPress={this.pressHandler}>
        {this.props.children}
      </TouchableOpacity>
    )
  }
}

PressOnceTouchableOpacity.propTypes = {
  activeOpacity: PropTypes.number,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  buttonName: PropTypes.string,
  toggleClickability: PropTypes.func,
  buttons: PropTypes.object,
  children: PropTypes.element,
}

PressOnceTouchableOpacity.defaultProps = {
  style: {},
  buttons: {},
}

function mapStateToProps(state) {
  return { buttons: state.debounce }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleClickability }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PressOnceTouchableOpacity)

/* eslint no-return-assign: 0 */
import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { generalFontSize, accentColor } from '../styles'

class ToggleElementsMenu extends Component {
  static propTypes = {
    text: PropTypes.string,
    textStyle: PropTypes.any,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
  }

  static defaultProps = {
    textStyle: {
      fontSize: generalFontSize,
      color: 'white',
    },
  }

  constructor(props) {
    super(props)
    this.toggleOpen = this.toggleOpen.bind(this)
    this.state = {
      show_more: false,
    }
  }

  toggleOpen() {
    const currentState = this.state.show_more
    this.setState({ show_more: !currentState })
    this.viewElement.measure((fx, fy) => {
      if (this.props.onChange) { this.props.onChange(currentState, fy) }
    })
  }

  render() {
    const triangleOrientation = this.state.show_more ? styles.down : styles.right
    const childrenClass = this.state.show_more ? null : styles.off
    const triangleStyles = [styles.triangle, triangleOrientation]
    return (
      <View ref={viewElement => this.viewElement = viewElement}>
        <TouchableHighlight
          activeOpacity={1.0}
          underlayColor={'transparent'}
          onPress={this.toggleOpen}>
          <View style={[styles.row, styles.inline]}>
            <Text style={this.props.textStyle}>{this.props.text}</Text>
            <View style={triangleStyles} />
          </View>
        </TouchableHighlight>
        <View style={childrenClass}>
          {this.props.children}
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  row: {
    height: 45,
    padding: 10,
    marginBottom: 10,
  },
  triangle: {
    width: 0,
    height: 0,
    margin: 2,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 12,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: accentColor,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  right: {
    transform: [{ rotate: '0deg' }],
  },
  down: {
    transform: [{ rotate: '90deg' }],
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 100,
    backgroundColor: 'transparent',
  },
  off: {
    opacity: 0,
    height: 0,
    transform: [{ translateY: 500, translateX: 500 }],
  },
})

export default ToggleElementsMenu

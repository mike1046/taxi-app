import React, {
  Component,
  View,
  TouchableHighlight,
  Text,
  PropTypes,
  StyleSheet,
} from 'react'
import {
  accentColor,
  generalFontSize,
  placeholderText,
} from '../styles'

class Checkbox extends Component {
  constructor(props) {
    super(props)
    const { defaultValue } = this.props
    this.toggleCheked = this.toggleCheked.bind(this)
    this.state = {
      checked: defaultValue || false,
    }
  }

  toggleChecked() {
    let { checked } = this.state
    const { onChange } = this.props
    checked = !checked
    this.setState({ checked })
    onChange(checked)
  }

  render() {
    const { checked } = this.state
    const { label } = this.props
    const LabelComponent = label ? <Text style={styles.label}>{label}</Text> : null
    return (
      <View style={styles.container}>
        {LabelComponent}
        <TouchableHighlight onPress={this.toggleChecked}>
          <View style={styles.checkboxContainer}>
            <View style={[styles.checkbox, checked && styles.highlight]} />
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

Checkbox.propTypes = {
  defaultValue: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
    marginTop: 2,
    marginBottom: 2,
  },
  label: {
    fontSize: generalFontSize,
    color: placeholderText,
  },
  checkboxContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  checkbox: {
    height: 25,
    width: 25,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'transparent',
  },
  highlight: {
    backgroundColor: accentColor,
  },
})

export default Checkbox

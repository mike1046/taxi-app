import React, {
  Component,
  PropTypes,
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Picker,
  Platform,
} from 'react-native'
import _ from 'lodash'
import {
  navbarBackground,
  buttonContainerStyleLarge,
  buttonTextStyle,
  accentColor,
} from '../styles'

class PickerModal extends Component {
  constructor(props) {
    super(props)
    this.modalHide = props.modalHide.bind(this)
    this.handleChange = props.handleChange.bind(this)
    this.setValue = this.setValue.bind(this)
    this.submitValue = this.submitValue.bind(this)
    this.state = { label: props.label }
  }

  setValue(label) {
    this.setState({ label })
  }

  submitValue() {
    const { options } = this.props
    this.handleChange(
      options[_.findIndex(options, { label: this.state.label })],
    )
    this.modalHide()
  }

  render() {
    const { label } = this.state
    const { options, inputTitle } = this.props
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={label}
          style={styles[Platform.OS]}
          onValueChange={this.setValue}
          itemStyle={styles.pickerStyle} >
          {
            options.map(({ label }) =>
              <Picker.Item
                key={label}
                label={label}
                value={label} />,
            )
          }
        </Picker>
        <TouchableOpacity
          style={buttonContainerStyleLarge}
          onPress={this.submitValue}>
          <Text style={buttonTextStyle}>SELECT {inputTitle}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

PickerModal.propTypes = {
  modalHide: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  inputTitle: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: navbarBackground,
    flex: 1,
  },
  pickerStyle: {
    color: 'white',
  },
  titleStyle: {
    color: accentColor,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
  },
  android: {
    color: 'white',
    height: 100,
  },
  ios: {

  },
})

export default PickerModal

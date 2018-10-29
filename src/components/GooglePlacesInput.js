import React, {
  Component,
  PropTypes,
} from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native'
import { generalFontSize } from '../styles'
import { pickPropertiesFrom } from '../utils'


class GooglePlacesInput extends Component {
  static propTypes = {
    modalShow: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  }
  constructor(props) {
    super(props)
    this.pressHandler = this.pressHandler.bind(this)
  }

  pressHandler() {
    const { modalShow } = this.props
    const props = pickPropertiesFrom(this.props)(
      'onPress',
      'placeholder',
      'placeholderTextColor',
      'predefinedPlaces',
      'autoFillFirstResult',
      'currentLocation',
      'currentLocationLabel',
    )

    const component = 'GooglePlacesAutocompleteModal'
    // Launches the modal
    modalShow(component, props)
  }

  render() {
    const {
      value,
      placeholder,
      style,
    } = this.props
    return (
      <TouchableOpacity
        style={style}
        onPress={this.pressHandler}>
        <View style={styles.container}>
          <Text style={styles.fauxInput}>
            {value || placeholder}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 52,
    marginTop: 6,
    marginBottom: 2,
    flexDirection: 'row',
  },
  fauxInput: {
    color: 'white',
    flexWrap: 'nowrap',
    fontSize: generalFontSize,
    flex: 1,
    height: 25,
  },
})

export default GooglePlacesInput

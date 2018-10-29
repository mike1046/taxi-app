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
import AutocompleteRow from './AutocompleteRow'
import { generalFontSize } from '../styles'

class AutocompleteInput extends Component {
  static propTypes = {
    modalShow: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    searchPlaceholder: PropTypes.string,
    type: PropTypes.oneOf(['airports', 'airlines']).isRequired,
    onPress: PropTypes.func,
  }
  constructor(props) {
    super(props)
    this.pressHandler = this.pressHandler.bind(this)
  }

  pressHandler() {
    const { searchPlaceholder, type, modalShow } = this.props
    modalShow('AutocompleteModal',
      {
        type,
        rowComponent: AutocompleteRow,
        placeholderText: searchPlaceholder,
        onPressResult: (result) => {
          this.props.onPress(result)
        },
      },
    )
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

export default AutocompleteInput

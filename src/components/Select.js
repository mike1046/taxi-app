import React, { PropTypes } from 'react'
import {
  TextInput,
  StyleSheet,
  View,
} from 'react-native'
import {
  Generator,
  isGenerator,
  getIndexOfGenerator,
  formatValueToOption,
} from '../utils'
import {
  placeholderText,
  generalFontSize,
} from '../styles'

function getDisplayOptionsIndex(index, options) {
  if (Array.isArray(options)) return formatValueToOption(options[index]).display
  else if (isGenerator(options)) {
    const value = getIndexOfGenerator(index, options)
    return formatValueToOption(value).display
  }
}

const Select = ({
  index,
  options,
  placeholder,
  value,
  placeholderTextColor,
}) => {
  let newValue
  if (value) {
    newValue = value.toUpperCase()
  } else {
    newValue = index === null || index === undefined
      ? null
      : getDisplayOptionsIndex(index, options)
  }
  const newPlaceholderTextColor = placeholderTextColor || placeholderText
  return (
    <View style={styles.container}>
      <TextInput
        editable={false}
        placeholder={placeholder}
        placeholderTextColor={newPlaceholderTextColor}
        style={styles.input}
        value={newValue} />
    </View>
  )
}

Select.propTypes = {
  index: PropTypes.number,
  // onClick: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          display: PropTypes.string,
          value: PropTypes.any,
        }),
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
    ),
    PropTypes.instanceOf(Generator),
  ]).isRequired,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  value: PropTypes.string,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 100,
  },
  input: {
    color: 'white',
    fontSize: generalFontSize,
    flex: 100,
  },
})

export default Select

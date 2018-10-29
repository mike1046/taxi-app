import React, {
  Component,
  TouchableHighlight,
  View,
  StyleSheet,
  PropTypes,
  ScrollView,
  Text,
} from 'react'
import CarDisplay from './CarDisplay'
import {
  generalFontSize,
  primaryColor,
} from '../styles'

class Carousel extends Component {
  constructor(props) {
    super(props)
    const {
      start,
      options,
    } = this.props
    const startValue = options[start].value
    this.state = {
      index: start,
      ...startValue,
    }
  }

  setValue(value, index) {
    const { onPress } = this.props
    onPress(value)
    this.setState({
      index,
      ...value,
    })
  }

  isActive(index) {
    return index === this.state.index
  }

  render() {
    const { options } = this.props
    return (
      <View style={styles.container}>
        <CarDisplay {...this.state} />
        <View style={styles.menu}>
          <ScrollView
            contentContainerStyle={styles.menu}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {
             options.map((option, index) =>
               <TouchableHighlight
                 key={index}
                 onPress={() => this.setValue(option.value, index)}>
                 <View style={styles.selectionContainer}>
                   <Text
                     style={[styles.text, this.isActive(index) && styles.active]}>
                     {`${option.display}`}
                   </Text>
                 </View>
               </TouchableHighlight>,
            )}
          </ScrollView>
        </View>
      </View>
    )
  }
}

Carousel.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      display: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    }),
  ])).isRequired,
  start: PropTypes.number,
  onPress: PropTypes.func.isRequired,
}

Carousel.defaultProps = {
  start: 0,
  options: [],
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  menu: {
    backgroundColor: primaryColor,
  },
  selectionContainer: {
    padding: 5,
  },
  text: {
    fontSize: generalFontSize,
    color: 'white',
  },
  active: {
    color: 'yellow',
  },
})

export default Carousel

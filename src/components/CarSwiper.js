import React, { Component, PropTypes } from 'react'
import Swiper from 'react-native-swiper'
import { View, Text, StyleSheet } from 'react-native'
import { accentColor } from '../styles'
import CarDisplay from './CarDisplay'

const styles = StyleSheet.create({
  dot: {
    backgroundColor: 'rgba(0,0,0,.4)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: accentColor,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  buttonText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: accentColor,
  },
})

const customDot = <View style={styles.dot} />
const customActiveDot = <View style={styles.activeDot} />
const customLeftButton = <Text style={styles.buttonText}>‹</Text>
const customRightButton = <Text style={styles.buttonText}>›</Text>

class CarSwiper extends Component {
  constructor(props) {
    super(props)
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this)
  }
  shouldComponentUpdate(nextProps) {
    return (this.props.options !== nextProps.options) ||
      this.props.isPremium !== nextProps.isPremium
  }

  onMomentumScrollEnd(e, state) {
    const val = this.props.options[Math.floor(state.index)]
    // val will be the car based on the index from caroptions
    // val will be passed to parent component as a car, not an index
    if (!val) return// sometimes the UI glitches and doesnt pick a value
    this.props.onChange(val)
  }

  render() {
    const { options } = this.props
    const cars = options.map(option => (
      <CarDisplay
        key={option.id}
        type={option.id}
        luggage={option.value.luggage}
        people={option.value.people}
        display={option.display}
        isPremium={option.isPremium} />
    ))
    return (
      <Swiper
        dot={customDot}
        activeDot={customActiveDot}
        nextButton={customRightButton}
        prevButton={customLeftButton}
        height={230}
        loop={false}
        showsButtons
        onMomentumScrollEnd={this.onMomentumScrollEnd}>
        {cars}
      </Swiper>
    )
  }
}

CarSwiper.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      display: PropTypes.string,
      id: PropTypes.string,
      image: PropTypes.string,
      isPremium: PropTypes.bool,
      value: PropTypes.shape({
        luggage: PropTypes.number,
        people: PropTypes.number,
        type: PropTypes.string,
      }),
    }),
  ),
  onChange: PropTypes.func,
  isPremium: PropTypes.bool,
}

export default CarSwiper

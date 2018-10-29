import React, { PropTypes } from 'react'
import { Image } from 'react-native'

const images = {
  sd: {
    prem: require('../images/select-car-economysedan2/select-car-economysedan2.png'),
    eco: require('../images/select-car-economysedan1/select-car-economysedan1.png'),
  },
  any: {
    prem: require('../images/select-car-any/select-car-any.png'),
    eco: require('../images/select-car-any/select-car-any.png'),
  },
  limo: {
    prem: require('../images/select-car-limo/select-car-limo.png'),
    eco: require('../images/select-car-limo/select-car-limo.png'),
  },
  mv: {
    prem: require('../images/select-car-premiumminivan/select-car-premiumminivan.png'),
    eco: require('../images/select-car-economyminivan/select-car-economyminivan.png'),
  },
  lsuv: {
    prem: require('../images/select-car-lgsuv2/select-car-lgsuv2.png'),
    eco: require('../images/select-car-lgsuv1/select-car-lgsuv1.png'),
  },
  suv: {
    prem: require('../images/select-car-premiumsuv/select-car-premiumsuv.png'),
    eco: require('../images/select-car-suv/select-car-economysuv.png'),
  },
}

const CarImage = ({
  isPremium,
  type,
  style,
  resizeMode,
}) => {
  const carClass = isPremium ? 'prem' : 'eco'
  return (
    <Image
      source={images[type][carClass]}
      style={style}
      resizeMode={resizeMode} />
  )
}

CarImage.propTypes = {
  type: PropTypes.string.isRequired,
  isPremium: PropTypes.bool.isRequired,
  style: Image.propTypes.style,
  resizeMode: PropTypes.string,
}

CarImage.defaultProps = {
  isPremium: false,
}

export default CarImage

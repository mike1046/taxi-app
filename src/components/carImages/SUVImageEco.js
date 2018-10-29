import React, { PropTypes } from 'react'
import { Image } from 'react-native'

const SUVImageEco = ({ style, resizeMode = 'contain' }) =>
  <Image
    source={require('../../images/select-car-suv/select-car-economysuv.png')}
    style={style}
    resizeMode={resizeMode} />

SUVImageEco.propTypes = {
  style: Image.propTypes.style,
  resizeMode: PropTypes.string,
}

export default SUVImageEco

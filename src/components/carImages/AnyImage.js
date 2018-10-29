import React, { PropTypes } from 'react'
import { Image } from 'react-native'

const AnyImage = ({ resizeMode = 'contain', style }) =>
  <Image
    source={require('../../images/select-car-any/select-car-any.png')}
    style={style}
    resizeMode={resizeMode} />

AnyImage.propTypes = {
  style: Image.propTypes.style,
  resizeMode: PropTypes.string,
}

export default AnyImage

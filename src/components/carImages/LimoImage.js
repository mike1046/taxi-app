import React, { PropTypes } from 'react'
import { Image } from 'react-native'

const LimoImage = ({ style, resizeMode = 'contain' }) =>
  <Image
    source={require('../../images/select-car-limo/select-car-limo.png')}
    style={style}
    resizeMode={resizeMode} />

LimoImage.propTypes = {
  style: Image.propTypes.style,
  resizeMode: PropTypes.string,
}

export default LimoImage

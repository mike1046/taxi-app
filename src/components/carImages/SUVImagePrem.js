import React, { PropTypes } from 'react'
import { Image } from 'react-native'

const SUVImagePrem = ({ style, resizeMode = 'contain' }) =>
  <Image
    source={require('../../images/select-car-premiumsuv/select-car-premiumsuv.png')}
    style={style}
    resizeMode={resizeMode} />

SUVImagePrem.propTypes = {
  style: Image.propTypes.style,
  resizeMode: PropTypes.string,
}

export default SUVImagePrem

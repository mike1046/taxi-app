import React, { PropTypes } from 'react'
import { Image } from 'react-native'

const LargeSUVImagePrem = ({ style, resizeMode = 'contain' }) =>
  <Image
    source={require('../../images/select-car-lgsuv2/select-car-lgsuv2.png')}
    style={style}
    resizeMode={resizeMode} />

LargeSUVImagePrem.propTypes = {
  style: Image.propTypes.style,
  resizeMode: PropTypes.string,
}

export default LargeSUVImagePrem

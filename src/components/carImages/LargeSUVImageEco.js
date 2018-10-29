import React, { PropTypes } from 'react'
import { Image } from 'react-native'

const LargeSUVImageEco = ({ style, resizeMode = 'contain' }) =>
  <Image
    source={require('../../images/select-car-lgsuv1/select-car-lgsuv1.png')}
    style={style}
    resizeMode={resizeMode} />

LargeSUVImageEco.propTypes = {
  style: Image.propTypes.style,
  resizeMode: PropTypes.string,
}

export default LargeSUVImageEco

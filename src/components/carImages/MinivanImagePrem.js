import React, { PropTypes } from 'react'
import { Image } from 'react-native'

const MinivanImagePrem = ({ style, resizeMode = 'contain' }) =>
  <Image
    source={require('../../images/select-car-premiumminivan/select-car-premiumminivan.png')}
    style={style}
    resizeMode={resizeMode} />

MinivanImagePrem.propTypes = {
  style: Image.propTypes.style,
  resizeMode: PropTypes.string,
}

export default MinivanImagePrem

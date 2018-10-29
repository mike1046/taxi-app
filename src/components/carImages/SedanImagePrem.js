import React, { PropTypes } from 'react'
import { Image } from 'react-native'

const SedanImagePrem = ({ style, resizeMode = 'contain' }) =>
  <Image
    source={require('../../images/select-car-economysedan2/select-car-economysedan2.png')}
    style={style}
    resizeMode={resizeMode} />

SedanImagePrem.propTypes = {
  style: Image.propTypes.style,
  resizeMode: PropTypes.string,
}

export default SedanImagePrem

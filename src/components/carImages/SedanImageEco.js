import React, { PropTypes } from 'react'
import { Image } from 'react-native'

const SedanImageEco = ({ style, resizeMode = 'contain' }) =>
  <Image
    source={require('../../images/select-car-economysedan1/select-car-economysedan1.png')}
    style={style}
    resizeMode={resizeMode} />

SedanImageEco.propTypes = {
  style: Image.propTypes.style,
  resizeMode: PropTypes.string,
}

export default SedanImageEco

import React, { PropTypes } from 'react'
import { Image } from 'react-native'

const MinivanImageEco = ({ style, resizeMode = 'contain' }) =>
  <Image
    source={require('../../images/select-car-economyminivan/select-car-economyminivan.png')}
    style={style}
    resizeMode={resizeMode} />

MinivanImageEco.propTypes = {
  style: Image.propTypes.style,
  resizeMode: PropTypes.string,
}

export default MinivanImageEco

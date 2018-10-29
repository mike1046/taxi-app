import React, { Component } from 'react'
import {
  View,
  Image,
} from 'react-native'

class LoaderSpinner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      degrees: 0,
      int: undefined,
    }
  }

  componentWillMount() {
    this.setState({ int: setInterval(() => this.tick(), 40) })
  }

  componentWillUnmount() {
    const int = clearInterval(this.state.int)
    this.setState({ int })
  }

  tick() {
    this.setState({ degrees: this.state.degrees + 22.5 })
  }

  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 10,
          transform: [{
            scale: 0.8,
          }],
        }}>
        <Image
          source={require('../images/loader/loader.png')}
          style={{
            width: 100,
            height: 100,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: 'transparent',
            transform: [{
              rotate: `${this.state.degrees}deg`,
            }],
          }} />
        <Image
          source={require('../images/logo/logo.png')}
          style={{
            width: 70,
            resizeMode: 'contain',
            transform: [{
              translateY: -58,
            }],
          }} />
      </View>
    )
  }
}

export default LoaderSpinner

import React, {
  Component,
  cloneElement,
  PropTypes,
} from 'react'
import {
  StyleSheet,
  Animated,
  Dimensions,
  BackAndroid,
} from 'react-native'

const { height } = Dimensions.get('window')

class Modal extends Component {
  static propTypes = {
    modalHide: PropTypes.func.isRequired,
    component: PropTypes.element.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      offset: new Animated.Value(height),
    }

    this.modalHide = this.modalHide.bind(this)

    BackAndroid.addEventListener('hardwareBackPress', this.modalHide)
  }

  componentDidMount() {
    const { offset } = this.state

    Animated.timing(offset, {
      duration: 100,
      toValue: 0,
    }).start()
  }

  modalHide() {
    const { offset } = this.state
    const { modalHide } = this.props
    Animated.timing(offset, {
      duration: 100,
      toValue: height,
    }).start(() => modalHide())
    BackAndroid.removeEventListener('hardwareBackPress', this.modalHide)
    return true
  }

  createChild() {
    // passing the ability to close the modal wrapper from child.
    const { component } = this.props
    const additionalProps = {
      modalHide: () => this.modalHide(),
    }
    return cloneElement(component, additionalProps)
  }

  render() {
    const { offset } = this.state
    const ModalComponent = this.createChild()
    return (
      <Animated.View
        style={[styles.flexCenter, styles.modal, { transform: [{ translateY: offset }] }]}>
        {ModalComponent}
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  flexCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,.8)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
})

export default Modal

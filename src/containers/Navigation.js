import React, {
  Component,
  PropTypes,
} from 'react'
import {
  View,
  Dimensions,
  Platform,
  StatusBar,
  NavigationExperimental,
  PermissionsAndroid,
} from 'react-native'
import ErrorUtils from 'ErrorUtils' // eslint-disable-line
import Drawer from 'react-native-drawer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Raven from 'raven-js'
import startRaven from 'raven-js/plugins/react-native'
import * as modals from '../modals'
import Menu from '../components/Menu'
import BackgroundWrapper from '../components/BackgroundWrapper'
import { navbarBackground } from '../styles'
import Modal from '../components/Modal'
import DrawerNavbarComponent from '../components/DrawerNavbarComponent'
import {
  setLocationSuccess,
  setLocationError,
} from '../actions/user'
import { modalHide } from '../actions/modal'
import { toggleMenu, openMenu, closeMenu } from '../actions/menu'
import { version } from '../../package.json'

startRaven(Raven)
Raven
  .config('https://572b1cbd744547cfb35da61c253ec9ea@sentry.io/120055', {
    release: version,
  })
  .install()


// intercept react-native error handling
const defaultHandler = ErrorUtils.getGlobalHandler()
ErrorUtils.setGlobalHandler((error) => {
  Raven.captureException(error, {
    logger: 'javascript',
  })
  return defaultHandler(error)
})

const { height } = Dimensions.get('window')
const { CardStack: NavigationCardStack } = NavigationExperimental


function watchLocation(setLocationSuccess, setLocationError) {
  const watcherOptions = {
    enableHighAccuracy: true, // enables higher accuracy
    timeout: 10000, // maximum time to find location
    maximumAge: 0, // prevents using cached location
  }

  let showError = true // boolean so errors dont keep appearing
  const watcherSuccess = position => setLocationSuccess(position)
  const watcherError = () => {
    if (showError) {
      showError = false
      setLocationError(
        new Error('Please enable location services for better service.'),
      )
    }
  }
  // Watches position and updates accordingly
  const args = [watcherSuccess, watcherError]
  // android has problems with the third argument
  if (Platform.OS !== 'android') args.push(watcherOptions)
  navigator.geolocation.watchPosition.apply(null, args)
}

class Navigation extends Component {
  static propTypes = {
    modalHide: PropTypes.func.isRequired,
    ride: PropTypes.object.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    setLocationSuccess: PropTypes.func.isRequired,
    setLocationError: PropTypes.func.isRequired,
    modal: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    menu: PropTypes.object.isRequired,
    openMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired,
  }

  static renderScene(sceneProps) {
    const { component: Component, viewProps } = sceneProps.scene.route
    return (
      <BackgroundWrapper>
        <Component
          {...viewProps} />
      </BackgroundWrapper>
    )
  }
  constructor(props) {
    super(props)
    this.renderHeader = this.renderHeader.bind(this)
  }

  componentWillMount() {
    const {
      setLocationSuccess,
      setLocationError,
    } = this.props
    // Hide IOS Status Bar
    if (Platform.OS === 'ios') {
      StatusBar.setHidden(false)
      StatusBar.setBarStyle('light-content')
    }

    if (Platform.OS === 'ios') watchLocation(setLocationSuccess, setLocationError)
    else {
      PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      .then((granted) => {
        if (granted) {
          watchLocation(setLocationSuccess, setLocationError)
        } else setLocationError(new Error('Please enable location permission for better service.'))
      })
    }
  }

  renderHeader(sceneProps) {
    return (
      <DrawerNavbarComponent
        jobStatus={this.props.ride.job_status}
        {...sceneProps} />
    )
  }

  render() {
    const {
      modal,
      navigation,
      modalHide,
    } = this.props
    let ModalComponent
    if (modal.on) {
      const {
        component,
        props = {},
      } = modal
      const ModalContent = React.createElement(modals[component], { ...props })
      ModalComponent = <Modal modalHide={modalHide} component={ModalContent} />
    } else ModalComponent = null

    const { menu: { menuOpen } } = this.props
    const menu = (
      <Menu
        closeDrawer={this.props.toggleMenu} />
    )
    return (
      <View style={{ height, backgroundColor: navbarBackground }}>
        <Drawer
          open={menuOpen}
          content={menu}
          type="overlay"
          side={'right'}
          onOpenStart={this.props.openMenu}
          onCloseStart={this.props.closeMenu}
          openDrawerOffset={0.3}
          captureGestures={'open'}
          negotiatePan
          tapToClose
          tweenHandler={ratio => ({
            main: { opacity: (2 - ratio) / 2 },
          })}
          panOpenMask={0.1} >
          <NavigationCardStack
            enableGestures={false}
            navigationState={navigation}
            renderHeader={this.renderHeader}
            renderScene={Navigation.renderScene} />
          {ModalComponent}
        </Drawer>
      </View>
    )
  }
}

function mapStateToProps({ modal, navigation, menu, ride }) {
  return { modal, navigation, menu, ride }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    setLocationSuccess,
    setLocationError,
    modalHide,
    toggleMenu,
    openMenu,
    closeMenu,
  }
  return { ...bindActionCreators(actions, dispatch) }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navigation)

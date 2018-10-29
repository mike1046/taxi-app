import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  StyleSheet,
  NavigationExperimental,
  Image,
  TouchableOpacity,
  View,
  BackAndroid,
  Platform,
} from 'react-native'
import {
  navbarBackground,
  navbarBorderBottom,
  accentColor,
} from '../styles'
import {
  navigateBack,
  navigateTo,
} from '../actions/navigation'
import { toggleMenu } from '../actions/menu'
import { convertCamelToSpace } from '../utils'

const {
  Header: NavigationHeader,
  PropTypes: NavigationPropTypes,
} = NavigationExperimental

function titleFormatter(key, jobStatus) {
  if (key === 'DriverOnTheWay') {
    switch (jobStatus) {
      case undefined:
        return 'ConfirmRide'
      case 0:
        return 'AssigningDriver'
      case 7:
        return 'ReassigningDriver'
      case 3:
        return 'PickedUp'
      case 2:
        return 'DriverHasArrived'
      case 1:
      default:
        return key
    }
  }
  return key
}

class DrawerNavbarComponent extends Component {
  static propTypes = {
    ...NavigationPropTypes.SceneRendererProps,
    jobStatus: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.navigateBack = props.navigateBack
    this.renderTitleComponent = this.renderTitleComponent.bind(this)
    this.renderLeftComponent = this.renderLeftComponent.bind(this)
    this.renderRightComponent = this.renderRightComponent.bind(this)

    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.navigateBack()
      return true
    })
  }

  renderTitleComponent(props) {
    const marginTop = Platform.OS === 'android' ? 14 : 10
    return (
      <NavigationHeader.Title style={{ flexDirection: 'column' }} textStyle={[styles.title, { marginTop }]}>
        {convertCamelToSpace(titleFormatter(props.scene.route.key, this.props.jobStatus))}
      </NavigationHeader.Title>
    )
  }

  renderLeftComponent(props) {
    if (props.scene.index === 0) {
      return (
        <View style={styles.leftComponent}>
          <Image
            style={styles.logo}
            source={require('../images/logo/logo.png')} />
        </View>
      )
    }
    return (
      <TouchableOpacity
        style={styles.leftComponent}
        onPress={this.navigateBack}>
        <Image
          style={styles.back}
          source={require('../images/back/back.png')} />
      </TouchableOpacity>
    )
  }

  renderRightComponent() {
    return (
      <TouchableOpacity
        onPress={this.props.toggleMenu}
        style={styles.burgerButton}>
        <Image
          style={styles.burger}
          source={require('../images/burger/burger.png')} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <NavigationHeader
        {...this.props}
        style={styles.navigationHeader}
        renderLeftComponent={this.renderLeftComponent}
        renderRightComponent={this.renderRightComponent}
        renderTitleComponent={this.renderTitleComponent} />
    )
  }
}

// added backgroundColors to everything to prevent weird overlapping issue on Android
const styles = StyleSheet.create({
  navigationHeader: {
    backgroundColor: navbarBackground,
    borderBottomWidth: 2,
    borderBottomColor: navbarBorderBottom,
  },
  logo: {
    width: 50,
    marginRight: 5,
    marginLeft: 10,
    resizeMode: 'contain',
    zIndex: 100,
    backgroundColor: navbarBackground,
  },
  back: {
    width: 60,
    height: 30,
    resizeMode: 'contain',
    backgroundColor: navbarBackground,
  },
  title: {
    color: accentColor,
    fontWeight: 'bold',
    minWidth: 150,
    textAlign: 'center',
    backgroundColor: navbarBackground,
  },
  burger: {
    width: 30,
    height: 18,
  },
  burgerButton: {
    backgroundColor: navbarBackground,
    paddingRight: 10,
    paddingLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  leftComponent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: navbarBackground,
  },
})

function mapStateToProps({ menu }) {
  return { menu }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    navigateBack,
    navigateTo,
    toggleMenu,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavbarComponent)

/* eslint react/no-multi-comp:0 */
import React, {
  Component,
  PropTypes,
} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { phonecall } from 'react-native-communications'
import {
  darkLineColor,
  navbarBackground,
  accentColor,
  androidMarginFix,
} from '../styles'
import { EASTERN_VERSION } from '../api/data'
import { navigateTo } from '../actions/navigation'

const phone = require('../images/input-icon-phone/input-icon-phone.png')

const window = Dimensions.get('window')


class Menu extends Component {
  static propTypes = {
    menu: PropTypes.object.isRequired,
    api: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    closeDrawer: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.navigateTo = this.navigateTo.bind(this)
    this.callEastern = this.callEastern.bind(this)
  }

  navigateTo(destination) {
    const { navigateTo } = this.props
    navigateTo(destination)
  }

  callEastern() {
    const { api: { contact_telephone = '7184996227' } } = this.props
    phonecall(contact_telephone.toString(), true)
  }

  render() {
    const { menu, navigation } = this.props
    return (
      <View style={[styles.menuContainer, androidMarginFix]}>
        <View>
          <View style={[styles.optionContainer, styles.alignRight]}>
            <TouchableOpacity onPress={this.props.closeDrawer}>
              <Image
                source={require('../images/cancel-white/cancel.png')}
                style={styles.image} />
            </TouchableOpacity>
          </View>
          {
            menu.options.options.map((option, index) =>
              <Option
                key={index}
                index={index}
                currentState={navigation.routes[navigation.index].key}
                navigate={this.navigateTo}
                option={option} />,
            )
          }
        </View>
        <View>
          <TouchableOpacity
            style={styles.callEasternContainer}
            onPress={this.callEastern}>
            <Image
              style={styles.phoneImage}
              source={phone} />
            <Text
              style={styles.callEasternText}>
              Call Eastern
            </Text>
          </TouchableOpacity>
          <View style={[styles.alignRight, { padding: 10 }]}>
            <Text style={styles.version}>Eastern Car Service</Text>
            <Text style={styles.version}>Version {EASTERN_VERSION}</Text>
          </View>
        </View>
      </View>
    )
  }
}

function convertCamelToSpace(text) {
  const formattedText = text.replace(/([A-Z])/g, ' $1')
  return formattedText[0].toUpperCase() + formattedText.slice(1)
}


class Option extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    option: PropTypes.string.isRequired,
    currentState: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.navigate = this.navigate.bind(this)
  }

  navigate() {
    this.props.navigate(this.props.option)
  }

  render() {
    const { option, currentState } = this.props
    const optionStyle =
      currentState === option
      ? styles.selectedOptionContainer
      : styles.optionContainer
    return (
      <TouchableOpacity
        onPress={this.navigate}
        style={optionStyle}>
        <Text
          style={styles.option}>
          {convertCamelToSpace(option)}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: navbarBackground,
    height: Platform.OS === 'android' ? window.height - 30 : window.height,
    paddingTop: 15,
    borderLeftColor: darkLineColor,
    borderLeftWidth: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  optionContainer: {
    borderBottomColor: darkLineColor,
    borderBottomWidth: 1,
    padding: 10,
  },
  selectedOptionContainer: {
    backgroundColor: darkLineColor,
    borderBottomColor: darkLineColor,
    borderBottomWidth: 1,
    padding: 10,
  },
  bottom: {
    alignSelf: 'flex-end',
  },
  image: {
    height: 35,
    width: 35,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  version: {
    color: accentColor,
  },
  option: {
    color: accentColor,
    fontSize: 20,
    padding: 5,
  },
  phoneImage: {
    width: 35,
    height: 35,
  },
  callEasternContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  callEasternText: {
    marginLeft: 15,
    fontSize: 20,
    color: accentColor,
  },
})

function mapStateToProps({ menu, navigation, api }) {
  return { menu, navigation, api }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    navigateTo,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

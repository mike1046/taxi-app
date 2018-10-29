import { Platform } from 'react-native'

// Theme Colors
export const primaryColor = '#0E263B'
export const primaryTransparentColor = '#13364F' // used in input backgrounds
export const accentColor = '#FFD821'
export const darkAccentColor = 'rgba(255,216,33,.5)' // used in switches
export const iconColor = '#55CAB3'
export const placeholderText = 'white'
export const primaryOutlineColor = '#0D2233'
export const darkLineColor = '#223E5F'

// Component Specific Colors
export const navbarBackground = '#194A6C'
export const navbarBorderBottom = '#3E8A8E'
export const generalFontSize = 19

export const buttonTextStyle = {
  color: primaryColor,
  textAlign: 'center',
  fontSize: generalFontSize,
}

export const buttonContainerStyle = {
  backgroundColor: accentColor,
  marginTop: 5,
  marginBottom: 5,
  paddingTop: 10,
  paddingBottom: 10,
  marginLeft: 10,
  marginRight: 10,
}

export const buttonContainerStyleLarge = {
  ...buttonContainerStyle,
  paddingTop: 15,
  paddingBottom: 15,
  marginLeft: 10,
  marginRight: 10,
}

export const androidMarginFix = {
  marginBottom: Platform.OS === 'android' ? 22 : 0,
}
export const lightInput = {
  backgroundColor: 'rgba(255, 255, 255, .3)',
  borderWidth: 0,
  borderColor: 'rgba(255, 255, 255, .3)',
  color: 'black',
}

export const line = {
  marginTop: 5,
  marginBottom: 5,
  marginLeft: 15,
  marginRight: 15,
}

export const textLink = {
  fontSize: generalFontSize,
  textAlign: 'right',
  textDecorationLine: 'underline',
  color: accentColor,
  margin: 5,
}

export const itemGroupLabel = {
  color: 'lightgrey',
  alignSelf: 'center',
  fontSize: 14,
  padding: 10,
}

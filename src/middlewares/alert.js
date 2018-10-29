import { Alert } from 'react-native'
import { ALERT_TEXT } from '../actions/actionTypes'

export default () => next => (action) => {
  const {
    type,
    title,
    message,
  } = action
  if (type === ALERT_TEXT) {
    const button = {
      text: 'OK',
    }
    Alert.alert(title, message, [button])
  }
  next(action)
}


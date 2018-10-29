import { Alert } from 'react-native'
import { ServerResponseException } from '../utils'

export default () => next => (action) => {
  const { error } = action
  if (error && error instanceof Error) {
    const title = 'Error'
    const { message } = error
    const button = { text: 'OK' }
    Alert.alert(title, message, [button])
  } else if (error && error instanceof ServerResponseException) {
    const title = 'Error'
    const { reason } = error
    const button = { text: 'OK' }
    Alert.alert(title, reason, [button])
  }
  next(action)
}


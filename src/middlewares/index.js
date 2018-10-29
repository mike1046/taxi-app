import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import error from './error'
import multi from './multi'
import rememberMe from './rememberMe'
import logger from './logger'
import alert from './alert'

export const sagaMiddleware = createSagaMiddleware()

export default applyMiddleware(
  thunk,
  error,
  alert,
  multi,
  rememberMe,
  sagaMiddleware,
  logger,
)

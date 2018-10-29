/* eslint global-require:0 */
/* eslint react/prefer-stateless-function:0 */

import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import middlewares, { sagaMiddleware } from './middlewares'
import rootSaga from './sagas'
import rootReducer from './reducers'
import Navigation from './containers/Navigation'

function configureStore(initialState) {
  // currently setting initial state at reducer level
  const store = createStore(rootReducer, initialState, middlewares)
  sagaMiddleware.run(rootSaga)
  if (module.hot) {
    // Enable webpack hot module replacement for rootReducer
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}

export default App

import { NavigationExperimental } from 'react-native'
import {
  NAVIGATE_TO,
  NAVIGATE_BACK,
} from '../actions/actionTypes'
import * as routes from '../routes'

const { StateUtils: NavigationStateUtils } = NavigationExperimental

const initialState = {
  index: 0,
  routes: [{
    key: 'Home',
    component: routes.Home,
    viewProps: {},
  }],
}

const routesToResetTo = [
  'Home',
  'BookNow',
  'DriverOnTheWay',
  'ThankYou',
]

export default (state = initialState, action) => {
  const { type, destination, viewProps = {} } = action
  switch (type) {
    case NAVIGATE_TO: {
      const nextScene = {
        key: destination,
        component: routes[destination],
        viewProps,
      }
      // if navigating to current state, don't do anything
      if (destination === state.routes[state.index].key) break
      // if navigating to a previous state in the history,
      // slice route array so the previous state is last
      if (
        NavigationStateUtils.has(state, destination)
        || routesToResetTo.indexOf(destination) !== -1
        || viewProps.shouldResetRoutes
      ) {
        return NavigationStateUtils.reset(state, [nextScene])
      }
      const nextScenes = NavigationStateUtils.push(state, nextScene)
      if (state !== nextScenes) {
        return nextScenes
      }
      break
    }
    case NAVIGATE_BACK: {
      const nextScenes = NavigationStateUtils.pop(state)
      if (state !== nextScenes) {
        return nextScenes
      }
      break
    }
    default:
      return state
  }
  return state
}

export const currentStateKey = state => state.routes[state.index].key

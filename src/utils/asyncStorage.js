/* eslint no-param-reassign:0 */

import { AsyncStorage } from 'react-native'

export function saveAsync(object) {
  const keyValuePairs = Object.keys(object).map(key =>
    [key, JSON.stringify(object[key])],
  )
  return AsyncStorage.multiSet(keyValuePairs)
}

export function loadAsync(arrayOrString) {
  const query = typeof arrayOrString === 'string' ? [arrayOrString] : arrayOrString
  return AsyncStorage.multiGet(query)
    .then((data) => {
      if (data) {
        return data.reduce((accumObj, datum) => {
          accumObj[datum[0]] = JSON.parse(datum[1])
          return accumObj
        }, {})
      }
      throw new Error(`${arrayOrString} was not found`)
    })
}

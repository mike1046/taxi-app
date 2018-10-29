 /* eslint no-empty-function:0 */
 /* eslint func-names:0 */
 /* eslint consistent-return:0 */
 /* eslint no-console:0 */
 /* eslint no-extend-native:0 */

import countryPhoneCodesData from './country_phone_codes.json'
import Raven from 'raven-js'

export function getCountryPhoneCodes() {
  return [...countryPhoneCodesData]
}

export const Generator = (function* () {}).constructor.prototype

export function isGenerator(checking) {
  return checking instanceof Generator
}

export function arrayToGenerator(arr) {
  return (function* () {
    yield* [...arr]
  })()
}

export function objectToGenerator(obj) {
  return (function* () {
    for (const key of Object.keys(obj)) {
      yield [key, obj[key]]
    }
  })()
}

export function formatValueToOption(value) {
  if (value === undefined || value === null) return
  else if (typeof value === 'string') {
    return {
      display: value,
      value,
    }
  } else if (typeof value === 'object') {
    if (value.display) return { ...value }
    return {
      display: '',
      value,
    }
  }
  return {
    display: value.toString(),
    value,
  }
}

export function createOptionsArray(arr) {
  return arr.map(element => formatValueToOption(element))
}

export function getIndexOfGenerator(index, generator) {
  if (!(generator instanceof Generator)) throw new Error('Generator must be provided.')
  if (typeof index !== 'number' || index < 0) return
  for (let x = 0; x < index; x++) generator.next()
  return generator.next(true).value
}

export function delayPromise(ms) {
  return new Promise((resolve, reject) => {
    let id

    function clearingTimeout() {
      clearTimeout(id)
      resolve()
    }

    function settingTimeout() {
      id = setTimeout(() => clearingTimeout(), ms)
    }

    try {
      settingTimeout()
    } catch (e) {
      reject(e)
    }
  })
}

export function polling(action, isComplete, onComplete, onContinue, ms = 500, retries = 5) {
  // action should be a function that returns a new promise
  let decrementedRetries = retries
  if (!decrementedRetries--) throw new Error('Too many retries')
  return action()
    .then((data) => {
      if (isComplete(data)) return onComplete(data)
      onContinue(data)
      return delayPromise(ms)
        .then(() => polling(action, isComplete, onComplete, onContinue, ms))
    })
    .catch((err) => {
      console.log(err)
      return polling(action, isComplete, onComplete, onContinue, ms, decrementedRetries)
    })
}


export function formatDollars(dollars) {
  const roundDollars = Math.round(dollars * 100) / 100
  const dollarString = `${roundDollars}`
  const hasPeriod = dollarString.indexOf('.') > -1
  const components = dollarString.split('.')
  if (!hasPeriod) return `${dollarString}.00`
  if (components[1].length > 1) return dollarString
  else if (components[1].length === 1) return `${dollarString}0`
}

export const formatSeconds = (time) => {
  let hours = Math.floor(time / 3600)
  let minutes = Math.floor((time / 60) - (hours * 60))
  let seconds = time - (hours * 3600) - (minutes * 60)
  if (seconds < 10) seconds = `0${seconds}`
  if (minutes < 10) minutes = `0${minutes}`
  let hourSeparator = ':'
  if (hours === 0) {
    hours = ''
    hourSeparator = ''
  }
  return `${hours}${hourSeparator}${minutes}:${seconds}`
}

export const formatCreditCard = last4 => `xxxx xxxx xxxx ${last4}`

export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1)
}
// 'a_thing' => 'A Thing'
export const formatPricingLabel = (str) => {
  const index = str.indexOf('_')
  if (index > -1) {
    const firstHalf = str.slice(0, index)
    const secondHalf = str.slice(index + 1, str.length)
    return `${capitalize(firstHalf)} ${capitalize(secondHalf)}`
  }
  return capitalize(str)
}

export const getSecondsFromDifference = (recentDate, oldDate) => (
  Math.floor(recentDate - oldDate) / 1000
)

// test a range of string to see if all are letters or all are numbers
export function isRangeOf(type, str, start, end) {
  if (type !== 'letters' && type !== 'numbers') {
    throw new Error(`isRangeOf: Type '${type}' is invalid, must be 'letters' or 'numbers'`)
  }
  for (let i = start; i < end; i++) {
    if (type === 'letters') {
      if (!isNaN(Number(str[i]))) {
        return false
      }
    } else if (type === 'numbers') {
      if (isNaN(Number(str[i]))) {
        return false
      }
    }
  }
  return true
}

// finds the string bit matching format NY 11201 and cuts it up to there
export function trimAddressString(string) {
  const newString = string.split(', ')
  let saveIdx
  newString.forEach((piece, idx) => {
    if (isRangeOf('letters', piece, 0, 2) && isRangeOf('numbers', piece, 3, 8)) {
      saveIdx = idx
    }
  })
  return newString.slice(0, saveIdx).join(', ')
}

export function onChangeCountryCode(countryValue) {
  const {
    id,
    code,
  } = countryValue
  const update = {
    country_id: id,
    country_code: code,
  }
  this.setState(update)
}

// 'Thursday, March 3, 2016, 5:17 PM'
export function formatDate(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  return date.toLocaleString('en-US', options)
}

// es6 polyfill for android
if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement, fromIndex = 0) {
    for (let i = fromIndex; i < this.length; i++) {
      if (this[i] == searchElement) return true
    }
    return false
  }
}

// data manipulation for showing the correct car types
function labelOption(option, type) {
  const dupOption = Object.assign({}, option)
  if (dupOption.id !== 'any') {
    dupOption.display = `${type} ${dupOption.display}`
    dupOption.isPremium = type === 'PREMIUM' // add bool property to display spokes as needed
  }
  return dupOption
}

export function makeCarLists(carOptions) {
  // label each option
  const premiumCarArray = carOptions.map(car => labelOption(car, 'PREMIUM'))
  const ecoCarArray = carOptions.map(car => labelOption(car, 'STANDARD'))
  const allCarsArray = premiumCarArray.reduce((arr, car, i) => {
    if (!['any', 'limo', 'lsuv'].includes(ecoCarArray[i].id)) { // we dont want duplicates
      arr.push(ecoCarArray[i])
    }
    arr.push(premiumCarArray[i])
    return arr
  }, [])

  // return for reference on frontend
  return {
    all: allCarsArray, // the combined list
    eco: ecoCarArray,
    prem: premiumCarArray, // only cars available to premium
  }
}

export function getLocationFromCoordinates(driver) {
  const driverLast = driver.slice(-1)[0]
  return {
    lat: driverLast[0],
    lng: driverLast[1],
  }
}

export function formatRequestAddressForGetEstimates(state) {
  const {
    address,
    lat,
    lng,
  } = state
  return {
    address,
    latlng: `${lat.toString()},${lng.toString()}`,
  }
}

export function formatAllowPetForGetEstimates(pet) {
  switch (pet) {
    case 'Pet Riding Alone (+$40)':
      return 2
    case 'Pet (+$5)':
      return 1
    default:
      return 0
  }
}

export function convertCamelToSpace(text) {
  const formattedText = text.replace(/([A-Z])/g, ' $1')
  return formattedText[0].toUpperCase() + formattedText.slice(1)
}

export class ServerResponseException {
  constructor(jsonResponseError) {
    const {
      error,
      method,
    } = jsonResponseError
    this.method = method
    this.code = error.code
    this.reason = error.reason
    Raven.captureException(error.reason, {
      level: 'info',
      logger: 'api',
      extra: {
        method,
        code: error.code,
      },
    })
  }
}

export function shortenAddress(string) {
  return string.replace('United States', 'USA')
}

// similar to lodash pluck but i wanted to write it myself
export function pickPropertiesFrom(object) {
  return (...props) =>
    props.reduce((obj, prop) =>
      ({
        ...obj,
        [prop]: object[prop],
      })
    , {})
}

// gets the midpoint of two coordinates -- not being used but likely useful
// export function findMidPoint(...coordinates) {
//   const summary = coordinates.reduce((data, point) => {
//     // handles if a point happens to be an undefined
//     if (!point) return data
//     // if point isnt undefiend
//     const newData = data
//     const {
//       lat,
//       lng,
//     } = point
//     const {
//       maxLat,
//       minLat,
//       maxLng,
//       minLng,
//     } = data
//     if (maxLat === null) newData.maxLat = newData.minLat = lat
//     else {
//       newData.maxLat = Math.max(maxLat, lat)
//       newData.minLat = Math.min(minLat, lat)
//     }

//     if (maxLng === null) newData.maxLng = newData.minLng = lng
//     else {
//       newData.maxLng = Math.max(maxLng, lng)
//       newData.minLng = Math.min(minLng, lng)
//     }
//     return newData
//   }, {
//     maxLat: null,
//     minLat: null,
//     maxLng: null,
//     minLng: null,
//   })

//   // return the center point of all the points
//   return {
//     lat: (Math.abs(summary.maxLat - summary.minLat) / 2) + summary.minLat,
//     lng: (Math.abs(summary.maxLng - summary.minLng) / 2) + summary.minLng,
//   }
// }


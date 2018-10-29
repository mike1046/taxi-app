/* eslint no-underscore-dangle: 0 */
/* eslint no-console: 0 */
/* eslint max-len: 0 */
/* eslint react/forbid-prop-types: 0 */

// Almost all of this is identical to the node module,
// but I had to edit a couple lines (and install Qs as a dependency) to let autofill happen.
// Nick
import {
  TextInput,
  View,
  ListView,
  Alert,
  Text,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native'

import React, { Component } from 'react'
import Qs from 'qs'

const defaultStyles = {
  container: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: '#C9C9CE',
    height: 44,
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 7.5,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
  },
  poweredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  powered: {
    marginTop: 15,
  },
  listView: {
    // flex: 1,
  },
  row: {
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 1,
    backgroundColor: '#c8c7cc',
  },
  description: {
  },
  loader: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
  androidLoader: {
    marginRight: -15,
  },
}

const RowLoader = () =>
  <ActivityIndicator
    animating
    size="small" />

const filterResultsByTypes = (responseJSON, types) => {
  if (types.length === 0) return responseJSON.results

  const results = []
  for (let i = 0; i < responseJSON.results.length; i += 1) {
    let found = false
    for (let j = 0; j < types.length; j += 1) {
      if (responseJSON.results[i].types.indexOf(types[j]) !== -1) {
        found = true
        break
      }
    }
    if (found === true) {
      results.push(responseJSON.results[i])
    }
  }
  return results
}

class GooglePlacesAutocomplete extends Component {

  constructor(props) {
    super(props)
    this._results = []
    this._requests = []

    this.state = this._getInitialState()

    this._onFocus = this._onFocus.bind(this)
    this._onBlur = this._onBlur.bind(this)
    this._renderRow = this._renderRow.bind(this)
    this._onChangeText = this._onChangeText.bind(this)
    this._disableRowLoaders = this._disableRowLoaders.bind(this)
    this._requestNearby = this._requestNearby.bind(this)
    this._request = this._request.bind(this)
    this._getInitialState = this._getInitialState.bind(this)
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._abortRequests()
    this._isMounted = false
  }

  getCurrentLocation() {
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this._requestNearby(position.coords.latitude, position.coords.longitude)
      },
      (error) => {
        this._disableRowLoaders()
        Alert.alert(error.message)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    )
  }

  _getInitialState() {
    const ds = new ListView.DataSource({ rowHasChanged: function rowHasChanged(r1, r2) {
      if (typeof r1.isLoading !== 'undefined') {
        return true
      }
      return r1 !== r2
    } })
    return {
      text: this.props.getDefaultValue(),
      dataSource: ds.cloneWithRows(this.buildRowsFromResults([])),
      listViewDisplayed: false,
    }
  }

  _abortRequests() {
    for (let i = 0; i < this._requests.length; i += 1) {
      this._requests[i].abort()
    }
    this._requests = []
  }

  /**
   * This method is exposed to parent components to focus on textInput manually.
   * @public
   */
  triggerFocus() {
    if (this.textInputRef) this.textInputRef.focus()
  }

  /**
   * This method is exposed to parent components to blur textInput manually.
   * @public
   */
  triggerBlur() {
    if (this.textInputRef) this.textInputRef.blur()
  }


  buildRowsFromResults(results) {
    let res = null

    if (results.length === 0 || this.props.predefinedPlacesAlwaysVisible === true) {
      res = [...this.props.predefinedPlaces]
      if (this.props.currentLocation === true) {
        res.unshift({
          description: this.props.currentLocationLabel,
          isCurrentLocation: true,
        })
      }
    } else {
      res = []
    }

    res = res.map(place =>
      ({
        ...place,
        isPredefinedPlace: true,
      }),
    )

    return [...res, ...results]
  }

  _enableRowLoader(rowData) {
    const rows = this.buildRowsFromResults(this._results)
    for (let i = 0; i < rows.length; i += 1) {
      if (
        (rows[i].place_id === rowData.place_id) || (rows[i].isCurrentLocation === true && rowData.isCurrentLocation === true)) {
        rows[i].isLoading = true
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(rows),
        })
        break
      }
    }
  }

  _disableRowLoaders() {
    if (this._isMounted) {
      for (let i = 0; i < this._results.length; i += 1) {
        if (this._results[i].isLoading === true) {
          this._results[i].isLoading = false
        }
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.buildRowsFromResults(this._results)),
      })
    }
  }

  _onPress(_rowData, appendNear) {
    const rowData = Object.assign({}, _rowData)
    if (rowData.isPredefinedPlace !== true && this.props.fetchDetails === true) {
      if (rowData.isLoading === true) {
        // already requesting
        return
      }

      this._abortRequests()

      // display loader
      this._enableRowLoader(rowData)

      // fetch details
      const request = new XMLHttpRequest()
      this._requests.push(request)
      request.timeout = this.props.timeout
      request.ontimeout = this.props.onTimeout
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return
        }
        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText)
          if (responseJSON.status === 'OK') {
            if (this._isMounted) {
              const details = responseJSON.result
              this._disableRowLoaders()
              this._onBlur()

              this.setState({
                text: rowData.description,
              })

              delete rowData.isLoading

              if (appendNear) {
                rowData.formatted_address = `Near ${rowData.formatted_address}`
                details.formatted_address = `Near ${details.formatted_address}`
              }

              this.props.onPress(rowData, details)
            }
          } else {
            this._disableRowLoaders()
            console.warn(`google places autocomplete: '${responseJSON.status}`)
          }
        } else {
          this._disableRowLoaders()
          console.warn('google places autocomplete: request could not be completed or has been aborted')
        }
      }
      const urlParams = Qs.stringify({
        key: this.props.query.key,
        placeid: rowData.place_id,
        language: this.props.query.language,
      })
      request.open('GET', `https://maps.googleapis.com/maps/api/place/details/json?${urlParams}`)
      request.send()
    } else if (rowData.isCurrentLocation === true) {
      // display loader
      this._enableRowLoader(rowData)

      this.setState({
        text: rowData.description,
      })
      this.triggerBlur() // hide keyboard but not the results

      delete rowData.isLoading

      this.getCurrentLocation()
    } else {
      this.setState({
        text: rowData.description,
      })

      this._onBlur()

      delete rowData.isLoading

      const predefinedPlace = this._getPredefinedPlace(rowData)

      // sending predefinedPlace as details for predefined places
      this.props.onPress(predefinedPlace, predefinedPlace)
    }
  }

  _getPredefinedPlace(rowData) {
    if (rowData.isPredefinedPlace !== true) {
      return rowData
    }
    for (let i = 0; i < this.props.predefinedPlaces.length; i += 1) {
      if (this.props.predefinedPlaces[i].description === rowData.description) {
        return this.props.predefinedPlaces[i]
      }
    }
    return rowData
  }

  _requestNearby(latitude, longitude) {
    this._abortRequests()
    let results = []
    if (latitude !== undefined && longitude !== undefined && latitude !== null && longitude !== null) {
      const request = new XMLHttpRequest()
      this._requests.push(request)
      request.timeout = this.props.timeout
      request.ontimeout = this.props.onTimeout
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return
        }
        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText)

          this._disableRowLoaders()

          if (typeof responseJSON.results !== 'undefined') {
            if (this._isMounted) {
              if (this.props.nearbyPlacesAPI === 'GoogleReverseGeocoding') {
                results = filterResultsByTypes(responseJSON, this.props.filterReverseGeocodingByTypes)
              } else {
                results = responseJSON.results
              }
              if (this.props.autoFillFirstResult) {
                results[0].fromAutofill = true
                this._onPress(results[0], true)
              } else {
                this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(this.buildRowsFromResults(results)),
                })
              }
            }
          }
          if (typeof responseJSON.error_message !== 'undefined') {
            console.warn(`google places autocomplete: ${responseJSON.error_message}`)
          }
        } else {
          // console.warn("google places autocomplete: request could not be completed or has been aborted");
        }
      }

      let url = ''
      if (this.props.nearbyPlacesAPI === 'GoogleReverseGeocoding') {
        // your key must be allowed to use Google Maps Geocoding API
        const urlParams = Qs.stringify({
          latlng: `${latitude},${longitude}`,
          key: this.props.query.key,
          ...this.props.GoogleReverseGeocodingQuery,
        })
        url = `https://maps.googleapis.com/maps/api/geocode/json?${urlParams}`
      } else {
        const urlParams = Qs.stringify({
          latlng: `${latitude},${longitude}`,
          key: this.props.query.key,
          ...this.props.GoogleReverseGeocodingQuery,
        })
        url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${urlParams}`
      }

      request.open('GET', url)
      request.send()
    } else {
      this._results = []
      if (this.props.autoFillFirstResult) {
        results[0].fromAutofill = true
        this._onPress(results[0], true)
      } else {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.buildRowsFromResults([])),
        })
      }
    }
  }

  _request(text) {
    this._abortRequests()
    if (text.length >= this.props.minLength) {
      const request = new XMLHttpRequest()
      this._requests.push(request)
      request.timeout = this.props.timeout
      request.ontimeout = this.props.onTimeout
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return
        }
        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText)
          if (typeof responseJSON.predictions !== 'undefined') {
            if (this._isMounted) {
              this._results = responseJSON.predictions
              this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.buildRowsFromResults(responseJSON.predictions)),
              })
            }
          }
          if (typeof responseJSON.error_message !== 'undefined') {
            console.warn(`google places autocomplete: ${responseJSON.error_message}`)
          }
        } else {
          // console.warn("google places autocomplete: request could not be completed or has been aborted");
        }
      }
      request.open('GET', `https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=${encodeURI(text)}&${Qs.stringify(this.props.query)}`)
      request.send()
    } else {
      this._results = []
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.buildRowsFromResults([])),
      })
    }
  }
  _onChangeText(text) {
    this._request(text)
    this.setState({
      text,
      listViewDisplayed: true,
    })
  }

  _renderLoader(rowData) {
    if (rowData.isLoading === true) {
      return (
        <View
          style={[defaultStyles.loader, this.props.styles.loader]} >
          <RowLoader />
        </View>
      )
    }
    return null
  }

  _renderRow(_rowData = {}) {
    const rowData = Object.assign({}, _rowData)
    rowData.description = rowData.description || rowData.formatted_address || rowData.name

    return (
      <TouchableHighlight
        onPress={() =>
          this._onPress(rowData)
        }
        underlayColor="#c8c7cc" >
        <View>
          <View style={[defaultStyles.row, this.props.styles.row, rowData.isPredefinedPlace ? this.props.styles.specialItemRow : {}]}>
            <Text
              style={[{ flex: 1 }, defaultStyles.description, this.props.styles.description, rowData.isPredefinedPlace ? this.props.styles.predefinedPlacesDescription : {}]}
              numberOfLines={1} >
              {rowData.description}
            </Text>
            {this._renderLoader(rowData)}
          </View>
          <View style={[defaultStyles.separator, this.props.styles.separator]} />
        </View>
      </TouchableHighlight>
    )
  }

  _onBlur() {
    this.triggerBlur()
    this.setState({ listViewDisplayed: false })
  }

  _onFocus() {
    this.setState({ listViewDisplayed: true })
  }

  _getListView() {
    if ((this.state.text !== '' || this.props.predefinedPlaces.length || this.props.currentLocation === true) && this.state.listViewDisplayed === true) {
      return (
        <ListView
          keyboardShouldPersistTaps
          keyboardDismissMode="on-drag"
          style={[defaultStyles.listView, this.props.styles.listView]}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          enableEmptySections
          automaticallyAdjustContentInsets={false}
          {...this.props} />
      )
    }

    if (this.props.enablePoweredByContainer) {
      console.warn('sorry, this hacked together clone doesn\'t use the powered by container')
    }

    return null
  }

  render() {
    const { onChangeText, onFocus, ...userProps } = this.props.textInputProps
    return (
      <View
        style={[defaultStyles.container, this.props.styles.container]} >
        <View
          style={[defaultStyles.textInputContainer, this.props.styles.textInputContainer]} >
          <TextInput
            {...userProps}
            ref={(c) => { this._textInputRef = c }}
            autoFocus={this.props.autoFocus}
            style={[defaultStyles.textInput, this.props.styles.textInput]}
            onChangeText={onChangeText ? (text) => { this._onChangeText(text); onChangeText(text) } : this._onChangeText}
            value={this.state.text}
            placeholder={this.props.placeholder}
            onFocus={onFocus ? () => { this._onFocus(); onFocus() } : this._onFocus}
            clearButtonMode="while-editing" />
        </View>
        {this._getListView()}
      </View>
    )
  }
}

GooglePlacesAutocomplete.propTypes = {
  placeholder: React.PropTypes.string,
  onPress: React.PropTypes.func,
  minLength: React.PropTypes.number,
  fetchDetails: React.PropTypes.bool,
  autoFocus: React.PropTypes.bool,
  getDefaultValue: React.PropTypes.func,
  timeout: React.PropTypes.number,
  onTimeout: React.PropTypes.func,
  query: React.PropTypes.object,
  GoogleReverseGeocodingQuery: React.PropTypes.object,
  GooglePlacesSearchQuery: React.PropTypes.object,
  styles: React.PropTypes.object,
  textInputProps: React.PropTypes.object,
  enablePoweredByContainer: React.PropTypes.bool,
  predefinedPlaces: React.PropTypes.array,
  currentLocation: React.PropTypes.bool,
  currentLocationLabel: React.PropTypes.string,
  nearbyPlacesAPI: React.PropTypes.string,
  filterReverseGeocodingByTypes: React.PropTypes.array,
  predefinedPlacesAlwaysVisible: React.PropTypes.bool,
  autoFillFirstResult: React.PropTypes.bool,
}

GooglePlacesAutocomplete.defaultProps = {
  placeholder: 'Search',
  onPress: () => {},
  minLength: 0,
  fetchDetails: false,
  autoFocus: false,
  getDefaultValue: () => '',
  timeout: 20000,
  onTimeout: () => console.warn('google places autocomplete: request timeout'),
  query: {
    key: 'missing api key',
    language: 'en',
    types: 'geocode',
  },
  GoogleReverseGeocodingQuery: {
  },
  GooglePlacesSearchQuery: {
    rankby: 'distance',
    types: 'food',
  },
  styles: {
  },
  textInputProps: {},
  enablePoweredByContainer: false,
  predefinedPlaces: [],
  currentLocation: false,
  currentLocationLabel: 'Current location',
  nearbyPlacesAPI: 'GooglePlacesSearch',
  filterReverseGeocodingByTypes: [],
  predefinedPlacesAlwaysVisible: false,
  autoFillFirstResult: false,
}

module.exports = { GooglePlacesAutocomplete }

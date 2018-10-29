import React, { PropTypes, Component } from 'react'
import {
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  View,
  Dimensions,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import { searchAPIThunk, showLoader } from '../actions/autocomplete'

import {
  buttonContainerStyle,
  buttonTextStyle,
  primaryColor,
} from '../styles'

const { height } = Dimensions.get('window')

class Autocomplete extends Component {
  static propTypes = {
    onPressResult: PropTypes.func,
    type: PropTypes.oneOf(['airports', 'airlines']).isRequired,
    state: PropTypes.object.isRequired,
    modalHide: PropTypes.func.isRequired,
    searchAPIThunk: PropTypes.func.isRequired,
    placeholderText: PropTypes.string,
    rowComponent: PropTypes.func,
  }

  static defaultProps = {
    placeholderText: 'Search',
  }

  constructor(props) {
    super(props)
    this.onRowPress = this.onRowPress.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.callCloseModal = this.callCloseModal.bind(this)
  }

  componentDidMount() {
    this.searchField.focus()
  }

  onRowPress(evt, val) {
    this.callCloseModal()
    if (this.props.onPressResult) {
      this.props.onPressResult(val)
    }
  }


  onChangeText(val) {
    const { state: { user }, type } = this.props
    this.props.searchAPIThunk(val, user, type)
  }

  callCloseModal() {
    this.props.modalHide()
  }

  render() {
    const {
      type,
      state: { autocomplete },
      placeholderText,
      rowComponent: Row,
    } = this.props
    const results = autocomplete[type]
    return (
      <View
        style={{
          backgroundColor: primaryColor,
          flex: 1,
          height: height * 0.8,
        }} >
        <TextInput
          ref={(ref) => { this.searchField = ref }}
          style={{ height: 40, backgroundColor: 'white', paddingLeft: 10, margin: 15, marginBottom: 0 }}
          onChangeText={debounce(this.onChangeText, 100)}
          placeholder={placeholderText}
          clearButtonMode="while-editing" />
        <ScrollView style={{ height: 400 }} >
          {
            results && results.map((result, i) =>
              <TouchableOpacity
                key={i}
                onPress={evt => this.onRowPress(evt, result)} >
                <Row data={result} />
              </TouchableOpacity>,
            )
          }
        </ScrollView>
        <TouchableOpacity style={buttonContainerStyle} onPress={this.callCloseModal}>
          <Text style={buttonTextStyle}>Close</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


function mapStateToProps(state) {
  return { state }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    searchAPIThunk,
    showLoader,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete)

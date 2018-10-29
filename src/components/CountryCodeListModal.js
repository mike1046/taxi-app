import React, {
  Component,
  PropTypes,
} from 'react'
import {
  Dimensions,
  View,
  ListView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import { countryPhoneCodesOptions } from '../api/data'
import {
  buttonContainerStyleLarge,
  buttonTextStyle,
  generalFontSize,
  navbarBackground,
  darkLineColor,
} from '../styles'

const { height } = Dimensions.get('window')

function formatCountryCodes(options) {
  return options.map(option => ({
    id: option.country_codes_id,
    code: option.code,
    name: option.country_name,
  }))
}

class CountryCodeListModal extends Component {
  constructor(props) {
    super(props)
    const countryCodes = formatCountryCodes(countryPhoneCodesOptions)
    const data = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    const datasource = data.cloneWithRows(countryCodes)
    this.renderRow = this.renderRow.bind(this)
    this.modalHide = props.modalHide.bind(this)
    this.state = {
      datasource,
    }
  }

  pressRowHandler(value) {
    const { onPress } = this.props
    onPress(value)
    this.modalHide()
  }

  renderRow(rowData) {
    const {
      code,
      name,
    } = rowData
    return (
      <TouchableHighlight onPress={() => this.pressRowHandler(rowData)}>
        <View style={styles.row}>
          <Text style={[styles.rowPart, styles.text]}>
            {code}
          </Text>
          <Text
            numberOfLines={2}
            style={[styles.rowPart, styles.text]}>
            {name}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const { datasource } = this.state
    const HeaderComponent = (
      <View
        style={[
          styles.row,
          styles.borderBottom,
        ]}>
        <Text style={[styles.rowPart, styles.text]}>
          Code
        </Text>
        <Text style={[styles.rowPart, styles.text]}>
          Country Name
        </Text>
      </View>
    )
    return (
      <View style={styles.container}>
        {HeaderComponent}
        <View style={styles.list}>
          <ListView
            dataSource={datasource}
            enableEmptySections
            renderRow={this.renderRow}
            renderSeparator={(sectionID, rowID) =>
              <View key={`${sectionID}-${rowID}`} style={styles.separator} />
            } />
        </View>
        <View>
          <TouchableOpacity
            style={buttonContainerStyleLarge}
            onPress={this.modalHide} >
            <Text style={buttonTextStyle}>
              CANCEL
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

CountryCodeListModal.propTypes = {
  modalHide: PropTypes.func,
  onPress: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: navbarBackground,
    height: height * 0.8,
    paddingTop: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 2,
  },
  rowPart: {
    marginLeft: 2,
    marginRight: 2,
    paddingTop: 6,
    paddingBottom: 6,
  },
  text: {
    fontSize: generalFontSize,
    color: 'white',
  },
  separator: {
    borderColor: darkLineColor,
    borderWidth: 1,
  },
  list: {
    flex: 1,
  },
  country: {
    flex: 1,
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderColor: darkLineColor,
  },
})


export default CountryCodeListModal

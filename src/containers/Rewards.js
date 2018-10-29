import React, { PropTypes, Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  generalFontSize,
  itemGroupLabel,
} from '../styles'
import { alertText } from '../actions/modal'
import Coupon from '../components/Coupon'
import RewardsProgressBar from '../components/RewardsProgressBar'

const itemGroupLabelConfined = {
  ...itemGroupLabel,
  padding: 0,
}


class Rewards extends Component {
  constructor() {
    super()
    this.moreInfoPopup = this.moreInfoPopup.bind(this)
  }

  moreInfoPopup() {
    this.props.alertText('Eastern Rewards', 'Earn 1 point for every dollar spent on your fare. Recieve a $5 reward when you reach 200 points!')
  }

  render() {
    const {
      percentage,
      points,
      coupons,
    } = this.props
    return (
      <View style={styles.content} >
        <View style={styles.progressContainer}>
          <Text style={[itemGroupLabelConfined]} >YOUR REWARDS POINTS:</Text>
          <TouchableOpacity onPress={this.moreInfoPopup}>
            <Text style={[itemGroupLabelConfined, styles.info]}>(more info)</Text>
          </TouchableOpacity>
        </View>
        <RewardsProgressBar
          total={200}
          currentPoints={points}
          currentPercentage={percentage} />
        <ScrollView>
          {
            Object.keys(coupons).map(key => <Coupon key={key} {...coupons[key]} />)
          }
        </ScrollView>
      </View>
    )
  }
}

Rewards.propTypes = {
  percentage: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  coupons: PropTypes.object.isRequired,
  alertText: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    flex: 100,
    justifyContent: 'space-between',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: generalFontSize,
  },
  info: {
    paddingLeft: 2,
    color: 'darkgrey',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
})

function mapStateToProps({ rewards: { percentage, points, coupons } }) {
  const props = { percentage, points, coupons }
  return props
}

function mapDispatchToProps(dispatch) {
  const actions = {
    alertText,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rewards)

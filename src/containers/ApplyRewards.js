import React, { PropTypes } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Coupon from '../components/Coupon'
import { generalFontSize } from '../styles'
import RewardActions, { validRewards } from '../redux/RewardRedux'

const ApplyRewards = ({
  validRewards,
  applyRewardRequest,
}) =>
  <View style={styles.content}>
    <ScrollView>
      {
        validRewards.map(
          ({
            coupons_name,
            coupons_value,
            coupons_id,
            coupons_condition,
            coupons_expires,
            effective_date,
          }) =>
            <Coupon
              key={coupons_id}
              coupons_name={coupons_name}
              coupons_value={coupons_value}
              coupons_condition={coupons_condition}
              coupons_expires={coupons_expires}
              effective_date={effective_date}
              onPress={() => applyRewardRequest(coupons_id)} />,
        )
      }
    </ScrollView>
  </View>

ApplyRewards.propTypes = {
  validRewards: PropTypes.arrayOf(PropTypes.shape({
    coupons_name: PropTypes.string.isRequired,
    coupons_value: PropTypes.number.isRequired,
    coupons_id: PropTypes.string.isRequired,
  })),
  applyRewardRequest: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    flex: 100,
    justifyContent: 'space-between',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: 'white',
    fontSize: generalFontSize,
  },
})

function mapStateToProps(state) {
  const props = { validRewards: validRewards(state) }
  return props
}

function mapDispatchToProps(dispatch) {
  const actions = { applyRewardRequest: RewardActions.applyRewardRequest }
  return { ...bindActionCreators(actions, dispatch) }
}


export default connect(mapStateToProps, mapDispatchToProps)(ApplyRewards)

import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import moment from 'moment'
import { darkLineColor, accentColor } from '../styles'
import { trimAddressString } from '../utils'
import CarImage from './CarImage'
import { carOptions, jobStatuses } from '../api/data'

function showLabel(job) {
  if (job.job_status !== 4 && job.job_status !== 8) {
    return jobStatuses[job.job_status].description
  } else if (job.driver_no) {
    return `Driver ID ${job.driver_no}`
  }
  return 'No Driver Information'
}

class JobRow extends Component {
  constructor(props) {
    super(props)
    this.viewReceipt = this.viewReceipt.bind(this)
  }

  viewReceipt() {
    const {
      getReceiptThunk,
      user: {
        email,
        password,
        location,
      },
      job,
    } = this.props
    getReceiptThunk(email, password, job.job_no, location)
  }

  render() {
    const { job } = this.props
    return (
      <TouchableOpacity
        onPress={this.viewReceipt}
        style={styles.listItem}>
        <CarImage
          resizeMode={'contain'}
          type={carOptions[job.car_type || 0].id}
          style={styles.car} />
        <View style={styles.vertical}>
          <View style={[styles.horizontal, styles.spread]}>
            <Text style={[styles.emphasis, styles.header]}>
              {showLabel(job)}
            </Text>
            <Text style={[styles.emphasis, styles.header]}>
              ${job.total}
            </Text>
          </View>
          <View style={styles.horizontal}>
            {
              moment(job.pickup_time).isAfter(moment())
              ? <Text style={styles.scheduledPickupTimeText}>
                {`Scheduled for ${moment(job.pickup_time).format('MMMM Do YYYY, h:mm a')}`}
              </Text>
              : <Text style={styles.text}>
                {moment(job.pickup_time).format('MMMM Do YYYY, h:mm a')}
              </Text>
            }
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.emphasis}>PICKUP: </Text>
            <Text style={styles.text}>
              {trimAddressString(job.pickup.address).toUpperCase()}
            </Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.emphasis}>DESTINATION: </Text>
            <Text style={styles.text}>
              {trimAddressString(job.destination.address).toUpperCase()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

JobRow.propTypes = {
  getReceiptThunk: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: darkLineColor,
    padding: 5,
  },
  car: {
    width: 40,
    resizeMode: 'contain',
    marginLeft: 10,
    marginRight: 10,
  },
  vertical: {
    flex: 1,
    flexDirection: 'column',
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    padding: 2,
    flexWrap: 'nowrap',
  },
  spread: {
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 14,
    flex: 2,
  },
  header: {
    fontSize: 18,
  },
  emphasis: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scheduledPickupTimeText: {
    color: accentColor,
    fontSize: 14,
  },
})
export default JobRow

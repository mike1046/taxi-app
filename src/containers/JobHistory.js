import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { navbarBackground, accentColor } from '../styles'
import JobRow from '../components/JobRow'
import { getJobListThunk } from '../actions/user'
import { getReceiptThunk } from '../actions/receipt'

class JobHistory extends Component {
  componentWillMount() {
    const {
      user,
      getJobListThunk,
    } = this.props
    const {
      email,
      password,
    } = user
    getJobListThunk(email, password)
  }

  render() {
    const { user } = this.props
    const { job_list = [] } = user
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {
          job_list.length > 0
          ? job_list.map(job =>
            <JobRow
              key={job.job_no}
              job={job}
              getReceiptThunk={this.props.getReceiptThunk}
              navigator={navigator}
              user={user} />,
          )
          : <Text style={styles.text}>You haven't gone on any rides yet!</Text>
        }
      </ScrollView>
    )
  }
}

JobHistory.propTypes = {
  getJobListThunk: PropTypes.func.isRequired,
  getReceiptThunk: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: navbarBackground,
  },
  text: {
    padding: 10,
    fontSize: 18,
    color: accentColor,
  },
})

function mapStateToProps({ user }) {
  return { user }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    getReceiptThunk,
    getJobListThunk,
  }
  return { ...bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobHistory)

import React, { Component } from 'react'
import EtaDisplay from './EtaDisplay'

class EtaIncrementer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      int: undefined,
    }
  }

  componentWillMount() {
    this.setState({ int: setInterval(() => this.tick(), 1000) })
  }

  componentWillUnmount() {
    const int = clearInterval(this.state.int)
    this.setState({ int })
  }

  tick() {
    this.setState({ time: this.state.time + 1 })
  }

  render() {
    const { time } = this.state
    return (
      <EtaDisplay seconds={time} />
    )
  }

}

export default EtaIncrementer

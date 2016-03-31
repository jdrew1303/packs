import React from 'react'
import xorshift from 'xorshift'
import { declare, type } from '../../'

class Bernoulli extends React.Component {
  static propTypes = {
    variable: declare(type.string),
    p: declare(type.number)
  }

  static defaultProps = {
    variable: 'coin',
    p: 0.5
  }

  static simulate ({ variable, p }) {
    return {
      [variable]: xorshift.random() > (1 - p)
    }
  }

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    const { variable, p, push } = this.props
    push({
      [variable]: xorshift.random() > (1 - p)
    })
  }

  render () { return <div></div> }
}

export default Bernoulli
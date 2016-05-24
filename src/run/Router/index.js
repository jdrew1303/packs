import React from 'react'
import _ from 'lodash'
import Container from '../Container'
import Simulate from '../Simulate'

export default class Router extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.setState(
      _(location.search.slice(1).split('&'))
        .map((item) => item.split('='))
        .object()
        .value()
    )
  }

  render () {
    const { simulate } = this.state
    const { survey, modules } = this.props
    if (simulate) {
      return (
        <Simulate survey={survey} modules={modules} n={simulate} />
      )
    } else {
      return <Container survey={survey} modules={modules} />
    }
  }
}

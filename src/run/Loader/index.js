import React, { PropTypes } from 'react'
import _ from 'lodash'
import echo from '../../global/services/echo'

class Loader extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      component: null,
      componentProps: {}
    }
    this.loadComponent = this.loadComponent.bind(this)
  }

  assignProps (params, table) {
    return _(params)
      .map((v, k) => [k, echo(v, table)])
      .object()
      .value()
  }

  loadComponent () {
    const { modules, params, table } = this.props
    if (params.type) {
      const component = modules[params.type]
      component.defaultProps = component.defaultProps || {}
      const componentProps = this.assignProps({ ...component.defaultProps, ...params }, table)
      this.setState({ component, componentProps })
    }
  }

  componentDidMount () {
    this.loadComponent()
  }

  componentWillReceiveProps (nextProps) {
    const { index, params, table } = nextProps
    let tableDiff = !_.isEqual(table, this.props.table)
    let paramsDiff = !_.isEqual(params, this.props.params)
    if (index !== this.props.index || tableDiff || paramsDiff) {
      this.setState({ component: null }, () => {
        this.loadComponent()
      })
    }
  }

  render () {
    const { push, reinsert, table, index } = this.props
    const Component = this.state.component
    const componentProps = {
      ...this.state.componentProps,
      push,
      reinsert,
      table,
      index
    }
    console.log('c props', componentProps)
    return Component &&
    <Component {...componentProps} key={index} />
  }
}

export default Loader

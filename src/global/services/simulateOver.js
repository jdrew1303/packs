import http from 'superagent'
import _ from 'lodash'
import echo from './echo'

function assignProps (params, table) {
  return  _(params)
    .map((v, k) => [k, echo(v, table)])
    .object()
    .value()
}

function simulateOver (table, screens, modules, index=0) {
  if (!screens.length) {
    return table
  } else {
    const component = modules[screens[0].type]
    component.defaultProps = component.defaultProps || {}
    const props = {
      ...assignProps(component.defaultProps, table),
      ...assignProps(screens[0], table)
    }
    const simulated = component.simulate({ ...props, index })
    return simulateOver({...table, ...simulated}, screens.slice(1), modules, index + 1)
  }
}

export default simulateOver

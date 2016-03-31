import http from 'superagent'
import _ from 'lodash'
import echo from './echo'

function assignProps (params, table) {
  return  _(params)
    .map((v, k) => [k, echo(v, table)])
    .object()
    .value()
}

function simulateOver (table, queue, modules, index=0) {
  if (!queue.length) {
    return table
  } else {
    const component = modules[queue[0].type]
    component.defaultProps = component.defaultProps || {}
    const props = { 
      ...component.defaultProps,
      ...assignProps(queue[0], table)
    }
    const simulated = component.simulate({ ...props, index })
    console.log('simulated', props, simulated)
    return simulateOver({...table, ...simulated}, queue.slice(1), modules, index + 1)
  }
}

export default simulateOver
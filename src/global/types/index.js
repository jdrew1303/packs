import type from './statics'
import _ from 'lodash'

const declare = (t) => {
  return (props, propName, componentName) => {
    if (!props) {
      return t
    } else if (!t.validate(props[propName])) {
      return new Error(`${propName} of ${componentName} does not validate.`)
    }
  }
}

export default {
  declare,
  type
}
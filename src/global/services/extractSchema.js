import load from './lazy'
import _ from 'lodash'

export default params => {
  const Component = load(params.type)
  const schema = _(Component.propTypes)
    .map((pType, pName) => {
      if (!pType(false)) {
        console.error(`${pName} property must define schema!!`)
      } else {
        return [pName, pType(false).schema]
      }
    })
    .object()
    .value()

  return schema
}
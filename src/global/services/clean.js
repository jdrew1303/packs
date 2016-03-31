import { DOM, createFactory } from 'react'

let Clean = function (component) {
  return function (props, children) {
    return createFactory(component)({ ...props, children })
  }
}

for (let elem in DOM) {
  Clean[elem] = function (props, children) {
    return DOM[elem]({ ...props, children })
  }
}

export default Clean
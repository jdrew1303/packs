import _ from 'lodash'

function echo (param, table) {
  switch (true) {
    case Array.isArray(param):
      return param.map(p => echo(p, table))

    case typeof param === 'object':
      return _(param)
        .map((v, k) => [k, echo(v, table)])
        .object()
        .value()

    case /^\\\$.+/.test(param):
      return param.substring(1)

    case /\$\(.+\)/.test(param):
      const nested = param
        .replace(/\$\((.+)\)/, (m, p1) => echo(`$${p1}`, table))
      return echo(nested, table) === '404' ?
        `!${param}` : echo(nested, table)

    case /^\$.+/.test(param):
      return echo(table[param.substring(1)], table) === '404' ?
        `!${param}` : echo(table[param.substring(1)], table)

    case typeof param === 'undefined':
      return '404'

    default:
      return param
  }
}

export default echo
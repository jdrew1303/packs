import fs from 'fs'
import simulateOver from './global/services/simulateOver'
import _ from 'lodash'
import json2csv from 'json2csv'

require.extensions['.md'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8')
}

export default (survey, modules) => {
  const { table, screens } = require(`${process.cwd()}/${survey}`)
  const data = _.range(100)
    .map(() => simulateOver(table, screens, require(`${process.cwd()}/${modules}`)))

  json2csv({ data, fields: Object.keys(data[0]) }, (err, csv) => {
    console.log(csv)
  })
}

import simulateOver from './global/services/simulateOver'
import _ from 'lodash'
import json2csv from 'json2csv'

export default (survey, modules) => {
  const { table, queue } = require(`${process.cwd()}/${survey}`)
  const data = _.range(100)
    .map(() => simulateOver(table, queue, require(`${process.cwd()}/${modules}`)))
  
  json2csv({ data, fields: Object.keys(data[0]) }, (err, csv) => {
    console.log(csv)
  })
}
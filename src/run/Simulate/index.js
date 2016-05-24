import React from 'react'
import _ from 'lodash'
import json2csv from 'json2csv'
import simulateOver from '../../global/services/simulateOver'

export default class Simulate extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    const { survey, modules, n } = this.props
    const { table, screens } = survey

    const data = _.range(Number(n))
      .map(() => simulateOver(table, screens, modules))

    json2csv({ data, fields: Object.keys(data[0]) }, (err, csv) => {
      this.setState({ data, csv })
    })
  }

  render () {
    const { csv } = this.state
    const { survey, n } = this.props
    return (
      <div>
        <a
          href={`data:text/csv;charset=utf-8, ${encodeURI(csv)}`}
          download={`${survey.table.surveyVersion}.${n}.csv`}
          target="_blank"
        >Download CSV</a>
        <pre>
        {
          csv
        }
        </pre>
      </div>
    )
  }
}

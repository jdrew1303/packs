import React from 'react'
import Radium from 'radium'

import Button from '../../global/components/Button'

@Radium
class Table extends React.Component {
  constructor (props) {
    super(props)
    this.state = { data: props.data || {} }
  }

  componentWillReceiveProps (props) {
    this.setState({
      table: Object.keys(props.data)
        .map((k) => [k, props.data[k]])
    })
  }

  render () {
    const { props, state } = this
    return (
      <div style={[styles.main]}>
        <div style={[styles.fixed]}>
          <Button
            color="#333"
            border="#333"
            background="#000"
            hover={{
              color: '#000',
              background: '#333'
            }}
            text="↻"
            modStyle={{
              marginTop: 5,
              marginRight: 10,
              marginBottom: 5,
              marginLeft: 10,
            }}
            handler={() => {
              props.set(_.object(state.table))
            }}
          />
        </div>
        <table style={[styles.table]}>
          <tbody>
          {
            state.table &&
            state.table
              .map((a, i) => (
                <tr key={i}>
                  <td style={[styles.cell]}>
                    <input
                      type="text"
                      style={[styles.input]}
                      defaultValue={a[0]}
                    />
                  </td>
                  <td style={[styles.cell]}>
                    <input
                      type="text"
                      style={[styles.input]}
                      defaultValue={a[1]}
                      onChange={(e) => {
                        state.table[i][1] = e.target.value
                        this.setState({ table: state.table })
                      }}
                    />
                  </td>
                </tr>
              ))
          }
          </tbody>
        </table>
      </div>
    )
  }
}

const styles = {
  fixed: {
    background: '#000',
    position: 'fixed',
    top: 0,
    paddingTop: 15
  },
  table: {
    fontFamily: 'Courier',
    fontSize: '0.75em',
    borderSpacing: 0,
    marginTop: 60
  },
  cell: {
    borderTop: '1px solid #333',
    paddingTop: '0.5rem',
    paddingRight: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '0.5rem',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    width: '50%'
  },
  input: {
    fontFamily: 'Courier',
    fontSize: '1em',
    color: '#333',
    background: '#000',
    border: 'none',
    width: '100%'
  }
}

export default Table
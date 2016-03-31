import React from 'react'
import Radium from 'radium'

import Button from '../../global/components/Button'

@Radium
class Queue extends React.Component {
  constructor (props) {
    super(props)
    this.state = { data: props.data || {} }
  }

  componentWillReceiveProps (props) {
    let current = props.data[props.index]
    this.setState({
      table: Object.keys(current)
        .map((k) => [k, current[k]])
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
              paddingTop: 5,
              paddingRight: 10,
              paddingBottom: 5,
              paddingLeft: 10,
              float: 'left'
            }}
            handler={() => {
              props.data[props.index] = _.object(state.table)
              props.set(props.data)
            }}
          />
          <select
            style={[styles.select]}
            value={props.index}
            onChange={(e) => {
              props.onSwitch(e.target.value)
            }}
          >
          {
            props.data.map((c, i) => {
              return <option value={i}>
                {i}: {c.type}
              </option>
            })
          }
          </select>
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
    margin: 0,
    width: '50%'
  },
  input: {
    fontFamily: 'Courier',
    fontSize: '1em',
    color: '#333',
    background: '#000',
    border: 'none',
    width: '100%'
  },
   select: {
    color: '#333',
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    marginLeft: '0.5rem',
    backgroundColor: '#000',
    borderColor: '#333',
    float: 'right'
  } 
}

export default Queue
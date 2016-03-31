import React from 'react'
import Radium from 'radium'

@Radium
class Button extends React.Component {
  static defaultProps = {
    color: '#557',
    background: '#fff',
    border: '#557',
    hoverFontColor: '#fff',
    hoverBackColor: '#557',
    align: 'flex-end'
}

  render () {
    const {
      text,
      align,
      handler,
      color,
      background,
      hoverFontColor,
      hoverBackColor,
      border
    } = this.props

    const buttonStyle = [{
      ...styles.button,
      color,
      backgroundColor: background,
      border: '1px solid' + border,
      borderRadius: '0.25rem',
      ':hover': {
        color: hoverFontColor,
        backgroundColor: hoverBackColor
      }
    }]

    return (
      <div style={[
        styles.row,
        {
          justifyContent: align
        }
      ]}>
        <button
          style={[buttonStyle]}
          onClick={handler}
        >
          {text}
        </button>
      </div>
    )
  }
}

import gstyles from '../styles'
const styles = {
  ...gstyles,
  button: {
    ...gstyles.padding(0.5, 2, 0.5, 2),
    fontSize: '1.25rem',
    cursor: 'pointer'
  }
}

export default Button
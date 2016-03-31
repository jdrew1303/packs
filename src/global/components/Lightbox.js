import React from 'react'
import Radium from 'radium'

import Button from './Button'

@Radium
export default class Lightbox extends React.Component {
  render () {
    const { src, dismiss } = this.props
    return (
      <div style={[styles.overlay]} onClick={dismiss}>
        <img src={src} style={[styles.image]} />
      </div>
    )
  }
}

const styles = {
  overlay: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    cursor: 'zoom-out'
  },
  image: {
    display: 'block',
    marginTop: '1rem',
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto'
  }
}
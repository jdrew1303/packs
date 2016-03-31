import React from 'react'
import { render } from 'react-dom'
import Container from './Container'

export default (survey, modules) => {
  render((
    <Container
      survey={survey}
      modules={modules}
    />
  ), document.getElementById('container'))
}
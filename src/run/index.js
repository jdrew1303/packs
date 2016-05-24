import React from 'react'
import { render } from 'react-dom'
import Router from './Router'

export default (survey, modules) => {
  render((
    <Router
      survey={survey}
      modules={modules}
    />
  ), document.getElementById('container'))
}

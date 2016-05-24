import React from 'react'
import _ from 'lodash'
import Radium from 'radium'
import store from '../store'
import firePush from '../../global/services/firePush'
import echo from '../../global/services/echo'
import simulateOver from '../../global/services/simulateOver'
import Loader from '../Loader'

@Radium
class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = store.getState()

    const urlParams = _(location.search.slice(1).split('&'))
      .map((item) => item.split('='))
      .object()
      .value()

    store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillMount () {
    const params = _(location.search.slice(1).split('&'))
      .map((item) => item.split('='))
      .object()
      .value()

    const { modules, survey, firebase } = this.props
    const { screens, table } = survey
    store.dispatch({
      type: 'SET',
      screens,
      table
    })

    // simulated
    if (params.sim) {
      store.dispatch({
        type: 'SET_TABLE_INDEX',
        table: simulateOver(table, screens.slice(0, Number(params.sim)), modules),
        index: Number(params.sim)
      })
    }

    window.onpopstate = (event) => {
      console.log('pop', event)
      store.dispatch({
        type: 'SET_TABLE_INDEX',
        table: event.state,
        index: event.state && event.state.index || 0
      })
    }
  }

  assignProps (params, table) {
    return  _(params)
      .map((v, k) => [k, echo(v, table)])
      .object()
      .value()
  }

  push (newData) {
    window.scrollTo(0, 0)

    const {
      firebase,
      surveyName,
      surveyVersion
    } = this.props.survey.table

    const { index, fireKey } = this.state

    const table = {
      ...this.state.table,
      ...newData,
      [`module_${index - 1}_t`]: Date.now()
    }

    if (!!firebase) {
      const endpoint = `${firebase}/${surveyName}/${surveyVersion}`
      firePush(endpoint, fireKey, table)
        .then((res, err) => {
          if (!err) store.dispatch({
            type: 'SET_FIRE_KEY',
            key: res
          })
        })
    }

    store.dispatch({
      type: 'PUSH',
      index: Number(index) + 1,
      table
    })

    history.pushState({
      ...table,
      index: Number(index) + 1
    }, `Survey`, `?index=${Number(index) + 1}`)
  }

  instaPush (newData) {
    const { index } = this.state
    const table = {
      ...this.state.table,
      ...newData,
      [`module_${index - 1}_t`]: Date.now()
    }

    store.dispatch({
      type: 'PUSH',
      index: Number(index) + 1,
      table
    })
  }

  reinsert (moduleType, index) {
    const mod = this.state.screens.filter((m) => {
      return m.type === moduleType
    })[index]

    if (mod) {
      store.dispatch({
        type: 'INSERT',
        module: mod
      })
    } else {
      throw Error(`${index}: ${moduleType} does not exist`)
    }
  }

  render () {
    const { modules } = this.props
    const { screens, table, index } = this.state

    const urlParams = _(location.search.slice(1).split('&'))
      .map((item) => item.split('='))
      .object()
      .value()

    return (
      <div style={[styles.main]}>
        <div style={[styles.container]} key="container">
          <div style={[styles.center]}>
            {
              screens &&
              <Loader
                modules={modules}
                params={screens[index]}
                table={table}
                index={index}
                length={screens.length}
                push={::this.push}
                instaPush={::this.instaPush}
                reinsert={::this.reinsert}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  main: {
    position: 'absolute',
    width: '100%',
    minWidth: 640,
    minHeight: '100%',
    left: 0,
    top: 0,
    backgroundColor: '#bdf',
    fontFamily: '-apple-system, ".SFNSText-Regular", "San Francisco", "Roboto", "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
    fontSize: '1rem',
    color: '#333',
    boxSizing: 'border-box'
  },
  row: {
    display: 'flex',
    backgroundColor: '#000'
  },
  dev: {
    flex: 1,
    position: 'relative',
    boxSizing: 'border-box',
    marginTop: 5,
    marginRight: 5,
    marginBottom: 5,
    marginLeft: 5,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    backgroundColor: '#000',
    height: 200,
    overflowX: 'hidden',
    overflowY: 'scroll'
  },
  container: {
    position: 'relative',
    minHeight: '100%',
    width: '100%',
    paddingBottom: '3rem'
  },
  center: {
    position: 'relative',
    width: '100%',
    marginTop: '2rem',
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    minWidth: 600,
    maxWidth: 800
  }
}

export default Container

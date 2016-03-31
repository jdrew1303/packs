import { createStore } from 'redux'

export default createStore(function (state, action) {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        queue: action.queue,
        table: action.table
      }

    case 'SET_TABLE':
      return {
        ...state,
        table: action.table
      }

    case 'SET_QUEUE':
      return {
        ...state,
        queue: action.queue
      }

    case 'SET_INDEX':
      return {
        ...state,
        index: action.index
      }

    case 'SET_TABLE_INDEX':
      return {
        ...state,
        table: action.table,
        index: action.index
      }

    case 'PUSH':
      return {
        ...state,
        table: {
          ...state.table,
          ...action.table,
          [`module_${action.index - 1}_t`]: Date.now()
        },
        index: action.index
      }

      case 'INSERT':
        return {
          ...state,
          queue: state.queue.slice(0, state.index)
            .concat(action.module)
            .concat(state.queue.slice(state.index))
        }

    case 'SIMULATE':
      return {
        ...state,
        simulation: action.simulation,
        index: action.index || state.index
      }

    case 'SET_FIRE_KEY':
      return {
        ...state,
        fireKey: action.key
      }

    default:
      return {
        ...state,
        table: null,
        queue: [{}],
        index: 0,
        simulator: null,
        fireKey: null
      }
  }
})

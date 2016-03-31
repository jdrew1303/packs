import React from 'react'

class Mirror extends React.Component {
  static simulate (props) {
    return {}
  }

  render () {
    const { table, push } = this.props
    return (
      <div>
        <pre>{JSON.stringify(table, null, 2)}</pre>
        <input
          type="button"
          value="Continue"
          onClick={() => push()}
        />
      </div>
    )
  }
}

export default Mirror
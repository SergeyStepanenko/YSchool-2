import React from 'react'
import ReactDOM from 'react-dom'

let User = React.createClass({

  getInitialState: function() {
    return {
      active: false
    }
  },

  render: function() {

    let active = this.state.active ? 'Yes' : 'No'

    return (
      <div className="user">
        <div>Name: {this.props.name}</div>
        <div>Active: {active}</div>
        <button onClick={this.toggleActive}>Toggle Active</button>
      </div>
    )
  },

  toggleActive: function() {
    this.setState({
      active: !this.state.active
    })
  }

})

let App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>User List:</h1>
        <User name="Brad Westfall" />
        <User name="Kevin Lanni" />
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('root'))

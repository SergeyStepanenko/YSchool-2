import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

let User = function(props) {
  return (
    <div className="user">
      <div>Name: {props.name}</div>
    </div>
  )
}

let App = React.createClass({

  getInitialState: function() {
    return {
      users: []
    }
  },

  componentDidMount: function() {
    axios.get('http://swapi.co/api/people').then(results => {
      this.setState({
        users: results.data.results
      })
    })
  },

  render: function() {
    return (
      <div>
        <h1>Star Wars Characters:</h1>
        {this.state.users.map(user => {
          return <User name={user.name} key={user.name} />
        })}
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('root'))

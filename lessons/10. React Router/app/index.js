import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Router, Route, browserHistory, Link } from 'react-router'

let User = function(props) {
  return (
    <div className="user">
      <div>Name: {props.name}</div>
    </div>
  )
}

let Users = React.createClass({

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
        <Link to="/other">Other</Link>
        {this.state.users.map(user => {
          return <User name={user.name} key={user.name} />
        })}
      </div>
    )
  }
})

let Other = function() {
  return <div>Other</div>
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Users} />
    <Route path="/other" component={Other} />
  </Router>
), document.getElementById('root'))

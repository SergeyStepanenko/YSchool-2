import React from 'react'
import ReactDOM from 'react-dom'

let User = React.createClass({
  render: function() {
    return <div>{this.props.name}: <a href={'http://twitter.com/' + this.props.twitter}>Twitter</a></div>
  }
})

let App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>User List:</h1>
        <User name="Brad Westfall" twitter="bradwestfall" />
        <User name="Kevin Lanni" twitter="therealklanni"/>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('root'))

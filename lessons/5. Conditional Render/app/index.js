import React from 'react'
import ReactDOM from 'react-dom'

let User = React.createClass({

  render: function() {
    let twitter = (this.props.twitter) ? this.renderTwitter(this.props.twitter) : null
    return <div>{this.props.name}: {twitter}</div>
  },

  renderTwitter: function(twitter) {
    return <a href={'http://twitter.com/' + twitter}>Twitter</a>
  }

})

let App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>User List:</h1>
        <User name="Brad Westfall" twitter="bradwestfall" />
        <User name="Kevin Lanni"/>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('root'))

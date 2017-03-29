import React from 'react'
import ReactDOM from 'react-dom'

let Counter = React.createClass({

  getInitialState: function() {
    return {
      count: 0
    }
  },

  componentDidMount: function() {

    this.setState({
      count: this.props.start
    })

    setInterval(() => {
      this.setState({
        count: this.state.count + 1
      })
    }, 1000)

  },

  render: function() {
    return <div>Count: {this.state.count}</div>
  }

})

let App = React.createClass({
  render: function() {
    return <Counter start={5} />
  }
})

ReactDOM.render(<App />, document.getElementById('root'))

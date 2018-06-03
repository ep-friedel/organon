import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { apply_history, connect_serviceworker, convert_postmessage } from 'STORE/actions.js'

import React from 'react'
import { connect } from 'react-redux'
import { initServiceWorker } from 'UTILS/serviceWorker.js'

class App extends React.Component {
  componentDidMount() {
    // if (navigator.serviceWorker) {
    //   initServiceWorker()
    //     .then(subscription => {
    //       this.props.connect_serviceworker(subscription)
    //     })
    //     .catch(console.log)
    //   navigator.serviceWorker.addEventListener('message', this.props.convert_postmessage)
    // }
    // window.addEventListener('popstate', evt => {
    //   evt.state && this.props.apply_history(evt.state)
    // })
    //
    // if (history.state && history.state.app) {
    //   this.props.apply_history(history.state)
    // } else {
    //   history.replaceState({ app: { ...this.props.app } }, document.title, document.location.pathname)
    // }
  }

  state = {
    test: '',
  }

  render() {
    const { instance, user, app } = this.props
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            render={() => (
              <div>
                <p>Hallo Welt</p>
                <div style={{ whiteSpace: 'pre' }}>{this.state.test}</div>
                <textarea cols="50" rows="20" onChange={evt => this.setState({ test: evt.target.value }, () => console.log(this.state.test))} />
              </div>
            )}
          />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  app: state.app,
  instance: state.instance,
})

export default connect(mapStateToProps, { connect_serviceworker, convert_postmessage, apply_history })(App)

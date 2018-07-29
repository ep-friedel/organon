import { Redirect, Route, Switch } from 'react-router-dom'

import DefaultPage from 'CONNECTED/DefaultPage'
import React from 'react'

const validateId = id => /^[eb]_[0-9]*$/.test(id)

export default class Calendar extends React.Component {
  render() {
    return (
      <DefaultPage>
        <Switch>
          <Route path="/calendar/" exact render={() => <div>home</div>} />
          <Route path="/calendar/new" render={() => <div>new</div>} />
          <Route path="/calendar/:id" render={({ match: { params } }) => (validateId(params.id) ? <div>{params.id}</div> : <Redirect to="/calendar/" />)} />
        </Switch>
      </DefaultPage>
    )
  }
}

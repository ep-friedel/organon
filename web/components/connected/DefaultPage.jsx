import './BaseStyle.less'

import { removeResizeFocus, resizeFocus } from 'UTILS/resizeFocus.js'

import React from 'react'
import { connect } from 'redux'

export class DefaultPage extends React.Component {
  componentDidMount() {
    resizeFocus()
  }

  componentWillUnmount() {
    removeResizeFocus()
  }

  render() {
    return (
      <div>
        <Topbar />
        {this.props.children}
        <Bottombar />
      </div>
    )
  }
}

export default connect(store => ({}), {})(DefaultPage)
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/app'
import Main from './components/main'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
  </Route>
)

  import React from 'react'
  import ReactDOM from 'react-dom'
  import { Provider } from 'react-redux'
  import { createStore, applyMiddleware } from 'redux'
  import { Router, browserHistory } from 'react-router'
  import reducers from './reducers'
  import routes from './routes'
  import promise from 'redux-promise'
  import getInitialState from './utils/initial_state'

const logger = store => next => action => {
  let result = next(action)
  console.log('NEXT STATE:', result)
  return result
}

  const createStoreWithMiddleware = applyMiddleware(
    logger, promise
  )(createStore);

  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers, getInitialState())}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
    , document.querySelector('.container'))

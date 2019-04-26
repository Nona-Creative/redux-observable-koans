import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import { rootEpic } from './epics'

// ----------------------------------------------
// reducers
// ----------------------------------------------

const reducer = combineReducers({})

// ----------------------------------------------
// epics
// ----------------------------------------------

const epicMiddleware = createEpicMiddleware({
  dependencies: {},
})

// ----------------------------------------------
// store
// ----------------------------------------------

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = [
  epicMiddleware,
]

const configureStore = initialState => {
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware)
    ),
  )

  // epics
  epicMiddleware.run(rootEpic)

  // initial dispatches
  //store.dispatch((appActions.initApp()))

  return store
}

export default configureStore

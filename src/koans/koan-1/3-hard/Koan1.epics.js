import { ofType } from 'redux-observable'
import { mapTo, switchMap } from 'rxjs/operators'

import { getUser, INIT_APP, initAppSuccess, RE_INIT_APP } from '../actions'

// ------------------------------------------------------
// REMEMBER:
// everything you'll need is already imported above
// but feel free to use whatever other tools you want
// ------------------------------------------------------

//---------------------------------
// init app 1
//---------------------------------

export const initApp1Epic = (action$) => (
  action$.pipe(
    // TODO: fill in here
  )
)

//---------------------------------
// init app 2
//---------------------------------

export const initApp2Epic = (action$) => (
  action$.pipe(
    // TODO: fill in here
  )
)

//---------------------------------
// init app 3
//---------------------------------

export const initApp3Epic = (action$) => (
  action$.pipe(
    // TODO: fill in here
  )
)

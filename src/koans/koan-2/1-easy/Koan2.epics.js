import { ofType } from 'redux-observable'
import { mapTo, map, filter, switchMap } from 'rxjs/operators'
import * as R from 'ramda'

import {
  GET_USER_SUCCESS,
  getUser,
  INIT_APP,
  initAppSuccess,
  logFailure,
  persistMessage,
  RE_INIT_APP,
  setMessage, userIsAdmin
} from '../actions'

// ------------------------------------------------------
// REMEMBER:
// everything you'll need is already imported above
// but feel free to use whatever other tools you want
// ------------------------------------------------------

//---------------------------------
// success
//---------------------------------

export const successEpic = (action$) => (
  action$.pipe(
    // TODO: fill in here
  )
)

//---------------------------------
// failure
//---------------------------------

export const failureEpic = (action$) => (
  action$.pipe(
    // TODO: fill in here
  )
)

//---------------------------------
// admin user
//---------------------------------

export const adminUserEpic = (action$) => (
  action$.pipe(
    // TODO: fill in here
  )
)

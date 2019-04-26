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
    map(R.prop('type')),
    filter(x => /_SUCCESS$/.test(x)),
    mapTo(setMessage({ flavour: 'success', message: 'all is well' })),
  )
)

//---------------------------------
// failure
//---------------------------------

export const failureEpic = (action$) => (
  action$.pipe(
    filter(({ type }) => /_FAILURE$/.test(type)),
    map(R.prop('message')),
    switchMap((message) => [
      setMessage({ flavour: 'failure', message: message }),
      persistMessage(message),
    ]),
  )
)

//---------------------------------
// admin user
//---------------------------------

export const adminUserEpic = (action$) => (
  action$.pipe(
    ofType(GET_USER_SUCCESS),
    map(R.prop('payload')),
    filter(R.propEq('isAdmin', true)),
    mapTo(userIsAdmin()),
  )
)

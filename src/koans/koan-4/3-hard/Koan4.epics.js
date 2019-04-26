import { ofType } from 'redux-observable'
import { map, switchMap, take } from 'rxjs/operators'
import * as R from 'ramda'
import { PROCESS_CURRENT_TRANSACTION, processCurrentTransactionSuccess } from '../actions'

// ------------------------------------------------------
// REMEMBER:
// everything you'll need is already imported above
// but feel free to use whatever other tools you want
// ------------------------------------------------------

//---------------------------------
// process current transaction
//---------------------------------

export const processCurrentTransactionEpic = (action$, state$, { apiProcessTransaction }) => (
  action$.pipe(
    // TODO: fill in here
  )
)

//---------------------------------
// process current transaction 2
//---------------------------------

export const processCurrentTransaction2Epic = (action$, state$, { apiProcessTransaction }) => (
  action$.pipe(
    // TODO: fill in here
  )
)

//---------------------------------
// process current transaction 3
//---------------------------------

export const processCurrentTransaction3Epic = (action$, state$, { apiProcessTransaction }) => (
  action$.pipe(
    // TODO: fill in here
  )
)

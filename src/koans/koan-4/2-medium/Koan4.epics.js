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
    ofType(PROCESS_CURRENT_TRANSACTION),
    switchMap(() => state$.pipe(
      take(1),
      map(R.prop('transaction'))
    )),
    switchMap(data => apiProcessTransaction(data).pipe(
      take(1),
      map(R.mergeRight(data))
    )),
    map(processCurrentTransactionSuccess),
  )
)

//---------------------------------
// process current transaction 2
//---------------------------------

export const processCurrentTransaction2Epic = (action$, state$, { apiProcessTransaction }) => (
  action$.pipe(
    ofType(PROCESS_CURRENT_TRANSACTION),
    map(R.path(['payload', 'status'])),
    switchMap((status) => state$.pipe(
      take(1),
      map(R.prop('transaction')),
      map(R.mergeRight({ status })),
    )),
    switchMap(data => apiProcessTransaction(data).pipe(
      take(1),
      map(R.mergeRight(data))
    )),
    map(processCurrentTransactionSuccess),
  )
)

//---------------------------------
// process current transaction 3
//---------------------------------

export const processCurrentTransaction3Epic = (action$, state$, { apiProcessTransaction }) => (
  action$.pipe(
    ofType(PROCESS_CURRENT_TRANSACTION),
    switchMap(() => state$.pipe(
      map(R.prop('transaction')),
    )),
    switchMap(data => apiProcessTransaction(data).pipe(
      take(1),
      map(R.mergeRight(data))
    )),
    map(processCurrentTransactionSuccess),
  )
)

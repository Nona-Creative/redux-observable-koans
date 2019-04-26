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

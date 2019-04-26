import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import * as R from 'ramda'

import { catchMapTo } from '../../../common/rxjs/rxjs.utils'
import { PROCESS_TRANSACTION, processTransactionFailure, processTransactionSuccess } from '../actions'
import { API_ERROR_BAD_REQUEST, API_ERROR_NOT_FOUND } from '../api.errors'

// ------------------------------------------------------
// REMEMBER:
// everything you'll need is already imported above
// but feel free to use whatever other tools you want
// ------------------------------------------------------

//---------------------------------
// process transaction 1
//---------------------------------

export const processTransaction1Epic = (action$, state$, { apiProcessTransaction }) => (
  action$.pipe(
    ofType(PROCESS_TRANSACTION),
    map(R.prop('payload')),
    switchMap((x) => apiProcessTransaction(x).pipe(
      map(R.applySpec({ id: R.prop('transactionId') })),
      map(processTransactionSuccess),
      catchError(() => of(processTransactionFailure('nice user friendly message'))),
    )),
  )
)

//---------------------------------
// process transaction 1
//---------------------------------

export const processTransaction2Epic = (action$, state$, { apiProcessTransaction }) => (
  action$.pipe(
    ofType(PROCESS_TRANSACTION),
    map(R.prop('payload')),
    switchMap((x) => apiProcessTransaction(x).pipe(
      map(R.applySpec({ id: R.prop('transactionId') })),
      map(processTransactionSuccess),
      catchMapTo(API_ERROR_BAD_REQUEST, processTransactionFailure('something is not right about your transaction')),
      catchMapTo(API_ERROR_NOT_FOUND, processTransactionFailure('your transaction does not exist')),
    )),
  )
)

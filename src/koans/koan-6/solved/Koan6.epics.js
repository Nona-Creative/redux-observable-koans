import { ofType } from 'redux-observable'
import { of, concat } from 'rxjs'
import { map, switchMap, take } from 'rxjs/operators'
import * as R from 'ramda'

import {
  BUILD_TRANSACTION_SUCCESS,
  buildTransaction,
  CREATE_TRANSACTION_SUCCESS,
  createTransaction,
  PROCESS_TRANSACTION,
  processTransactionSuccess, UPDATE_TRANSACTION_SUCCESS, updateTransaction,
} from '../actions'

// ------------------------------------------------------
// REMEMBER:
// everything you'll need is already imported above
// but feel free to use whatever other tools you want
// ------------------------------------------------------

//---------------------------------
// process transaction
//---------------------------------

export const processTransactionInStepsEpic = (action$) => (
  action$.pipe(
    ofType(PROCESS_TRANSACTION),
    map(R.prop('payload')),
    switchMap((x) => concat(
      of(buildTransaction(x)),
      action$.pipe(
        ofType(BUILD_TRANSACTION_SUCCESS),
        take(1),
        map(R.prop('payload')),
        map(createTransaction),
      ),
      action$.pipe(
        ofType(CREATE_TRANSACTION_SUCCESS),
        take(1),
        map(R.prop('payload')),
        map(updateTransaction),
      ),
      action$.pipe(
        ofType(UPDATE_TRANSACTION_SUCCESS),
        take(1),
        map(R.prop('payload')),
        map(processTransactionSuccess),
      ),
    )),
  )
)

import { marbles } from 'rxjs-marbles/mocha'

import * as SUT from './Koan6.epics'
import {
  processTransaction,
  processTransactionSuccess,
  buildTransaction,
  buildTransactionSuccess,
  createTransaction,
  createTransactionSuccess,
  updateTransaction,
  updateTransactionSuccess,
} from '../actions'

describe('Koan 6 epics : action sequences or delegating to other epics', () => {

  // ------------------------------------------------------
  // In this Koan we will respond to and dispatch multiple
  // actions in sequence.
  // This allows us to delegate steps within an epic to
  // other epics.
  // ------------------------------------------------------

  // ------------------------------------------------------
  // consider the following actions will be dispatched:
  // - processTransaction (with a transaction payload)
  // - buildTransactionSuccess (with the result of the build process)
  // - createTransactionSuccess (with the result creating the transaction on the API)
  // - updateTransactionSuccess (with the result updating the transaction on the API)
  //
  // write an epic that in response to the above actions
  // extracts their payload and dispatches the next action
  // in the following order:
  // 1. buildTransaction
  // 2. createTransaction
  // 3. updateTransaction
  // 4. processTransactionSuccess
  //
  // so for eg.
  // in response to processTransaction dispatch buildTransaction with the payload from processTransaction
  // and in response to updateTransactionSuccess dispatch processTransactionSuccess with the payload from updateTransactionSuccess
  //
  // unskip the next section to get started
  // ------------------------------------------------------

  describe.skip('6.1. respond to and dispatch multiple actions in sequence', () => {

    it('should process transaction step by step as expected', marbles(async m => {
      // given
      const buildTransactionPayload = { signedTransaction: '0xDEF456'}
      const createTransactionPayload = { transactionId: 123, status: 'pending' }
      const updateTransactionPayload = { transactionId: 123, status: 'complete' }
      const initialPayload = { amount: 1, targetAccount: '0xABC123' }
      const values = {
        a: processTransaction(initialPayload),
        w: buildTransaction(initialPayload),
        b: buildTransactionSuccess(buildTransactionPayload),
        x: createTransaction(buildTransactionPayload),
        c: createTransactionSuccess(createTransactionPayload),
        y: updateTransaction(createTransactionPayload),
        d: updateTransactionSuccess(updateTransactionPayload),
        z: processTransactionSuccess(updateTransactionPayload),
      }
      const action$  = m.cold('---(abcd)   ', values)
      const expected =        '---w--x--y--z'

      // when ... we process transaction in steps
      const destination$ = SUT.processTransactionInStepsEpic(action$)

      // then ... should return as expected
      await m.equal(destination$, expected, values)
    }))
  })
})

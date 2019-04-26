import { marbles } from 'rxjs-marbles/mocha'

import * as SUT from './Koan6.epics'
import sinon from 'sinon'
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
  let sandbox = null

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

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
      // ...

      // when ... we process transaction in steps
      const destination$ = SUT.processTransactionInStepsEpic(action$)

      // then ... should return as expected
      await m.equal(destination$, expected, values)
    }))
  })
})

import { marbles } from 'rxjs-marbles/mocha'
import sinon from 'sinon'

import * as SUT from './Koan4.epics'
import { processCurrentTransaction, processCurrentTransactionSuccess } from '../actions'

describe('Koan 4 epics : working with state', () => {
  let sandbox = null

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  // ------------------------------------------------------
  // In this Koan we interact with values in state.
  // ------------------------------------------------------

  // ------------------------------------------------------
  // write an epic that:
  // - responds to a processCurrentTransaction action (with no payload)
  // - gets the transaction from state
  // - processes this transaction using a ``apiProcessTransaction`` injected dependency
  // - and finally dispatches processTransactionSuccess with merged transaction data (from state and result of ``apiProcessTransaction``)
  //
  // write a test that dispatches processCurrentTransaction twice eg.
  // const action$                = m.cold('---a   ---a  ', values)
  //
  // unskip the next section to get started
  // ------------------------------------------------------

  describe.skip('4.1. passing value from state to dependency util', () => {
    it('should process current transaction in state', marbles(async (m) => {
      // given
      // ... a transaction exists in state
      // ... and processing this transaction will succeed
      // then
      // ... should succeed with merged transaction data (from state and API)
      const state = { transaction: { amount: 1, targetAccount: '0xABC123' } }
      const apiProcessTransactionResponse = { transactionId: 123, status: 'complete' }
      const expectedPayload = { amount: 1, targetAccount: '0xABC123', transactionId: 123, status: 'complete' }
      const values = {
        s: state,
        a: processCurrentTransaction(),
        b: apiProcessTransactionResponse,
        c: processCurrentTransactionSuccess(expectedPayload),
      }
      const state$                 = m.cold('s------------', values)
      const action$                = m.cold('---a   ---a  ', values)
      const apiProcessTransaction$ = m.cold('   ---b      ', values)
      const expected               =        '------c---c--'

      const apiProcessTransaction$Stub = sandbox.stub().returns(apiProcessTransaction$)

      const dependencies = {
        apiProcessTransaction: apiProcessTransaction$Stub,
      }

      // when ... we process current transaction
      const destination$ = SUT.processCurrentTransactionEpic(action$, state$, dependencies)

      // then
      await m.equal(destination$, expected, values)
      // ... after correctly processing transaction on API
      sinon.assert.calledWithExactly(apiProcessTransaction$Stub, { amount: 1, targetAccount: '0xABC123' })
    }))
  })

  // TODO: use payload and state together

  // TODO: respond to multiple state changes
})

import { marbles } from 'rxjs-marbles/mocha'
import { assert } from 'chai'
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
  // also test that expected behaviour is not affected by multiple state changes during the epic eg.
  // const state$                 = m.cold('s---s---s--s-', values)
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
      // TODO: fill in here

      // when ... we process current transaction
      const destination$ = SUT.processCurrentTransactionEpic(action$, state$, dependencies)

      // then
      await m.equal(destination$, expected, values)
      // ... after correctly processing transaction on API
      // TODO: fill in here
    }))
  })

  // ------------------------------------------------------
  // write an epic that:
  // - responds to a processCurrentTransaction action (with a payload that looks like { status: 'confirmed' })
  // - gets the transaction from state
  // - processes this transaction using a ``apiProcessTransaction`` injected dependency
  // - and finally dispatches processTransactionSuccess with merged transaction data (from state and result of ``apiProcessTransaction``)
  //
  // write a test that dispatches processCurrentTransaction twice eg.
  // const action$                = m.cold('---a   ---a  ', values)
  //
  // also test that expected behaviour is not affected by multiple state changes during the epic eg.
  // const state$                 = m.cold('s---s---s--s-', values)
  //
  // unskip the next section to get started
  // ------------------------------------------------------

  describe.skip('4.2. passing combined data from payload and state to dependency util', () => {
    it('should process current transaction in state', marbles(async (m) => {
      // given
      // ... a transaction exists in state
      // ... and processing this transaction will succeed
      // then
      // ... should succeed with merged transaction data (from state and API)
      // TODO: fill in here

      // when ... we process current transaction
      const destination$ = SUT.processCurrentTransaction2Epic(action$, state$, dependencies)

      // then
      await m.equal(destination$, expected, values)
      // ... after correctly processing transaction on API
      // TODO: fill in here
    }))
  })

  // ------------------------------------------------------
  // write an epic that:
  // - responds to a processCurrentTransaction action (with a payload that looks like { status: 'confirmed' })
  // - gets the transaction from state
  // - processes this transaction using a ``apiProcessTransaction`` injected dependency
  // - and finally dispatches processTransactionSuccess with merged transaction data (from state and result of ``apiProcessTransaction``)
  //
  // write a test that dispatches processCurrentTransaction twice eg.
  // const action$                = m.cold('---a   ---a  ', values)
  //
  // this epic should respond to multiple state changes, so test them as follows:
  // const state$                 = m.cold('s-----t------', values)
  // where the transactions in states s and t are different
  //
  // also test that the ``apiProcessTransaction`` injected dependency is called correctly (with transaction for s state then with transaction from t state)
  //
  // unskip the next section to get started
  // ------------------------------------------------------

  describe.skip('4.3. passing combined data from payload and state to dependency util', () => {
    it('should process current transaction in state', marbles(async (m) => {
      // given
      // ... a transaction exists in state
      // ... and processing this transaction will succeed
      // then
      // ... should succeed with merged transaction data (from state and API)
      // TODO: fill in here

      // when ... we process current transaction
      const destination$ = SUT.processCurrentTransaction3Epic(action$, state$, dependencies)

      // then
      await m.equal(destination$, expected, values)
      // ... after correctly processing transaction on API
      // TODO: fill in here (test that the ``apiProcessTransaction`` injected dependency is called correctly (with transaction for s state then with transaction from t state)
    }))
  })
})

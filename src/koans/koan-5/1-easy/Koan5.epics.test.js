import { marbles } from 'rxjs-marbles/mocha'
import parametrize from 'js-parametrize'
import sinon from 'sinon'

import * as SUT from './Koan5.epics'
import {
  processCurrentTransaction,
  processCurrentTransactionSuccess,
  processTransaction,
  processTransactionFailure,
  processTransactionSuccess,
} from '../actions'
import { ApiErrorBadRequest, ApiNotFoundError } from '../api.errors'

describe('Koan 5 epics : error handling', () => {
  let sandbox = null

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  // ------------------------------------------------------
  // In this Koan we will do some error handling.
  // ------------------------------------------------------

  // ------------------------------------------------------
  // write an epic that:
  // - responds to a processTransaction action (with the transaction that needs processing as it's payload)
  // - processes this transaction using a ``apiProcessTransaction`` injected dependency
  // - and finally dispatches processTransactionSuccess with the transaction id returned by ``apiProcessTransaction``
  //   or dispatches processTransactionFailure with a user friendly error message if ``apiProcessTransaction`` fails in any way
  //
  // unskip the next section to get started
  // ------------------------------------------------------

  describe.skip('5.1. handle all errors', () => {

    it('should successfully process transaction as expected', marbles(async (m) => {
      // given ... processing the provided transaction will succeed
      // then ... should succeed with processed transaction's id
      const apiProcessTransactionResponse = { transactionId: 123, status: 'complete' }
      const values = {
        a: processTransaction({ amount: 1, targetAccount: '0xABC123' }),
        b: apiProcessTransactionResponse,
        c: processTransactionSuccess({ id: 123 }),
      }
      const state$                 = m.cold('         ')
      const action$                = m.cold('---a     ', values)
      const apiProcessTransaction$ = m.cold('   ---b  ', values)
      const expected               =        '------c--'

      const apiProcessTransaction$Stub = sandbox.stub().returns(apiProcessTransaction$)

      const dependencies = {
        apiProcessTransaction: apiProcessTransaction$Stub,
      }

      // when ... we process transaction
      const destination$ = SUT.processTransaction1Epic(action$, state$, dependencies)

      // then
      await m.equal(destination$, expected, values)
      // ... after correctly attempting to process transaction on API
      sinon.assert.calledWithExactly(apiProcessTransaction$Stub, { amount: 1, targetAccount: '0xABC123' })
    }))

    it('should handle any error thrown during transaction processing', marbles(async (m) => {
      // given ... processing the provided transaction will fail in some unexpected way
      // then ... should fail with expected message
      const values = {
        a: processTransaction({ amount: 1, targetAccount: '0xABC123' }),
        b: processTransactionFailure('nice user friendly message'),
      }
      const state$                 = m.cold('         ')
      const action$                = m.cold('---a     ', values)
      const apiProcessTransaction$ = m.cold('   ---#  ', null, new Error('SCARY SERVER ERROR MESSAGE'))
      const expected               =        '------b--'

      const apiProcessTransaction$Stub = sandbox.stub().returns(apiProcessTransaction$)

      const dependencies = {
        apiProcessTransaction: apiProcessTransaction$Stub,
      }

      // when ... we process transaction
      const destination$ = SUT.processTransaction1Epic(action$, state$, dependencies)

      // then
      await m.equal(destination$, expected, values)
      // ... after correctly attempting to process transaction on API
      sinon.assert.calledWithExactly(apiProcessTransaction$Stub, { amount: 1, targetAccount: '0xABC123' })
    }))
  })

  // ------------------------------------------------------
  // next write an epic that:
  // - behaves exactly the same as the previous epic
  //   but this time instead of handling any errors thrown
  //   by ``apiProcessTransaction``, it should only handle
  //   2 expected errors:
  //   - API_ERROR_BAD_REQUEST
  //   - API_ERROR_NOT_FOUND
  //   you can use catchMapTo to do this or catchError
  //   But the epic should not handle any but these 2 errors.
  //
  // unskip the next section to get started
  // ------------------------------------------------------

  describe.skip('5.2. handle only expected errors', () => {
    it('should successfully process transaction as expected', marbles(async (m) => {
      // given ... processing the provided transaction will succeed
      // then ... should succeed with processed transaction's id
      const apiProcessTransactionResponse = { transactionId: 123, status: 'complete' }
      const values = {
        a: processTransaction({ amount: 1, targetAccount: '0xABC123' }),
        b: apiProcessTransactionResponse,
        c: processTransactionSuccess({ id: 123 }),
      }
      const state$                 = m.cold('         ')
      const action$                = m.cold('---a     ', values)
      const apiProcessTransaction$ = m.cold('   ---b  ', values)
      const expected               =        '------c--'

      const apiProcessTransaction$Stub = sandbox.stub().returns(apiProcessTransaction$)

      const dependencies = {
        apiProcessTransaction: apiProcessTransaction$Stub,
      }

      // when ... we process transaction
      const destination$ = SUT.processTransaction2Epic(action$, state$, dependencies)

      // then
      await m.equal(destination$, expected, values)
      // ... after correctly attempting to process transaction on API
      sinon.assert.calledWithExactly(apiProcessTransaction$Stub, { amount: 1, targetAccount: '0xABC123' })
    }))

    parametrize([
      [new ApiErrorBadRequest('invalid transaction data'), 'something is not right about your transaction'],
      [new ApiNotFoundError('transaction not found'), 'your transaction does not exist'],
    ], (error, expectedMessage) => {
      it('should handle specific errors thrown during transaction processing with expected user friendly messages', marbles(async (m) => {

        // optional: use catchMapTo from src/common/rxjs/rxjs.utils.js

        // given ... processing the provided transaction will fail result in provided errors
        // then ... should fail with expected user friendly messages
        const values = {
          a: processTransaction({ amount: 1, targetAccount: '0xABC123' }),
          b: processTransactionFailure(expectedMessage),
        }
        const state$                 = m.cold('         ')
        const action$                = m.cold('---a     ', values)
        const apiProcessTransaction$ = m.cold('   ---#  ', null, error)
        const expected               =        '------b--'

        const apiProcessTransaction$Stub = sandbox.stub().returns(apiProcessTransaction$)

        const dependencies = {
          apiProcessTransaction: apiProcessTransaction$Stub,
        }

        // when ... we process transaction
        const destination$ = SUT.processTransaction2Epic(action$, state$, dependencies)

        // then
        await m.equal(destination$, expected, values)
        // ... after correctly attempting to process transaction on API
        sinon.assert.calledWithExactly(apiProcessTransaction$Stub, { amount: 1, targetAccount: '0xABC123' })
      }))
    })

    it('should not handle any unexpected errors thrown during transaction processing', marbles(async (m) => {
      // given ... processing the provided transaction will fail in some unexpected way
      // then ... should not handle error
      const values = {
        a: processTransaction({ amount: 1, targetAccount: '0xABC123' }),
      }
      const state$                 = m.cold('         ')
      const action$                = m.cold('---a     ', values)
      const apiProcessTransaction$ = m.cold('   ---#  ', null, new Error('ERROR MESSAGE'))
      const expected               =        '------#--'

      const apiProcessTransaction$Stub = sandbox.stub().returns(apiProcessTransaction$)

      const dependencies = {
        apiProcessTransaction: apiProcessTransaction$Stub,
      }

      // when ... we process transaction
      const destination$ = SUT.processTransaction2Epic(action$, state$, dependencies)

      // then
      await m.equal(destination$, expected, values, new Error('ERROR MESSAGE'))
      // ... after correctly attempting to process transaction on API
      sinon.assert.calledWithExactly(apiProcessTransaction$Stub, { amount: 1, targetAccount: '0xABC123' })
    }))
  })
})

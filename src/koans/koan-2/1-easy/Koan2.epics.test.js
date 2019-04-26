import { marbles } from 'rxjs-marbles/mocha'
import parametrize from 'js-parametrize'

import {
  getProductsFailure,
  getProductsSuccess,
  getUserFailure,
  getUserSuccess,
  nominateSuccessor, persistMessage,
  setMessage, userIsAdmin
} from '../actions'
import * as SUT from './Koan2.epics'

describe('Koan 2 epics : filter actions', () => {

  // ------------------------------------------------------
  // In this Koan we will filter by action types and payloads
  // ------------------------------------------------------

  // ------------------------------------------------------
  // write an epic that:
  // - in response to any success action
  // - dispatches a setMessage action that looks like this
  //   { flavour: 'success', message: 'all is well' }
  //
  // write a test that dispatches each action twice eg.
  // const action$        = m.cold('---a---a---', values)
  //
  // unskip the next section to get started
  // ------------------------------------------------------

  describe.skip('2.1. filter for all success actions', () => {
    parametrize([
      [getUserSuccess({ username: 'USER ONE' })],
      [getProductsSuccess([{ name: 'PRODUCT ONE' }, { name: 'PRODUCT TWO' }])],
    ], (action) => {
      it('should dispatch setMessage in response to any success action', marbles((m) => {
        // given ... provided success actions will be dispatched
        // then ... should immediately dispatch setMessage with expected payload
        const values = {
          a: action,
          b: setMessage({ flavour: 'success', message: 'all is well' }),
        }
        const action$        = m.cold('---a---a---', values)
        const expected       =        '---b---b---'

        // when ... handle all successes
        const destination$ = SUT.successEpic(action$)

        // then
        m.equal(destination$, expected, values)
      }))
    })

    parametrize([
      [nominateSuccessor('NEW KING')],
      [getProductsFailure('error retrieving products')],
    ], (action) => {
      it('should not dispatch anything in response to any non-success actions', marbles((m) => {
        // given ... provided success actions will be dispatched
        // then ... should do nothing
        const values = {
          a: action,
        }
        const action$        = m.cold('---a---a---', values)
        const expected       =        '-----------'

        // when ... handle all successes
        const destination$ = SUT.successEpic(action$)

        // then
        m.equal(destination$, expected, values)
      }))
    })
  })

  // ------------------------------------------------------
  // write an epic that:
  // - in response to any failure action
  // - dispatches both:
  //   - a setMessage action that looks like this
  //     { flavour: 'failure', message }
  //     where message is the failure action payload
  //   - and a persistMessage with just the message
  //
  // write a test that dispatches each action twice eg.
  // const action$        = m.cold('---a-----a-----', values)
  //
  // unskip the next section to get started
  // ------------------------------------------------------

  describe.skip('2.2. filter for all failure actions', () => {
    parametrize([
      [getUserFailure, 'could not retrieve user'],
      [getProductsFailure, 'could not retrieve products'],
    ], (actionCreator, message) => {
      it('should dispatch setMessage in response to any success action', marbles((m) => {
        // given ... provided success actions will be dispatched
        // then ... should immediately dispatch setMessage with expected payload
        const values = {
          a: actionCreator(message),
          b: setMessage({ flavour: 'failure', message }),
          c: persistMessage(message),
        }
        const action$        = m.cold('---a-----a-----', values)
        const expected       =        '---(bc)--(bc)--'

        // when ... handle all failures
        const destination$ = SUT.failureEpic(action$)

        // then
        m.equal(destination$, expected, values)
      }))
    })

    parametrize([
      [getUserSuccess({ username: 'USER ONE' })],
      [getProductsSuccess([{ name: 'PRODUCT ONE' }, { name: 'PRODUCT TWO' }])],
    ], (action) => {
      it('should not dispatch anything in response to any non-failure actions', marbles((m) => {
        // given ... provided success actions will be dispatched
        // then ... should do nothing
        const values = {
          a: action,
        }
        const action$        = m.cold('---a---a---', values)
        const expected       =        '-----------'

        // when ... handle all failures
        const destination$ = SUT.failureEpic(action$)

        // then
        m.equal(destination$, expected, values)
      }))
    })
  })

  // ------------------------------------------------------
  // write an epic that:
  // - in response getUserSuccess action
  // - dispatches a userIsAdmin action if the payload includes { isAdmin: true }
  //   otherwise does nothing
  //
  // write a test that dispatches getUserSuccess twice eg.
  // const action$        = m.cold('---a---a--', values)
  //
  // unskip the next section to get started
  // ------------------------------------------------------

  describe.skip('2.3. filter by payload', () => {
    it('should dispatch is admin notification if get user returns admin', marbles((m) => {
      // given ... get user will return an admin
      // then ... should immediately dispatch userIsAdmin
      const values = {
        a: getUserSuccess({ username: 'IMPORTANT USER', isAdmin: true }),
        b: userIsAdmin(),
      }
      const action$        = m.cold('---a---a--', values)
      const expected       =        '---b---b--'

      // when ... handle admin user retrievals
      const destination$ = SUT.adminUserEpic(action$)

      // then
      m.equal(destination$, expected, values)
    }))

    it('should not dispatch is admin notification if get user returns non-admin', marbles((m) => {
      // given ... get user will return a non-admin
      // then ... should do nothing
      const values = {
        a: getUserSuccess({ username: 'PLEB USER', isAdmin: false }),
        b: userIsAdmin(),
      }
      const action$        = m.cold('---a---a--', values)
      const expected       =        '----------'

      // when ... handle admin user retrievals
      const destination$ = SUT.adminUserEpic(action$)

      // then
      m.equal(destination$, expected, values)
    }))
  })
})

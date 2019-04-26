import { marbles } from 'rxjs-marbles/mocha'
import parametrize from 'js-parametrize'

import { getUser, initApp, initAppSuccess, reInitApp } from '../actions'
import * as SUT from './Koan1.epics'

describe('Koan 1 epics: action/s in action/s out', () => {

  // ------------------------------------------------------
  // In this Koan
  // we will respond to single / multiple actions
  // and dispatch single / multiple actions
  // ------------------------------------------------------

  // ------------------------------------------------------
  // write an epic that:
  // - in response to initApp action
  // - dispatches initAppSuccess action
  //
  // write a test that dispatches initApp twice eg.
  // const action$        = m.cold('---a---a---', values)
  //
  // unskip the next section to get started
  // ------------------------------------------------------

  describe.skip('1.1 dispatch a single action in response to a single action', () => {
    it('should immediately dispatch initAppSuccess in response to initApp', marbles((m) => {
      // given ... expected action will be dispatched
      // then ... should immediately succeed
      const values = {
        a: initApp(),
        b: initAppSuccess(),
      }
      const action$        = m.cold('---a---a---', values)
      const expected       =        '---b---b---'

      // when ... we initialize app
      const destination$ = SUT.initApp1Epic(action$)

      // then
      m.equal(destination$, expected, values)
    }))
  })

  // ------------------------------------------------------
  // write an epic that:
  // - in response to either initApp or reInitApp action
  // - dispatches initAppSuccess action
  //
  // write a test that dispatches the initial actions twice eg.
  // const action$        = m.cold('---a---a--', values)
  //
  // unskip the next section to get started
  // ------------------------------------------------------

  describe.skip('1.2. dispatch a single action in response to multiple actions', () => {
    parametrize([
      [initApp()],
      [reInitApp()],
    ], (action) => {
      it('should immediately dispatch initAppSuccess in response to initApp or reInitApp', marbles((m) => {
        // given ... expected actions will be dispatched
        // then ... should immediately succeed
        const values = {
          a: action,
          b: initAppSuccess(),
        }
        const action$        = m.cold('---a---a--', values)
        const expected       =        '---b---b--'

        // when ... we initialize or reinitialize app
        const destination$ = SUT.initApp2Epic(action$)

        // then
        m.equal(destination$, expected, values)
      }))
    })
  })

  // ------------------------------------------------------
  // write an epic that:
  // - in response to initApp action
  // - dispatches both initAppSuccess and getUser actions
  //
  // write a test that dispatches initApp twice eg.
  // const action$        = m.cold('---a-----a-----', values)
  //
  // unskip the next section to get started
  // ------------------------------------------------------

  describe.skip('1.3. dispatch multiple actions in response to a single action', () => {
    it('should immediately dispatch initAppSuccess and getUser in response to initApp', marbles((m) => {
      // given ... expected action will be dispatched
      // then ... should immediately get user and succeed simultaneously
      const values = {
        a: initApp(),
        b: initAppSuccess(),
        c: getUser(),
      }
      const action$        = m.cold('---a-----a-----', values)
      const expected       =        '---(bc)--(bc)--'

      // when ... we initialize app
      const destination$ = SUT.initApp3Epic(action$)

      // then
      m.equal(destination$, expected, values)
    }))
  })
})

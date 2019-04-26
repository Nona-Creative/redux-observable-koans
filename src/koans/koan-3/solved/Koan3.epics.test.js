import { marbles } from 'rxjs-marbles/mocha'

import * as Utils from '../utils'
import * as SUT from './Koan3.epics'
import {
  getUserCoords, getUserCoordsSuccess,
  getUserStartingCoords,
  getUserStartingCoordsSuccess,
  streamUserCoords,
  streamUserCoordsSuccess,
  sumUserCoords,
  sumUserCoordsSuccess
} from '../actions'
import sinon from 'sinon'

describe('Koan 3 epics : dependencies', () => {
  let sandbox = null

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  // ------------------------------------------------------
  // In this Koan we interact with injected dependencies.
  // We will not stub any sync pure dependencies like the
  // calculateSum function in our utils.js file.
  // But we will stub anything external dependencies or local
  // dependencies that are async, this allows us to control
  // how these dependencies behave over time.
  // ------------------------------------------------------

  // ------------------------------------------------------
  // write an epic that:
  // - responds to a sumUserCoords action (with a payload that looks like this { x, y })
  // - sums the 2 values from the payload a ``calculateSum`` injected dependency
  // - and finally dispatches sumUserCoordsSuccess with the result
  //
  // write a test that dispatches sumUserCoords twice eg.
  // const action$  = m.cold('---a---a--', values)
  //
  // unskip the next section to get started
  // ------------------------------------------------------

  describe.skip('3.1. single sync value', () => {
    it('should calculate the sum of the provided values and succeed with result', marbles((m) => {
      // given ... expected actions will be dispatched
      // then ... should calculate the sum of the provided values using util and succeed with result
      const x = 3
      const y = 5
      const calculateSumResult = Utils.calculateSum(x, y)
      const values = {
        a: sumUserCoords({ x, y }),
        b: sumUserCoordsSuccess(calculateSumResult),
      }
      const state$   = m.cold('          ')
      const action$  = m.cold('---a---a--', values)
      const expected =        '---b---b--'

      const dependencies = {
        calculateSum: Utils.calculateSum,
      }

      // when ... we sum user coords
      const destination$ = SUT.sumUserCoordsEpic(action$, state$, dependencies)

      // then
      m.equal(destination$, expected, values)
    }))
  })

  // ------------------------------------------------------
  // write an epic that:
  // - responds to a getUserCoords action (with no payload)
  // - get the user coords by calling a ``getUserCoords`` injected dependency
  // - and finally dispatches getUserCoordsSuccess with the result
  //
  // write a test that dispatches getUserCoords twice eg.
  // const action$          = m.cold('---a-----a---', values)
  //
  // unskip the next section to get started
  // ------------------------------------------------------

  describe.skip('3.2. single async value', () => {
    it('should get user current location and succeed with result', marbles(async (m) => {
      // given ... expected actions will be dispatched
      // then ... should get user's current location and succeed with result
      const values = {
        a: getUserCoords(),
        b: { x: 3, y: 5 },
        c: getUserCoordsSuccess({ x: 3, y: 5 }),
      }
      const state$           = m.cold('             ')
      const action$          = m.cold('---a-----a---', values)
      const getUserCoords$   = m.cold('   ---b      ', values)
      const expected         =        '------c-----c'

      const getUserCoordsStub = sandbox.stub().returns(getUserCoords$)

      const dependencies = {
        getUserCoords: getUserCoordsStub,
      }

      // when ... we get user's current coords
      const destination$ = SUT.getUserCoordsEpic(action$, state$, dependencies)

      // then
      await m.equal(destination$, expected, values)
      // ... should have correctly retrieved user coords
      sinon.assert.calledWithExactly(getUserCoordsStub)
    }))
  })

  // ------------------------------------------------------
  // write an epic that:
  // - responds to a streamUserCoords action (with no payload)
  // - and dispatches streamUserCoordsSuccess with every emission ``userCoords$`` injected dependency
  //
  // write a test that dispatches streamUserCoords twice eg.
  // const action$          = m.cold('---a------------a---------', values)
  //
  // unskip the next section to get started
  // ------------------------------------------------------

  describe.skip('3.3. multiple async values', () => {
    it('should get user current location and succeed with result', marbles(async (m) => {
      // given ... expected actions will be dispatched
      // then ... should get user's current location and succeed with result
      const values = {
        a: streamUserCoords(),
        b: { x: 3, y: 5 },
        c: streamUserCoordsSuccess({ x: 3, y: 5 }),
        d: { x: 34, y: 55 },
        e: streamUserCoordsSuccess({ x: 34, y: 55 }),
        f: { x: 123, y: 345 },
        g: streamUserCoordsSuccess({ x: 123, y: 345 }),
        h: { x: 123, y: 666 },
      }
      const state$           = m.cold('                          ')
      const action$          = m.cold('---a------------a---------', values)
      const userCoords$      = m.cold('   ---b--d--f|            ', values)
      const expected         =        '------c--e--g------c--e--g'

      const userCoords$Stub = sandbox.stub().returns(userCoords$)

      const dependencies = {
        userCoords$: userCoords$Stub,
      }

      // when ... we stream user's current coords
      const destination$ = SUT.streamUserCoordsEpic(action$, state$, dependencies)

      // then
      await m.equal(destination$, expected, values)
      // ... should have correctly retrieved user coords
      sinon.assert.calledWithExactly(userCoords$Stub)
    }))
  })
})

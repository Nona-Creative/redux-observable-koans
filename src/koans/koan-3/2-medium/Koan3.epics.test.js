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
      // TODO: fill in here

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
      // TODO: fill in here

      // when ... we get user's current coords
      const destination$ = SUT.getUserCoordsEpic(action$, state$, dependencies)

      // then
      await m.equal(destination$, expected, values)
      // ... should have correctly retrieved user coords
      // TODO: fill in here
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
      // TODO: fill in here

      // when ... we stream user's current coords
      const destination$ = SUT.streamUserCoordsEpic(action$, state$, dependencies)

      // then
      await m.equal(destination$, expected, values)
      // ... should have correctly retrieved user coords
      // TODO: fill in here
    }))
  })
})

import { ofType } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'
import * as R from 'ramda'

import {
  GET_USER_COORDS,
  getUserCoordsSuccess,
  STREAM_USER_COORDS,
  streamUserCoordsSuccess,
  SUM_USER_COORDS,
  sumUserCoordsSuccess
} from '../actions'

// ------------------------------------------------------
// REMEMBER:
// everything you'll need is already imported above
// but feel free to use whatever other tools you want
// ------------------------------------------------------

//---------------------------------
// sum user coords
//---------------------------------

export const sumUserCoordsEpic = (action$, state$, { calculateSum }) => (
  action$.pipe(
    // TODO: fill in here
  )
)

//---------------------------------
// get user coords
//---------------------------------

export const getUserCoordsEpic = (action$, state$, { getUserCoords }) => (
  action$.pipe(
    // TODO: fill in here
  )
)

//---------------------------------
// stream user coords
//---------------------------------

export const streamUserCoordsEpic = (action$, state$, { userCoords$ }) => (
  action$.pipe(
    // TODO: fill in here
  )
)

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
    ofType(SUM_USER_COORDS),
    map(R.prop('payload')),
    map(R.values),
    map(R.apply(calculateSum)),
    // map(([...x]) => calculateSum(...x)), // or this
    map(sumUserCoordsSuccess),
  )
)

//---------------------------------
// get user coords
//---------------------------------

export const getUserCoordsEpic = (action$, state$, { getUserCoords }) => (
  action$.pipe(
    ofType(GET_USER_COORDS),
    switchMap(() => getUserCoords()),
    map(getUserCoordsSuccess),
  )
)

//---------------------------------
// stream user coords
//---------------------------------

export const streamUserCoordsEpic = (action$, state$, { userCoords$ }) => (
  action$.pipe(
    ofType(STREAM_USER_COORDS),
    switchMap(() => userCoords$()),
    map(streamUserCoordsSuccess),
  )
)

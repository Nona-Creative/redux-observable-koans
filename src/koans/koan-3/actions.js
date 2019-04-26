export const SUM_USER_COORDS = 'app/koans/SUM_USER_COORDS'
export const SUM_USER_COORDS_SUCCESS = 'app/koans/SUM_USER_COORDS_SUCCESS'
export const sumUserCoords = ({ x, y }) => ({ type: SUM_USER_COORDS, payload: { x, y } })
export const sumUserCoordsSuccess = (payload) => ({ type: SUM_USER_COORDS_SUCCESS, payload })

export const GET_USER_COORDS = 'app/koans/GET_USER_COORDS'
export const GET_USER_COORDS_SUCCESS = 'app/koans/GET_USER_COORDS_SUCCESS'
export const getUserCoords = () => ({ type: GET_USER_COORDS })
export const getUserCoordsSuccess = ({ x, y }) => ({ type: GET_USER_COORDS_SUCCESS, payload: { x, y } })

export const STREAM_USER_COORDS = 'app/koans/STREAM_USER_COORDS'
export const STREAM_USER_COORDS_SUCCESS = 'app/koans/STREAM_USER_COORDS_SUCCESS'
export const streamUserCoords = () => ({ type: STREAM_USER_COORDS })
export const streamUserCoordsSuccess = ({ x, y }) => ({ type: STREAM_USER_COORDS_SUCCESS, payload: { x, y } })

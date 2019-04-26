export const INIT_APP = 'app/koans/INIT_APP'
export const INIT_APP_SUCCESS = 'app/koans/INIT_APP_SUCCESS'
export const INIT_APP_FAILURE = 'app/koans/INIT_APP_FAILURE'
export const initApp = () => ({ type: INIT_APP })
export const initAppSuccess = () => ({ type: INIT_APP_SUCCESS })
export const initAppFailure = () => ({ type: INIT_APP_FAILURE })

export const RE_INIT_APP = 'app/koans/RE_INIT_APP'
export const reInitApp = () => ({ type: INIT_APP })

export const GET_USER = 'app/koans/GET_USER'
export const GET_USER_SUCCESS = 'app/koans/GET_USER_SUCCESS'
export const GET_USER_FAILURE = 'app/koans/GET_USER_FAILURE'
export const getUser = () => ({ type: GET_USER })
export const getUserSuccess = (payload) => ({ type: GET_USER_SUCCESS, payload })
export const getUserFailure = (message) => ({ type: GET_USER_FAILURE, message })

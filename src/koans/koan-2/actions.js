export const GET_USER_SUCCESS = 'app/koans/GET_USER_SUCCESS'
export const GET_USER_FAILURE = 'app/koans/GET_USER_FAILURE'
export const getUserSuccess = (payload) => ({ type: GET_USER_SUCCESS, payload })
export const getUserFailure = (message) => ({ type: GET_USER_FAILURE, message })

export const GET_PRODUCTS_SUCCESS = 'app/koans/GET_PRODUCTS_SUCCESS'
export const GET_PRODUCTS_FAILURE = 'app/koans/GET_PRODUCTS_FAILURE'
export const getProductsSuccess = (payload) => ({ type: GET_PRODUCTS_SUCCESS, payload })
export const getProductsFailure = (message) => ({ type: GET_PRODUCTS_FAILURE, message })

export const SET_MESSAGE = 'app/koans/SET_MESSAGE'
export const setMessage = (payload) => ({ type: SET_MESSAGE, payload })

export const PERSIST_MESSAGE = 'app/koans/PERSIST_MESSAGE'
export const persistMessage = (payload) => ({ type: PERSIST_MESSAGE, payload })

export const NOMINATE_SUCCESSOR = 'app/koans/NOMINATE_SUCCESSOR'
export const nominateSuccessor = (name) => ({ type: NOMINATE_SUCCESSOR, payload: { name } })

export const USER_IS_ADMIN = 'app/koans/USER_IS_ADMIN'
export const userIsAdmin = () => ({ type: USER_IS_ADMIN })

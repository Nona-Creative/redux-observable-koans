export const BUILD_TRANSACTION = 'app/koans/BUILD_TRANSACTION'
export const BUILD_TRANSACTION_SUCCESS = 'app/koans/BUILD_TRANSACTION_SUCCESS'
export const BUILD_TRANSACTION_FAILURE = 'app/koans/BUILD_TRANSACTION_FAILURE'
export const buildTransaction = (payload) => ({ type: BUILD_TRANSACTION, payload })
export const buildTransactionSuccess = (payload) => ({ type: BUILD_TRANSACTION_SUCCESS, payload })
export const buildTransactionFailure = (message) => ({ type: BUILD_TRANSACTION_FAILURE, message })

export const CREATE_TRANSACTION = 'app/koans/CREATE_TRANSACTION'
export const CREATE_TRANSACTION_SUCCESS = 'app/koans/CREATE_TRANSACTION_SUCCESS'
export const CREATE_TRANSACTION_FAILURE = 'app/koans/CREATE_TRANSACTION_FAILURE'
export const createTransaction = (payload) => ({ type: CREATE_TRANSACTION, payload })
export const createTransactionSuccess = (payload) => ({ type: CREATE_TRANSACTION_SUCCESS, payload })
export const createTransactionFailure = (message) => ({ type: CREATE_TRANSACTION_FAILURE, message })

export const UPDATE_TRANSACTION = 'app/koans/UPDATE_TRANSACTION'
export const UPDATE_TRANSACTION_SUCCESS = 'app/koans/UPDATE_TRANSACTION_SUCCESS'
export const UPDATE_TRANSACTION_FAILURE = 'app/koans/UPDATE_TRANSACTION_FAILURE'
export const updateTransaction = (payload) => ({ type: UPDATE_TRANSACTION, payload })
export const updateTransactionSuccess = (payload) => ({ type: UPDATE_TRANSACTION_SUCCESS, payload })
export const updateTransactionFailure = (message) => ({ type: UPDATE_TRANSACTION_FAILURE, message })

export const PROCESS_TRANSACTION = 'app/koans/PROCESS_TRANSACTION'
export const PROCESS_TRANSACTION_SUCCESS = 'app/koans/PROCESS_TRANSACTION_SUCCESS'
export const PROCESS_TRANSACTION_FAILURE = 'app/koans/PROCESS_TRANSACTION_FAILURE'
export const processTransaction = (payload) => ({ type: PROCESS_TRANSACTION, payload })
export const processTransactionSuccess = (payload) => ({ type: PROCESS_TRANSACTION_SUCCESS, payload })
export const processTransactionFailure = (message) => ({ type: PROCESS_TRANSACTION_FAILURE, message })

export const PROCESS_CURRENT_TRANSACTION = 'app/koans/PROCESS_CURRENT_TRANSACTION'
export const PROCESS_CURRENT_TRANSACTION_SUCCESS = 'app/koans/PROCESS_CURRENT_TRANSACTION_SUCCESS'
export const PROCESS_CURRENT_TRANSACTION_FAILURE = 'app/koans/PROCESS_CURRENT_TRANSACTION_FAILURE'
export const processCurrentTransaction = () => ({ type: PROCESS_CURRENT_TRANSACTION })
export const processCurrentTransactionSuccess = (payload) => ({ type: PROCESS_CURRENT_TRANSACTION_SUCCESS, payload })
export const processCurrentTransactionFailure = (message) => ({ type: PROCESS_CURRENT_TRANSACTION_FAILURE, message })

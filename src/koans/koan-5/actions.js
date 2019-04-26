export const PROCESS_TRANSACTION = 'app/koans/PROCESS_TRANSACTION'
export const PROCESS_TRANSACTION_SUCCESS = 'app/koans/PROCESS_TRANSACTION_SUCCESS'
export const PROCESS_TRANSACTION_FAILURE = 'app/koans/PROCESS_TRANSACTION_FAILURE'
export const processTransaction = ({ amount, targetAccount }) => ({ type: PROCESS_TRANSACTION, payload: { amount, targetAccount } })
export const processTransactionSuccess = (id) => ({ type: PROCESS_TRANSACTION_SUCCESS, payload: { id } })
export const processTransactionFailure = (message) => ({ type: PROCESS_TRANSACTION_FAILURE, message })

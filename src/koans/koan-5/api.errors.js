export const API_ERROR_NOT_FOUND = 'ApiError'
export const API_ERROR_BAD_REQUEST = 'ApiErrorBadRequest'

// ----------------------------------------------
// not found
// ----------------------------------------------

export function ApiNotFoundError(message) {
  this.message = message
  this.name = API_ERROR_NOT_FOUND
}
ApiNotFoundError.prototype = Object.create(Error.prototype)
ApiNotFoundError.prototype.constructor = ApiNotFoundError

// ----------------------------------------------
// bad request
// ----------------------------------------------

export function ApiErrorBadRequest(message) {
  this.message = message
  this.name = API_ERROR_BAD_REQUEST
}
ApiErrorBadRequest.prototype = Object.create(Error.prototype)
ApiErrorBadRequest.prototype.constructor = ApiErrorBadRequest

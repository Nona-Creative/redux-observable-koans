import R from 'ramda'

import { catchError } from 'rxjs/operators'
import { of, throwError } from 'rxjs'

// ----------------------------------------------
// error handling
// ----------------------------------------------

export const catchMapTo = (name, action) => (
  catchError(e => (
    R.propEq('name', name, e)
      ? of(action)
      : throwError(e)
  ))
)

export const catchMapToFn = (name, f) => (
  catchError(e => (
    R.propEq('name', name, e)
      ? f(e)
      : throwError(e)
  ))
)

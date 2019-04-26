import Bluebird from 'bluebird'
import { from } from 'rxjs'

// sync single value
export const calculateSum = (x, y) => x + y

// async single value (promise)
export const getUserCoords = () => Bluebird
  .resolve({ x: 123, y: 123 })
  .delay(100)

// async multiple values (stream)
export const userCoords$ = from([
  { x: 0, y: 0 },
  { x: 4, y: 5 },
  { x: 10, y: 14 },
  { x: 23, y: 12 },
])

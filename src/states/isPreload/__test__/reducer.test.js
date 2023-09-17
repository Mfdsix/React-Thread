import { describe, expect, it } from 'vitest'
import isPreloadReducer from '../reducer'
import { ActionType } from '../action'

describe('isPreloadReducer test', () => {
  it('should return initial state', () => {
    const initialState = true
    const action = {
      tpye: 'UNKNOWN'
    }

    const nextState = isPreloadReducer(initialState, action)

    expect(nextState).toEqual(initialState)
  })

  it('should return correct value when SET_IS_PRELOAD', () => {
    const initialState = null
    const isPreload = false
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload
      }
    }

    const nextState = isPreloadReducer(initialState, action)

    expect(nextState).toEqual(isPreload)
  })
})

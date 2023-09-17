import { describe, expect, it } from 'vitest'
import authUserReducer from '../reducer'
import { ActionType } from '../action'

describe('authUserReducer test', () => {
  it('should return initial state', () => {
    const initialState = null
    const action = {
      tpye: 'UNKNOWN'
    }

    const nextState = authUserReducer(initialState, action)

    expect(nextState).toEqual(initialState)
  })

  it('should return correct authUser when SET_AUTH_USER', () => {
    const initialState = null
    const authUser = {
      id: 'user-123',
      name: 'user'
    }
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser
      }
    }

    const nextState = authUserReducer(initialState, action)

    expect(nextState).toEqual(authUser)
  })

  it('should return null when UNSET_AUTH_USER', () => {
    const initialState = null
    const action = {
      type: ActionType.UNSET_AUTH_USER
    }

    const nextState = authUserReducer(initialState, action)

    expect(nextState).toEqual(null)
  })
})

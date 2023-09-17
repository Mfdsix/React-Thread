import { describe, expect, it } from 'vitest'
import usersReducer from '../reducer'
import { ActionType } from '../action'

describe('usersReducer test', () => {
  it('should return initial state', () => {
    const initialState = []
    const action = {
      tpye: 'UNKNOWN'
    }

    const nextState = usersReducer(initialState, action)

    expect(nextState).toEqual(initialState)
  })

  it('should return correct data when ADD_THREAD', () => {
    const users = [1,2,3].map((item) => `user-${item}`)
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users
      }
    }

    const nextState = usersReducer(users, action)

    expect(nextState.length).toEqual(users.length)
    expect(nextState[0]).toEqual(users[0])
    expect(nextState[1]).toEqual(users[1])
    expect(nextState[2]).toEqual(users[2])
  })
})
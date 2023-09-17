import { describe, expect, it } from 'vitest'
import leaderboardsReducer from '../reducer'
import { ActionType } from '../action'

describe('leaderboardsReducer test', () => {
  it('should return initial state', () => {
    const initialState = []
    const action = {
      tpye: 'UNKNOWN'
    }

    const nextState = leaderboardsReducer(initialState, action)

    expect(nextState).toEqual(initialState)
  })

  it('should return correct data when RECEIVE_LEADERBOARDS', () => {
    const initialState = null
    const leaderboards = [1, 2, 3, 4, 5].map((item) => {
      return `item-${item}`
    })
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards
      }
    }

    const nextState = leaderboardsReducer(initialState, action)

    expect(nextState.length).toEqual(leaderboards.length)
    expect(nextState).toEqual(leaderboards)
  })
})

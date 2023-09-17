import { describe, expect, it } from 'vitest'
import threadsReducer from '../reducer'
import { ActionType, VoteType } from '../action'

describe('threadsReducer test', () => {
  it('should return initial state', () => {
    const initialState = []
    const action = {
      tpye: 'UNKNOWN'
    }

    const nextState = threadsReducer(initialState, action)

    expect(nextState).toEqual(initialState)
  })

  it('should return correct data when ADD_THREAD', () => {
    const thread = {
      id: 'thread-134',
      title: 'thread example',
      category: 'random',
      body: 'thread body'
    }
    const initialState = []
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread
      }
    }

    const nextState = threadsReducer(initialState, action)

    expect(nextState.length).toEqual(1)
    expect(nextState[0]).toEqual(thread)
    expect(nextState[0].id).toEqual(thread.id)
    expect(nextState[0].title).toEqual(thread.title)
  })

  it('should return correct data when SET_STATUS_VOTE_THREAD_ITEM', () => {
    const user = {
      id: 'user-123',
      name: 'user-test'
    }

    const thread = {
      id: 'thread-134',
      title: 'thread example',
      category: 'random',
      body: 'thread body',
      upVotesBy: [],
      downVotesBy: []
    }
    const initialState = [thread]
    const action = {
      type: ActionType.SET_STATUS_VOTE_THREAD_ITEM,
      payload: {
        threadId: thread.id,
        type: VoteType.UPVOTE,
        userId: user.id
      }
    }

    let nextState = threadsReducer(initialState, action)

    expect(nextState[0].upVotesBy.length).toEqual(1)
    expect(nextState[0].upVotesBy[0]).toEqual(user.id)

    const action2 = {
      type: ActionType.SET_STATUS_VOTE_THREAD_ITEM,
      payload: {
        threadId: thread.id,
        type: VoteType.DOWNVOTE,
        userId: user.id
      }
    }

    nextState = threadsReducer(initialState, action2)

    expect(nextState[0].upVotesBy.length).toEqual(0)
    expect(nextState[0].downVotesBy.length).toEqual(1)
    expect(nextState[0].downVotesBy[0]).toEqual(user.id)
  })
})

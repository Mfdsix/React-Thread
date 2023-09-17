import { describe, expect, it } from 'vitest'
import threadDetailReducer from '../reducer'
import { ActionType, VoteType } from '../action'

describe('threadDetailReducer test', () => {
  it('should return initial state', () => {
    const initialState = null
    const action = {
      tpye: 'UNKNOWN'
    }

    const nextState = threadDetailReducer(initialState, action)

    expect(nextState).toEqual(initialState)
  })

  it('should return correct data when RECEIVE_THREAD_DETAIL', () => {
    const initialState = null
    const thread = 'thread-detail'
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        thread
      }
    }

    const nextState = threadDetailReducer(initialState, action)

    expect(nextState).toEqual(thread)
  })

  it('should return correct data when ADD_COMMENT', () => {
    const thread = {
      id: 'thread-134',
      comments: []
    }
    const initialState = thread
    const comment = 'comment'
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: {
          threadId: thread.id,
          content: comment
        }
      }
    }

    const nextState = threadDetailReducer(initialState, action)

    expect(nextState.comments.length).toEqual(1)
    expect(nextState.comments[0].content).toEqual(comment)
  })

  it('should return correct data when SET_STATUS_VOTE_THREAD', () => {
    const user = {
      id: 'user-123',
      name: 'user-test'
    }

    const thread = {
      id: 'thread-134',
      upVotesBy: [],
      downVotesBy: []
    }
    const initialState = thread
    const action = {
      type: ActionType.SET_STATUS_VOTE_THREAD,
      payload: {
        threadId: thread.id,
        type: VoteType.UPVOTE,
        userId: user.id
      }
    }

    let nextState = threadDetailReducer(initialState, action)

    expect(nextState.upVotesBy.length).toEqual(1)
    expect(nextState.upVotesBy[0]).toEqual(user.id)

    const action2 = {
      type: ActionType.SET_STATUS_VOTE_THREAD,
      payload: {
        threadId: thread.id,
        type: VoteType.DOWNVOTE,
        userId: user.id
      }
    }

    nextState = threadDetailReducer(initialState, action2)

    expect(nextState.upVotesBy.length).toEqual(0)
    expect(nextState.downVotesBy.length).toEqual(1)
    expect(nextState.downVotesBy[0]).toEqual(user.id)
  })

  it('should return correct data when SET_STATUS_VOTE_COMMENT', () => {
    const user = {
      id: 'user-123',
      name: 'user-test'
    }
    const thread = {
      id: 'thread-134',
      comments: [
        {
          id: 'comment-123',
          upVotesBy: [],
          downVotesBy: []
        }
      ]
    }
    const initialState = threadDetailReducer(thread, {
      type: 'UNKNOWN'
    })

    const action = {
      type: ActionType.SET_STATUS_VOTE_COMMENT,
      payload: {
        threadId: thread.id,
        commentId: initialState.comments[0].id,
        type: VoteType.UPVOTE,
        userId: user.id
      }
    }

    const upVotedState = threadDetailReducer(initialState, action)

    expect(upVotedState.comments[0].upVotesBy.length).toEqual(1)
    expect(upVotedState.comments[0].upVotesBy[0]).toEqual(user.id)

    const action3 = {
      type: ActionType.SET_STATUS_VOTE_COMMENT,
      payload: {
        threadId: thread.id,
        commentId: initialState.comments[0].id,
        type: VoteType.DOWNVOTE,
        userId: user.id
      }
    }

    const downVotedState = threadDetailReducer(initialState, action3)

    expect(downVotedState.comments[0].upVotesBy.length).toEqual(0)
    expect(downVotedState.comments[0].downVotesBy.length).toEqual(1)
    expect(downVotedState.comments[0].downVotesBy[0]).toEqual(user.id)
  })
})

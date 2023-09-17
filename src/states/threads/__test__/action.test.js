import { afterEach, beforeEach, describe, expect, vi, it } from 'vitest'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {
  VoteType,
  addThreadActionCreator,
  asyncAddThread,
  asyncSetStatusVoteThread,
  setStatusVoteThreadActionCreator
} from '../action'
import { ThreadRequest, VoteRequest } from '../../../data/api/dicoding-forum'

const threadSuccessResponse = {
  error: false,
  data: {
    thread: {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0
    }
  }
}
const threadErrorResponse = {
  error: true,
  message: 'Failed'
}

describe(' thunk', () => {
  beforeEach(() => {
    ThreadRequest._create = ThreadRequest.create
  })
  afterEach(() => {
    ThreadRequest.create = ThreadRequest._create

    delete ThreadRequest._create
  })

  it('when API error response', async () => {
    ThreadRequest.create = (param) => Promise.resolve(threadErrorResponse)

    const dispatch = vi.fn()
    const payload = {
      title: 'title',
      category: 'category',
      body: 'body'
    }

    const result = await asyncAddThread(payload)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).not.toHaveBeenCalledWith(
      addThreadActionCreator(threadSuccessResponse.data.detailThread)
    )
    expect(result).toEqual(false)
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
  it('when API success response', async () => {
    ThreadRequest.create = (param) => Promise.resolve(threadSuccessResponse)

    const dispatch = vi.fn()
    const payload = {
      title: 'title',
      category: 'category',
      body: 'body'
    }

    const result = await asyncAddThread(payload)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(
      addThreadActionCreator(threadSuccessResponse.data.thread)
    )
    expect(result).toEqual(true)
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})

describe('asyncSetStatusVoteThread thunk', () => {
  beforeEach(() => {
    VoteRequest._upVote = VoteRequest.upVote
    VoteRequest._downVote = VoteRequest.downVote
  })
  afterEach(() => {
    VoteRequest.upVote = VoteRequest._upVote
    VoteRequest.downVote = VoteRequest._downVote

    delete VoteRequest._upVote
    delete VoteRequest._downVote
  })

  it('when API error response', async () => {
    VoteRequest.upVote = (param) =>
      Promise.resolve({
        error: true
      })
    VoteRequest.downVote = (param) =>
      Promise.resolve({
        error: true
      })

    const dispatch = vi.fn()
    const getState = () => ({
      authUser: {
        id: 'user-123'
      }
    })

    const upVotePayload = {
      threadId: 'thread-123',
      type: VoteType.UPVOTE,
      userId: 'user-123'
    }
    await asyncSetStatusVoteThread(upVotePayload)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    // twice because need rollback
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      setStatusVoteThreadActionCreator(upVotePayload)
    )
    expect(dispatch).toHaveBeenCalledWith(hideLoading())

    const dispatch2 = vi.fn()
    const downVotePayload = {
      threadId: 'thread-123',
      type: VoteType.DOWNVOTE,
      userId: 'user-123'
    }
    await asyncSetStatusVoteThread(downVotePayload)(dispatch2, getState)

    expect(dispatch2).toHaveBeenCalledWith(showLoading())
    // twice because need rollback
    expect(dispatch2).toHaveBeenNthCalledWith(
      2,
      setStatusVoteThreadActionCreator(downVotePayload)
    )
    expect(dispatch2).toHaveBeenCalledWith(hideLoading())
  })

  it('when API success response', async () => {
    VoteRequest.upVote = (param) =>
      Promise.resolve({
        error: false
      })
    VoteRequest.downVote = (param) =>
      Promise.resolve({
        error: false
      })

    const dispatch = vi.fn()
    const getState = () => ({
      authUser: {
        id: 'user-123'
      }
    })

    const upVotePayload = {
      threadId: 'thread-123',
      type: VoteType.UPVOTE,
      userId: 'user-123'
    }
    await asyncSetStatusVoteThread(upVotePayload)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    // twice because need rollback
    expect(dispatch).toHaveBeenCalledWith(
      setStatusVoteThreadActionCreator(upVotePayload)
    )
    expect(dispatch).toHaveBeenCalledWith(hideLoading())

    const dispatch2 = vi.fn()
    const downVotePayload = {
      threadId: 'thread-123',
      type: VoteType.DOWNVOTE,
      userId: 'user-123'
    }
    await asyncSetStatusVoteThread(downVotePayload)(dispatch2, getState)

    expect(dispatch2).toHaveBeenCalledWith(showLoading())
    // twice because need rollback
    expect(dispatch2).toHaveBeenCalledWith(
      setStatusVoteThreadActionCreator(downVotePayload)
    )
    expect(dispatch2).toHaveBeenCalledWith(hideLoading())
  })
})

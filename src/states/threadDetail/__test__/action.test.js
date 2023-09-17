import { afterEach, beforeEach, describe, expect, vi, it } from 'vitest'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {
  asyncGetDetailThread,
  asyncAddComment,
  asyncSetStatusVoteComment,
  asyncSetStatusVoteThread,
  reveiceThreadDetailActionCreator,
  addCommentActionCreator,
  VoteType,
  setStatusVoteThreadActionCreator,
  setStatusVoteCommentActionCreator
} from '../action'
import {
  ThreadRequest,
  CommentRequest,
  VoteRequest
} from '../../../data/api/dicoding-forum'

const threadSuccessResponse = {
  error: false,
  data: {
    detailThread: {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg'
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg'
          },
          upVotesBy: [],
          downVotesBy: []
        }
      ]
    }
  }
}
const threadErrorResponse = {
  error: true,
  message: 'Failed'
}

describe('asyncGetDetailThread thunk', () => {
  beforeEach(() => {
    ThreadRequest._getById = ThreadRequest.getById
  })
  afterEach(() => {
    ThreadRequest.getById = ThreadRequest._getById

    delete ThreadRequest._getById
  })

  it('when API error response', async () => {
    ThreadRequest.getById = (threadId) => Promise.resolve(threadErrorResponse)

    const dispatch = vi.fn()
    const threadId = 'thread-1'

    await asyncGetDetailThread(threadId)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).not.toHaveBeenCalledWith(
      reveiceThreadDetailActionCreator(threadSuccessResponse.data.detailThread)
    )
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
  it('when API success response', async () => {
    ThreadRequest.getById = (param) => Promise.resolve(threadSuccessResponse)

    const dispatch = vi.fn()
    const threadId = 'thread-1'

    await asyncGetDetailThread(threadId)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(
      reveiceThreadDetailActionCreator(threadSuccessResponse.data.detailThread)
    )
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})

const commentSuccessResponse = {
  error: false,
  data: {
    comment: {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      upVotesBy: [],
      downVotesBy: [],
      owner: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com'
      }
    }
  }
}
const commentErrorResponse = {
  error: true,
  message: 'Failed'
}

describe('asyncAddComment thunk', () => {
  beforeEach(async () => {
    CommentRequest._create = CommentRequest.create
  })
  afterEach(() => {
    CommentRequest.create = CommentRequest._create

    delete CommentRequest._create
  })

  it('when API error response', async () => {
    CommentRequest.create = (payload) => Promise.resolve(commentErrorResponse)

    const threadId = 'thread-1'
    const dispatch = vi.fn()

    await asyncAddComment({
      threadId,
      content: 'comment'
    })(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).not.toHaveBeenCalledWith(
      addCommentActionCreator(commentSuccessResponse.data.comment)
    )
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('when API success response', async () => {
    CommentRequest.create = (payload) =>
      Promise.resolve(commentSuccessResponse)

    const threadId = 'thread-1'
    const dispatch = vi.fn()

    const result = await asyncAddComment({
      threadId,
      content: 'comment'
    })(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(
      addCommentActionCreator(commentSuccessResponse.data.comment)
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
    VoteRequest.upVote = (param) => Promise.resolve({
      error: true
    })
    VoteRequest.downVote = (param) => Promise.resolve({
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
    expect(dispatch).toHaveBeenNthCalledWith(2, setStatusVoteThreadActionCreator(upVotePayload))
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
    expect(dispatch2).toHaveBeenNthCalledWith(2, setStatusVoteThreadActionCreator(downVotePayload))
    expect(dispatch2).toHaveBeenCalledWith(hideLoading())
  })

  it('when API success response', async () => {
    VoteRequest.upVote = (param) => Promise.resolve({
      error: false
    })
    VoteRequest.downVote = (param) => Promise.resolve({
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
    expect(dispatch).toHaveBeenCalledWith(setStatusVoteThreadActionCreator(upVotePayload))
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
    expect(dispatch2).toHaveBeenCalledWith(setStatusVoteThreadActionCreator(downVotePayload))
    expect(dispatch2).toHaveBeenCalledWith(hideLoading())
  })
})

describe('asyncSetStatusVoteComment thunk', () => {
  beforeEach(() => {
    VoteRequest._commentUpVote = VoteRequest.commentUpVote
    VoteRequest._commentDownVote = VoteRequest.commentDownVote
  })
  afterEach(() => {
    VoteRequest.commentUpVote = VoteRequest._commentUpVote
    VoteRequest.commentDownVote = VoteRequest._commentDownVote

    delete VoteRequest._commentUpVote
    delete VoteRequest._commentDownVote
  })

  it('when API error response', async () => {
    VoteRequest.commentUpVote = (param) => Promise.resolve({
      error: true
    })
    VoteRequest.commentDownVote = (param) => Promise.resolve({
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
      commentId: 'comment-123',
      type: VoteType.UPVOTE,
      userId: 'user-123'
    }
    await asyncSetStatusVoteComment(upVotePayload)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    // twice because need rollback
    expect(dispatch).toHaveBeenNthCalledWith(2, setStatusVoteCommentActionCreator(upVotePayload))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())

    const dispatch2 = vi.fn()
    const downVotePayload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      type: VoteType.DOWNVOTE,
      userId: 'user-123'
    }
    await asyncSetStatusVoteComment(downVotePayload)(dispatch2, getState)

    expect(dispatch2).toHaveBeenCalledWith(showLoading())
    // twice because need rollback
    expect(dispatch2).toHaveBeenNthCalledWith(2, setStatusVoteCommentActionCreator(downVotePayload))
    expect(dispatch2).toHaveBeenCalledWith(hideLoading())
  })

  it('when API success response', async () => {
    VoteRequest.commentUpVote = (param) => Promise.resolve({
      error: false
    })
    VoteRequest.commentDownVote = (param) => Promise.resolve({
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
      commentId: 'comment-123',
      type: VoteType.UPVOTE,
      userId: 'user-123'
    }
    await asyncSetStatusVoteComment(upVotePayload)(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    // twice because need rollback
    expect(dispatch).toHaveBeenCalledWith(setStatusVoteCommentActionCreator(upVotePayload))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())

    const dispatch2 = vi.fn()
    const downVotePayload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      type: VoteType.DOWNVOTE,
      userId: 'user-123'
    }
    await asyncSetStatusVoteComment(downVotePayload)(dispatch2, getState)

    expect(dispatch2).toHaveBeenCalledWith(showLoading())
    // twice because need rollback
    expect(dispatch2).toHaveBeenCalledWith(setStatusVoteCommentActionCreator(downVotePayload))
    expect(dispatch2).toHaveBeenCalledWith(hideLoading())
  })
})

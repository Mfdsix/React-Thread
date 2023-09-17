import { afterEach, beforeEach, describe, expect, vi, it } from 'vitest'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { asyncPopulateUsersAndThreads } from '../action'
import { AuthRequest, ThreadRequest } from '../../../data/api/dicoding-forum'
import { receiveUsersActionCreator } from '../../users/action'
import { reveiceThreadsActionCreator } from '../../threads/action'

const threadSuccessResponse = {
  error: false,
  data: {
    threads: [
      {
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
    ]
  }
}
const threadErrorResponse = {
  error: true,
  message: 'Failed'
}
const userSuccessResponse = {
  error: false,
  data: {
    users: [
      {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg'
      }
    ]
  }
}
const userErrorResponse = {
  error: true,
  message: 'Failed'
}

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    AuthRequest._getAllUser = AuthRequest.getAllUser
    ThreadRequest._getAll = AuthRequest.getAll
  })
  afterEach(() => {
    AuthRequest.getAllUser = AuthRequest._getAllUser
    ThreadRequest.getAll = ThreadRequest._getAllUser

    delete AuthRequest._getAllUser
    delete ThreadRequest._getAllUser
  })

  it('when all API error response', async () => {
    ThreadRequest.getAll = () => Promise.resolve(threadErrorResponse)
    AuthRequest.getAllUser = () => Promise.resolve(userErrorResponse)

    const dispatch = vi.fn()

    await asyncPopulateUsersAndThreads()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).not.toHaveBeenCalledWith(
      receiveUsersActionCreator(userSuccessResponse.data.users)
    )
    expect(dispatch).not.toHaveBeenCalledWith(
      reveiceThreadsActionCreator(userSuccessResponse.data.users)
    )
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('when one of API error response', async () => {
    ThreadRequest.getAll = () => Promise.resolve(threadSuccessResponse)
    AuthRequest.getAllUser = () => Promise.resolve(userErrorResponse)

    const dispatch = vi.fn()

    await asyncPopulateUsersAndThreads()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).not.toHaveBeenCalledWith(
      receiveUsersActionCreator(userSuccessResponse.data.users)
    )
    expect(dispatch).toHaveBeenCalledWith(
      reveiceThreadsActionCreator(threadSuccessResponse.data.threads)
    )
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('when one of API error response 2', async () => {
    ThreadRequest.getAll = () => Promise.resolve(threadErrorResponse)
    AuthRequest.getAllUser = () => Promise.resolve(userSuccessResponse)

    const dispatch = vi.fn()

    await asyncPopulateUsersAndThreads()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(userSuccessResponse.data.users)
    )
    expect(dispatch).not.toHaveBeenCalledWith(
      reveiceThreadsActionCreator(threadSuccessResponse.data.threads)
    )
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('when all API success response', async () => {
    ThreadRequest.getAll = () => Promise.resolve(threadSuccessResponse)
    AuthRequest.getAllUser = () => Promise.resolve(userSuccessResponse)

    const dispatch = vi.fn()

    await asyncPopulateUsersAndThreads()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(userSuccessResponse.data.users)
    )
    expect(dispatch).toHaveBeenCalledWith(
      reveiceThreadsActionCreator(threadSuccessResponse.data.threads)
    )
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})

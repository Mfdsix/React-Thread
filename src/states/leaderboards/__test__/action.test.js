import { afterEach, beforeEach, describe, expect, vi, it } from 'vitest'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { asyncReceiveLeaderboards, receiveLeaderboardsActionCreator } from '../action'
import { LeaderBoardRequest } from '../../../data/api/dicoding-forum'

const leaderBoardsSuccessResponse = {
  error: false,
  data: {
    leaderboards: [
      {
        user: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg'
        },
        score: 10
      },
      {
        user: {
          id: 'users-2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://generated-image-url.jpg'
        },
        score: 5
      }
    ]
  }
}
const leaderBoardsErrorResponse = {
  error: true,
  message: 'Failed'
}

window.alert = vi.fn()

describe('asyncReceiveLeaderboards thunk', () => {
  beforeEach(() => {
    LeaderBoardRequest._getAll = LeaderBoardRequest.getAll
  })
  afterEach(() => {
    LeaderBoardRequest.getAll = LeaderBoardRequest._getAll

    delete LeaderBoardRequest._getAll
  })

  it('when API error response', async () => {
    LeaderBoardRequest.getAll = () =>
      Promise.resolve(leaderBoardsErrorResponse)

    const dispatch = vi.fn()

    await asyncReceiveLeaderboards()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).not.toHaveBeenCalledWith(receiveLeaderboardsActionCreator(leaderBoardsSuccessResponse.data.leaderboards))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('when API success response', async () => {
    LeaderBoardRequest.getAll = () =>
      Promise.resolve(leaderBoardsSuccessResponse)

    const dispatch = vi.fn()

    await asyncReceiveLeaderboards()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardsActionCreator(leaderBoardsSuccessResponse.data.leaderboards))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})

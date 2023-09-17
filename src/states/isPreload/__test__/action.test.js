import { afterEach, beforeEach, describe, expect, vi, it } from 'vitest'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { asyncSetIsPreload, setIsPreloadActionCreator } from '../action'
import { AuthRequest } from '../../../data/api/dicoding-forum'
import { setAuthUserActionCreator, unsetAuthUserActionCreator } from '../../authUser/action'

const profileSuccessResponse = {
  error: false,
  data: {
    user: {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg'
    }
  }
}

const profileErrorResponse = {
  error: true,
  message: 'Failed to get profile'
}

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    AuthRequest._profile = AuthRequest.profile
  })
  afterEach(() => {
    AuthRequest.profile = AuthRequest._profile

    delete AuthRequest._profile
  })

  it('when API error response', async () => {
    AuthRequest.profile = () => Promise.resolve(profileErrorResponse)

    const dispatch = vi.fn()

    await asyncSetIsPreload()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator())
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('when API success response', async () => {
    AuthRequest.profile = () => Promise.resolve(profileSuccessResponse)

    const dispatch = vi.fn()

    await asyncSetIsPreload()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(profileSuccessResponse.data.user))
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})

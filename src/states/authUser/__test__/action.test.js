import { afterEach, beforeEach, describe, expect, vi, it } from 'vitest'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {
  asyncSetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator
} from '../action'
import { AuthRequest } from '../../../data/api/dicoding-forum'

const loginSuccessResponse = {
  error: false,
  data: {
    token: 'real-jwt-token'
  }
}
const loginErrorResponse = {
  error: true,
  message: 'Failed to login'
}
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

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    AuthRequest._login = AuthRequest.login
    AuthRequest._profile = AuthRequest.profile
  })
  afterEach(() => {
    AuthRequest.login = AuthRequest._login
    AuthRequest.profile = AuthRequest._profile

    delete AuthRequest._login
    delete AuthRequest._profile
  })

  it('when API error response', async () => {
    const payload = {
      email: 'fake@mail.com',
      password: 'fakepwd123'
    }
    AuthRequest.login = () => Promise.resolve(loginErrorResponse)
    const dispatch = vi.fn()

    const result = await asyncSetAuthUser(payload)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(result).toEqual(false)
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('when API success response', async () => {
    const payload = {
      email: 'fake@mail.com',
      password: 'fakepwd123'
    }
    AuthRequest.login = () => Promise.resolve(loginSuccessResponse)
    AuthRequest.profile = () => Promise.resolve(profileSuccessResponse)

    const dispatch = vi.fn()

    const result = await asyncSetAuthUser(payload)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(profileSuccessResponse.data.user))
    expect(result).toEqual(true)
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})

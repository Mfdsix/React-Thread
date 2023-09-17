import { afterEach, beforeEach, describe, expect, vi, it } from 'vitest'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { asyncRegisterUser } from '../action'
import { AuthRequest } from '../../../data/api/dicoding-forum'

const registerSuccessResponse = {
  error: false,
  data: {
    user: {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg'
    }
  }
}
const registerErrorResponse = {
  error: true,
  message: 'Failed'
}

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    AuthRequest._register = AuthRequest.register
  })
  afterEach(() => {
    AuthRequest.register = AuthRequest._register

    delete AuthRequest._register
  })

  it('when all API error response', async () => {
    AuthRequest.register = (params) => Promise.resolve(registerErrorResponse)

    const dispatch = vi.fn()

    const payload = {
      name: 'new username',
      email: 'works@mail.com',
      password: 'super-secret-098'
    }
    const result = await asyncRegisterUser(payload)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(result).toEqual(false)
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('when one of API error response', async () => {
    AuthRequest.register = (params) => Promise.resolve(registerSuccessResponse)

    const dispatch = vi.fn()

    const payload = {
      name: 'new username',
      email: 'works@mail.com',
      password: 'super-secret-098'
    }
    const result = await asyncRegisterUser(payload)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(result).toEqual(true)
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})

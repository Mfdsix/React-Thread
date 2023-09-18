import React from 'react'
import {
  afterEach,
  describe, expect, it
} from 'vitest'

import LoginForm from '../LoginForm'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import {
  screen, render, cleanup
} from '@testing-library/react'

expect.extend(matchers)

const onFormSubmit = (params) => {}

describe('LoginForm component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should handle email typing correctly', async () => {
    const email = 'test@mail.com'

    render(<LoginForm onSubmit={onFormSubmit}/>)
    const emailInput = await screen.getByPlaceholderText('Email')

    await userEvent.type(emailInput, email)

    expect(emailInput).toHaveValue(email)
  })

  it('should handle password typing correctly', async () => {
    const password = 'super-secret-123'

    render(<LoginForm onSubmit={onFormSubmit}/>)
    const passwordInput = await screen.getByPlaceholderText('Password')

    await userEvent.type(passwordInput, password)

    expect(passwordInput).toHaveValue(password)
  })

  it('should call onFormSubmit when Login click', async () => {
    const email = 'test@mail.com'
    const password = 'super-secret-123'

    render(<LoginForm onSubmit={onFormSubmit}/>)
    const emailInput = await screen.getByPlaceholderText('Email')
    const passwordInput = await screen.getByPlaceholderText('Password')
    const loginButton = await screen.getByRole('button', {
      name: 'Login'
    })

    await userEvent.type(emailInput, email)
    await userEvent.type(passwordInput, password)
    await userEvent.click(loginButton)

    expect(onFormSubmit).toBeCalledWith(
      email,
      password
    )
  })
})

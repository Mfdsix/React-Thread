import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import LoginForm from '../LoginForm'
import { BrowserRouter } from 'react-router-dom'

const onFormSubmit = vi.fn()

describe('LoginForm component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should handle email typing correctly', async () => {
    const email = 'test@mail.com'

    render(
      <BrowserRouter>
        <LoginForm onSubmit={onFormSubmit} />
      </BrowserRouter>
    )
    const emailInput = await screen.getByPlaceholderText('Email')

    await userEvent.type(emailInput, email)

    expect(emailInput).toHaveValue(email)
  })

  it('should handle password typing correctly', async () => {
    const password = 'super-secret-123'

    render(
      <BrowserRouter>
        <LoginForm onSubmit={onFormSubmit} />
      </BrowserRouter>
    )
    const passwordInput = await screen.getByPlaceholderText('Password')

    await userEvent.type(passwordInput, password)

    expect(passwordInput).toHaveValue(password)
  })

  it('should call onFormSubmit when Login click', async () => {
    const email = 'test@mail.com'
    const password = 'super-secret-123'

    render(
      <BrowserRouter>
        <LoginForm onSubmit={onFormSubmit} />
      </BrowserRouter>
    )
    const emailInput = await screen.getByPlaceholderText('Email')
    const passwordInput = await screen.getByPlaceholderText('Password')
    const loginButton = await screen.getByRole('button', {
      name: 'Login'
    })

    await userEvent.type(emailInput, email)
    await userEvent.type(passwordInput, password)
    await userEvent.click(loginButton)

    expect(onFormSubmit).toBeCalledWith({ email, password })
  })
})

import React from 'react'

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import RegisterForm from '../RegisterForm'
import { BrowserRouter } from 'react-router-dom'

const onFormSubmit = vi.fn()

describe('RegisterForm component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should handle name typing correctly', async () => {
    const name = 'name-123'

    render(
      <BrowserRouter>
        <RegisterForm onSubmit={onFormSubmit} />
      </BrowserRouter>
    )
    const nameInput = await screen.getByPlaceholderText('Name')

    await userEvent.type(nameInput, name)

    expect(nameInput).toHaveValue(name)
  })

  it('should handle email typing correctly', async () => {
    const email = 'test@mail.com'

    render(
      <BrowserRouter>
        <RegisterForm onSubmit={onFormSubmit} />
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
        <RegisterForm onSubmit={onFormSubmit} />
      </BrowserRouter>
    )
    const passwordInput = await screen.getByPlaceholderText('Password')

    await userEvent.type(passwordInput, password)

    expect(passwordInput).toHaveValue(password)
  })

  it('should call onFormSubmit when Register click', async () => {
    const name = 'user-123'
    const email = 'test@mail.com'
    const password = 'super-secret-123'

    render(
      <BrowserRouter>
        <RegisterForm onSubmit={onFormSubmit} />
      </BrowserRouter>
    )
    const nameInput = await screen.getByPlaceholderText('Name')
    const emailInput = await screen.getByPlaceholderText('Email')
    const passwordInput = await screen.getByPlaceholderText('Password')
    const registerButton = await screen.getByRole('button', {
      name: 'Register'
    })

    await userEvent.type(nameInput, name)
    await userEvent.type(emailInput, email)
    await userEvent.type(passwordInput, password)
    await userEvent.click(registerButton)

    expect(onFormSubmit).toBeCalledWith({ name, email, password })
  })
})

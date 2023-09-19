import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/Auth'
import LoginForm from '../../components/auth/LoginForm'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom/dist'
import { asyncSetAuthUser } from '../../states/authUser/action'

function Login () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formLoading, setFormLoading] = useState(false)

  const onFormSubmit = async ({
    email, password
  }) => {
    setFormLoading(true)
    const isLoggedIn = await dispatch(
      asyncSetAuthUser({
        email,
        password
      })
    )
    setFormLoading(false)

    if (isLoggedIn) {
      navigate('/')
    }
  }

  return (
    <>
      <AuthLayout>
        <div className="auth__card">
          <div className="auth__header">
            <h3 className="auth__title">Login</h3>
            <div className="auth__description">
              Please login to access your notes
            </div>
          </div>

          <LoginForm onSubmit={onFormSubmit} isLoading={formLoading}/>
        </div>
      </AuthLayout>
    </>
  )
}

export default Login

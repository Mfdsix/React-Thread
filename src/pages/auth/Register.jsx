import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/Auth'
import RegisterForm from '../../components/auth/RegisterForm'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom/dist'
import { asyncRegisterUser } from '../../states/users/action'

function Register () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formLoading, setFormLoading] = useState(false)

  const onFormSubmit = async ({
    name, email, password
  }) => {
    setFormLoading(true)
    const isRegistered = await dispatch(
      asyncRegisterUser({
        name,
        email,
        password
      })
    )
    setFormLoading(false)

    if (isRegistered) {
      navigate('/')
    }
  }

  return (
    <>
      <AuthLayout>
        <div className="auth__card">
          <div className="auth__header">
            <h3 className="auth__title">Register</h3>
            <div className="auth__desc">
              Calm down, register your account here
            </div>
          </div>

          <RegisterForm onSubmit={onFormSubmit} isLoading={formLoading}/>
        </div>
      </AuthLayout>
    </>
  )
}

export default Register

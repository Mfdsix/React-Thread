import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  asyncSetAuthUser
} from '../../states/authUser/action'

function LoginForm () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [formLoading, setFormLoading] = useState(false)
  const [formDisabled, setFormDisabled] = useState(false)

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()

    dispatch(asyncSetAuthUser({
      email, password
    }))

    navigate('/')
  }

  useEffect(() => {
    if (!email || !password) {
      if (!email) setEmailError('Email must be filled')
      if (!password) setPasswordError('Password must be filled')

      setFormDisabled(true)
    }

    return () => {
      setEmailError('')
      setPasswordError('')
      setFormDisabled(false)
    }
  }, [email, password])

  return (
            <>
              <div className="auth__body">
                <form onSubmit={onFormSubmit}>
                  <div className="form__group form__limit__char">
                    <input
                      value={email}
                      onChange={onEmailChange}
                      type="email"
                      placeholder="Email"
                      className="form__input"
                    />
                    {emailError && (
                      <span className="form__invalid__feedback">
                        *( {emailError}
                      </span>
                    )}
                  </div>

                  <div className="form__group form__limit__char">
                    <input
                      value={password}
                      onChange={onPasswordChange}
                      type="password"
                      placeholder="Password"
                      className="form__input"
                    />
                    {passwordError && (
                      <span className="form__invalid__feedback">
                        *( {passwordError}
                      </span>
                    )}
                  </div>

                  <div className="form__action flex__end">
                    <Link className="btn btn__transparent" to="/register">
                      Register
                    </Link>
                    <button
                      disabled={formDisabled || formLoading}
                      type="submit"
                      className="btn btn__submit"
                    >
                      {formLoading ? <FaSpinner /> : 'Login'}
                    </button>
                  </div>
                </form>
              </div>
            </>
  )
}

export default LoginForm

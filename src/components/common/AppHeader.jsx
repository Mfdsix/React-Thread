import React from 'react'
import { Link } from 'react-router-dom'

import { FaSignOutAlt } from 'react-icons/fa'
import {
  asyncUnsetAuthUser
} from '../../states/authUser/action'
import { useDispatch, useSelector } from 'react-redux'

function AppHeader () {
  const {
    authUser
  } = useSelector((states) => states)
  const dispatch = useDispatch()

  const logout = (e) => {
    e.preventDefault()

    const confirm = confirm('Logout from application ?')
    if (confirm) {
      dispatch(asyncUnsetAuthUser())
    }
  }

  return (
                <header>
                  <div className="header__brand">
                    <Link to="/">
                      <h1>Puth&apos;s Forum</h1>
                    </Link>
                  </div>
                  <div className="header__profile">
                    <h3 className="header__username">{ authUser ? authUser.name : 'Guest' }</h3>
                    <img
                      className="header__image"
                      src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                      alt="User"
                    />

                    {
                      authUser
                        ? <button
                      onClick={logout}
                      className="btn btn__transparent"
                    >
                      <FaSignOutAlt />
                    </button>
                        : <Link to="/login">Login</Link>}
                  </div>
                </header>
  )
}

export default AppHeader

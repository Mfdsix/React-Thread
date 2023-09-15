import React from 'react'
import AppHeader from '../common/AppHeader'
import AppFooter from '../common/AppFooter'
import PropTypes from 'prop-types'

import { UserConsumer } from '../../data/context/UserContext'
import { useSelector } from 'react-redux'

function UserLayout ({ needAuth = true, children }) {
  const {
    authUser
  } = useSelector((states) => states)

  if (!authUser) {
    alert('Anda harus login terlebih dahulu')
    return (window.location.href = '/login')
  }

  return (
    <>
      <AppHeader />
      <main>{children}</main>
      <AppFooter />
    </>
  )
}

UserLayout.propTypes = {
  needAuth: PropTypes.bool,
  children: PropTypes.element
}

export default UserLayout

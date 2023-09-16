import React from 'react'
import AppHeader from '../common/AppHeader'
import AppFooter from '../common/AppFooter'
import PropTypes from 'prop-types'

function UserLayout ({ needAuth = true, children }) {
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

import React from 'react'
import AppFooter from '../common/AppFooter'
import PropTypes from 'prop-types'

function AuthLayout ({ children }) {
  return (
    <>
      <main>{children}</main>
      <AppFooter />
    </>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.element
}

export default AuthLayout

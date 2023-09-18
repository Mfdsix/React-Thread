import {
  AuthRequest
} from '../../data/api/dicoding-forum'
import { setAccessToken } from '../../data/api/http'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER'
}

function setAuthUserActionCreator (authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser
    }
  }
}

function unsetAuthUserActionCreator () {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null
    }
  }
}

function asyncSetAuthUser ({ email, password }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())

      const { error: loginError, message: loginMessage, data: loginData } = await AuthRequest.login({
        email,
        password
      })

      if (loginError) {
        dispatch(unsetAuthUserActionCreator())
        if(typeof window !== 'undefined') alert(loginMessage)
        return false
      }
      if (typeof window !== 'undefined') setAccessToken(loginData.token)

      const { error: profileError, message: profileMessage, data: profileData } = await AuthRequest.profile()

      if (profileError) {
        dispatch(unsetAuthUserActionCreator())
        if(typeof window !== 'undefined') alert(profileMessage)
        return false
      };

      dispatch(setAuthUserActionCreator(profileData.user))
      return true
    } catch (error) {
      dispatch(unsetAuthUserActionCreator())
      if(typeof window !== 'undefined') alert(error.message)
      return false
    } finally {
      dispatch(hideLoading())
    }
  }
}

function asyncUnsetAuthUser () {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator())
    setAccessToken(null)
  }
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser
}

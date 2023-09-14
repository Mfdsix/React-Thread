import {
  AuthRequest
} from '../../data/api/dicoding-forum'
import { setAccessToken } from '../../data/api/http'

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
      const { error: loginError, message: loginMessage, data: loginData } = await AuthRequest.login({
        email,
        password
      })

      if (loginError) return alert(loginMessage)
      setAccessToken(loginData.token)

      const { error: profileError, message: profileMessage, data: profileData } = await AuthRequest.profile()
      if (profileError) {
        dispatch(unsetAuthUserActionCreator())
        return alert(profileMessage)
      };

      dispatch(setAuthUserActionCreator(profileData))
    } catch (error) {
      dispatch(unsetAuthUserActionCreator())
      alert(error.message)
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

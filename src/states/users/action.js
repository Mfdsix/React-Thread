import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { AuthRequest } from '../../data/api/dicoding-forum'

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS'
}

function receiveUsersActionCreator (users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users
    }
  }
}

function asyncRegisterUser ({ name, email, password }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      const { error, message } = await AuthRequest.register({
        name,
        email,
        password
      })

      if (error) {
        if (this == this.window) window.alert(message)
        return false
      }

      return true
    } catch (error) {
      if (this == this.window) window.alert(error.message)
      return false
    } finally {
      dispatch(hideLoading())
    }
  }
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser
}

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
  return async () => {
    try {
      dispatch(showLoading())
      const { error, message } = await AuthRequest.register({
        name,
        email,
        password
      })

      if (error) return alert(message)
    } catch (error) {
      alert(error.message)
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

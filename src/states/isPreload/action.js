import { AuthRequest } from '../../data/api/dicoding-forum'
import { setAuthUserActionCreator, unsetAuthUserActionCreator } from '../authUser/action'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD'
}

function setIsPreloadActionCreator (isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload
    }
  }
}

function asyncSetIsPreload () {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      const { error, data } = await AuthRequest.profile()

      if (!error) {
        dispatch(setAuthUserActionCreator(data.user))
      }
    } catch (error) {
      dispatch(unsetAuthUserActionCreator())
    } finally {
      dispatch(setIsPreloadActionCreator(false))
      dispatch(hideLoading())
    }
  }
}

export {
  ActionType,
  setIsPreloadActionCreator,
  asyncSetIsPreload
}

import { AuthRequest } from '../../data/api/dicoding-forum'
import { setAuthUserActionCreator, unsetAuthUserActionCreator } from '../authUser/action'

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
      const { error, data } = await AuthRequest.profile()

      if (!error) {
        dispatch(setAuthUserActionCreator(data.user))
      }
    } catch (error) {
      dispatch(unsetAuthUserActionCreator())
    } finally {
      dispatch(setIsPreloadActionCreator(false))
    }
  }
}

export {
  ActionType,
  setIsPreloadActionCreator,
  asyncSetIsPreload
}

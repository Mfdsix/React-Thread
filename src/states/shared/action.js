import {
  AuthRequest, ThreadRequest
} from '../../data/api/dicoding-forum'
import {
  reveiceThreadsActionCreator
} from '../threads/action'
import {
  receiveUsersActionCreator
} from '../users/action'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

function asyncPopulateUsersAndThreads () {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      const { error: userError, data: userData } = await AuthRequest.getAllUser()
      const { error: threadError, data: threadData } = await ThreadRequest.getAll()

      if (!userError) dispatch(receiveUsersActionCreator(userData.users))
      if (!threadError) dispatch(reveiceThreadsActionCreator(threadData.threads))
    } catch (error) {
      if (typeof window !== 'undefined') alert(error.message)
    } finally {
      dispatch(hideLoading())
    }
  }
}

export {
  asyncPopulateUsersAndThreads
}

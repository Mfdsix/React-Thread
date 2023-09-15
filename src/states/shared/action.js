import {
  AuthRequest, ThreadRequest
} from '../../data/api/dicoding-forum'
import {
  reveiceThreadsActionCreator
} from '../threads/action'
import {
  receiveUsersActionCreator
} from '../users/action'

function asyncPopulateUsersAndThreads () {
  return async (dispatch) => {
    try {
      const { error: userError, data: userData } = await AuthRequest.getAllUser()
      const { error: threadError, data: threadData } = await ThreadRequest.getAll()

      if(!userError) dispatch(receiveUsersActionCreator(userData.users))
      if(!threadError) dispatch(reveiceThreadsActionCreator(threadData.threads))
    } catch (error) {
      alert(error.message)
    }
  }
}

export {
  asyncPopulateUsersAndThreads
}

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
      const users = await AuthRequest.getAllUser()
      const threads = await ThreadRequest.getAll()

      dispatch(receiveUsersActionCreator(users))
      dispatch(reveiceThreadsActionCreator(threads))
    } catch (error) {
      alert(error.message)
    }
  }
}

export {
  asyncPopulateUsersAndThreads
}

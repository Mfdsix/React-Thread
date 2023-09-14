import { LeaderBoardRequest } from '../../data/api/dicoding-forum'
import { reveiceThreadDetailActionCreator } from '../threadDetail/action'

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS'
}

function receiveLeaderboardsActionCreator (leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards
    }
  }
}

function asyncReceiveLeaderboards () {
  return async (dispatch) => {
    try {
      const { error, message, data } = await LeaderBoardRequest.getAll()

      if (error) return alert(message)

      dispatch(reveiceThreadDetailActionCreator(data.leaderboards))
    } catch (error) {
      alert(error.message)
    }
  }
}

export {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncReceiveLeaderboards
}

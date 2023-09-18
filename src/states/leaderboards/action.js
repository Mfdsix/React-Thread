import { LeaderBoardRequest } from '../../data/api/dicoding-forum'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

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
      dispatch(showLoading())
      const { error, message, data } = await LeaderBoardRequest.getAll()

      if (error) {
        if (typeof window !== 'undefined') alert(message)
        return
      }

      dispatch(receiveLeaderboardsActionCreator(data.leaderboards))
    } catch (error) {
      if (typeof window !== 'undefined') alert(error.message)
    } finally {
      dispatch(hideLoading())
    }
  }
}

export {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncReceiveLeaderboards
}

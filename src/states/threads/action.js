import { ThreadRequest, VoteRequest } from '../../data/api/dicoding-forum'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  SET_STATUS_VOTE_THREAD_ITEM: 'SET_STATUS_VOTE_THREAD_ITEM'
}
const VoteType = {
  UPVOTE: 'UPVOTE',
  DOWNVOTE: 'DOWNVOTE',
  NEUTRALVOTE: 'NEUTRALVOTE'
}

function reveiceThreadsActionCreator (threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads
    }
  }
}

function addThreadActionCreator (thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread
    }
  }
}

function setStatusVoteThreadActionCreator ({
  threadId,
  userId,
  type
}) {
  return {
    type: ActionType.SET_STATUS_VOTE_THREAD_ITEM,
    payload: {
      threadId,
      userId,
      type
    }
  }
}

function asyncAddThread ({ title, body, category }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      const { error, message, data } = await ThreadRequest.create({
        title,
        body,
        category
      })

      if (error) {
        window.alert(message)
        return false
      }

      dispatch(addThreadActionCreator(data.thread))
      return true
    } catch (error) {
      window.alert(error.message)
      return false
    } finally {
      dispatch(hideLoading())
    }
  }
}

function asyncSetStatusVoteThread ({ threadId, type = VoteType.UPVOTE, userId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(
      setStatusVoteThreadActionCreator({
        threadId,
        userId: userId || authUser?.id,
        type
      })
    )

    try {
      if (type == VoteType.UPVOTE) await VoteRequest.upVote(threadId)
      else if (type == VoteType.DOWNVOTE) await VoteRequest.downVote(threadId)
      else await VoteRequest.neutralVote(threadId)
    } catch (error) {
      window.alert(error.message)

      // rollback function
      dispatch(
        setStatusVoteThreadActionCreator({
          threadId,
          userId: authUser?.id,
          type
        })
      )
    }
  }
}

export {
  ActionType,
  VoteType,
  reveiceThreadsActionCreator,
  addThreadActionCreator,
  setStatusVoteThreadActionCreator,
  asyncAddThread,
  asyncSetStatusVoteThread
}

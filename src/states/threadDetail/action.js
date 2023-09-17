import { hideLoading, showLoading } from 'react-redux-loading-bar'
import {
  CommentRequest,
  ThreadRequest,
  VoteRequest
} from '../../data/api/dicoding-forum'

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  SET_STATUS_VOTE_THREAD: 'SET_STATUS_VOTE_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
  SET_STATUS_VOTE_COMMENT: 'SET_STATUS_VOTE_COMMENT'
}
const VoteType = {
  UPVOTE: 'UPVOTE',
  DOWNVOTE: 'DOWNVOTE',
  NEUTRALVOTE: 'NEUTRALVOTE'
}

function reveiceThreadDetailActionCreator (thread = null) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
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
    type: ActionType.SET_STATUS_VOTE_THREAD,
    payload: {
      threadId,
      userId,
      type
    }
  }
}

function addCommentActionCreator (comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment
    }
  }
}

function setStatusVoteCommentActionCreator ({
  threadId,
  commentId,
  userId,
  type,
  isRollback = false
}) {
  return {
    type: ActionType.SET_STATUS_VOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
      type,
      isRollback
    }
  }
}

function asyncGetDetailThread (threadId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      const { error, data } = await ThreadRequest.getById(threadId)

      if (error) return false

      dispatch(reveiceThreadDetailActionCreator(data.detailThread))
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

function asyncAddComment ({ threadId, content }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      const { error, message, data } = await CommentRequest.create(threadId, {
        content
      })

      if (error) {
        window.alert(message)
        return false
      }

      dispatch(addCommentActionCreator(data.comment))
      return true
    } catch (error) {
      window.alert(error.message)
      return false
    } finally {
      dispatch(hideLoading())
    }
  }
}

function asyncSetStatusVoteComment ({
  threadId,
  commentId,
  type = VoteType.UPVOTE
}) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(
      setStatusVoteCommentActionCreator({
        threadId,
        commentId,
        userId: authUser?.id,
        type
      })
    )

    try {
      if (type == VoteType.UPVOTE) {
        await VoteRequest.commentUpVote({
          threadId,
          commentId
        })
      } else if (type == VoteType.DOWNVOTE) {
        await VoteRequest.commentDownVote({
          threadId,
          commentId
        })
      } else await VoteRequest.commentNeutralVote(threadId)
    } catch (error) {
      window.alert(error.message)

      // rollback function
      dispatch(
        setStatusVoteCommentActionCreator({
          threadId,
          commentId,
          userId: authUser?.id,
          type,
          isRollback: true
        })
      )
    }
  }
}

export {
  ActionType,
  VoteType,
  reveiceThreadDetailActionCreator,
  setStatusVoteThreadActionCreator,
  addCommentActionCreator,
  setStatusVoteCommentActionCreator,
  asyncGetDetailThread,
  asyncSetStatusVoteThread,
  asyncAddComment,
  asyncSetStatusVoteComment
}

import { ActionType, VoteType } from './action'

function threadDetailReducer (thread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.thread
    case ActionType.ADD_COMMENT:
      return {
        ...thread,
        comments: [
          {
            ...action.payload.comment,
            upVotesBy: [],
            downVotesBy: []
          },
          ...thread.comments
        ]
      }
    case ActionType.SET_STATUS_VOTE_THREAD:
      let upVotesBy = thread.upVotesBy
      let downVotesBy = thread.downVotesBy

      if (action.payload.type == VoteType.UPVOTE) {
        if (upVotesBy.includes(action.payload.userId)) {
          upVotesBy = upVotesBy.filter(
            (userId) => userId != action.payload.userId
          )
        } else {
          upVotesBy = [action.payload.userId, ...upVotesBy]
          downVotesBy = downVotesBy.filter(
            (userId) => userId != action.payload.userId
          )
        }
      }
      if (action.payload.type == VoteType.DOWNVOTE) {
        if (downVotesBy.includes(action.payload.userId)) {
          downVotesBy = downVotesBy.filter(
            (userId) => userId != action.payload.userId
          )
        } else {
          downVotesBy = [action.payload.userId, ...downVotesBy]
          upVotesBy = upVotesBy.filter(
            (userId) => userId != action.payload.userId
          )
        }
      }

      return {
        ...thread,
        upVotesBy,
        downVotesBy
      }
    case ActionType.SET_STATUS_VOTE_COMMENT:
      return {
        ...thread,
        comments: thread.comments.map((comment) => {
          if (comment.id == action.payload.commentId) {
            let upVotesBy = comment.upVotesBy
            let downVotesBy = comment.downVotesBy

            if (action.payload.type == VoteType.UPVOTE) {
              if (upVotesBy.includes(action.payload.userId)) {
                upVotesBy = upVotesBy.filter(
                  (userId) => userId != action.payload.userId
                )
              } else {
                upVotesBy = [action.payload.userId, ...upVotesBy]
                downVotesBy = downVotesBy.filter(
                  (userId) => userId != action.payload.userId
                )
              }
            }
            if (action.payload.type == VoteType.DOWNVOTE) {
              if (downVotesBy.includes(action.payload.userId)) {
                downVotesBy = downVotesBy.filter(
                  (userId) => userId != action.payload.userId
                )
              } else {
                downVotesBy = [action.payload.userId, ...downVotesBy]
                upVotesBy = upVotesBy.filter(
                  (userId) => userId != action.payload.userId
                )
              }
            }

            return {
              ...comment,
              upVotesBy,
              downVotesBy
            }
          }

          return comment
        })
      }
    default:
      return thread
  }
}

export default threadDetailReducer

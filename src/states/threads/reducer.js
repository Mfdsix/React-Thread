import {
  ActionType, VoteType
} from './action'

function threadsReducer (threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads
    case ActionType.ADD_THREAD:
      return [
        action.payload.thread,
        ...threads
      ]
    case ActionType.SET_STATUS_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id == action.payload.threadId) {
          let upVotesBy = thread.upVotesBy
          let downVotesBy = thread.downVotesBy

          if (action.payload.type == VoteType.UPVOTE) {
            if (action.payload.isRollback) {
              upVotesBy = upVotesBy.filter((userId) => userId != action.payload.userId)
            } else {
              upVotesBy.push(action.payload.userId)
            }
          }
          if (action.payload.type == VoteType.DOWNVOTE) {
            if (action.payload.isRollback) {
              downVotesBy = downVotesBy.filter((userId) => userId != action.payload.userId)
            } else {
              downVotesBy.push(action.payload.userId)
            }
          }

          return {
            ...thread,
            upVotesBy,
            downVotesBy
          }
        }

        return thread
      })
    default:
      return threads
  }
}

export default threadsReducer

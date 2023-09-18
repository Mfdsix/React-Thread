import React from 'react'
import PropTypes from 'prop-types'

import { FaThumbsUp, FaThumbsDown, FaCommentAlt } from 'react-icons/fa'

import {
  VoteType,
  asyncSetStatusVoteThread
} from '../../states/threads/action'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { convertDate } from '../../utils/date'

function ListItem ({ thread }) {
  const { authUser, users } = useSelector((states) => states)
  const dispatch = useDispatch()

  const owner = users.find((user) => user.id == thread.ownerId)

  const onVote = (type) => {
    if (!authUser) {
      return window.alert('Login to vote')
    }

    dispatch(
      asyncSetStatusVoteThread({
        threadId: thread.id,
        type
      })
    )
  }

  return (
    <>
      <div className="thread__item my-1">
        {owner && <ThreadOwner avatar={owner.avatar} name={owner.name} createdAt={thread.createdAt} />}

        <div className="thread__content">
          <div className="thread__content__title">
            <Link to={`/${thread.id}`}>
              <h4>{thread.title}</h4>
            </Link>
            <span className="thread__content__category">{thread.category}</span>
          </div>
          <div
            className="thread__content__body"
            dangerouslySetInnerHTML={{ __html: thread.body }}
          ></div>
        </div>

        <div className="thread__action">
          <div className="thread__action__button">
            <button onClick={(e) => onVote(VoteType.UPVOTE)}>
              {authUser && thread.upVotesBy.includes(authUser.id) ? (
                <FaThumbsUp color="green" />
              ) : (
                <FaThumbsUp />
              )}
              {thread.upVotesBy.length > 0 && (
                <span>{thread.upVotesBy.length}</span>
              )}
            </button>
          </div>
          <div className="thread__action__button">
            <button onClick={(e) => onVote(VoteType.DOWNVOTE)}>
              {authUser && thread.downVotesBy.includes(authUser.id) ? (
                <FaThumbsDown color="red" />
              ) : (
                <FaThumbsDown />
              )}
            </button>
          </div>

          {thread.totalComments > 0 && (
            <div className="thread__action__button">
              <FaCommentAlt /> <span>{thread.totalComments}</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

ListItem.propTypes = {
  thread: PropTypes.object
}

export default ListItem

function ThreadOwner ({ avatar, name, createdAt }) {
  return (
    <div className="thread__user">
      <img src={avatar} alt={name} />
      <div>
        <h4 className="thread__user__name">{name}</h4>
        <span className="thread__date">{convertDate(createdAt)}</span>
      </div>
    </div>
  )
}

ThreadOwner.propTypes = {
  /** The avatar of thread owner  */
  avatar: PropTypes.string.isRequired,
  /** The name of thread owner  */
  name: PropTypes.string.isRequired,
  /** The date thread being created  */
  createdAt: PropTypes.string.isRequired
}

export {
  ThreadOwner
}

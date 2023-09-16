import React from 'react'
import PropTypes from 'prop-types'

import { FaThumbsUp, FaThumbsDown, FaCommentAlt } from 'react-icons/fa'

import {
  VoteType,
  asyncSetStatusVoteThread
} from '../../states/threads/action'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function ListItem ({ thread }) {
  const { authUser, users } = useSelector((states) => states)
  const dispatch = useDispatch()

  const owner = users.find((user) => user.id == thread.ownerId)

  const onVote = (type) => {
    if (!authUser) {
      return alert('Login to vote')
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
        {owner && (
          <div className="thread__user">
            <img src={owner.avatar} alt={owner.name} />
            <h4 className="thread__user__name">{owner.name}</h4>
          </div>
        )}

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

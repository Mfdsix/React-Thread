import React from 'react'
import PropTypes from 'prop-types'

import {
  VoteType,
  asyncSetStatusVoteComment
} from '../../states/threadDetail/action'
import { useDispatch, useSelector } from 'react-redux'

import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'
import { convertDate } from '../../utils/date'

function DetailCommentItem ({ threadId, comment }) {
  const { authUser } = useSelector((states) => states)
  const dispatch = useDispatch()

  const onVote = (type) => {
    if (!authUser) {
      return window.alert('Login to vote')
    }

    dispatch(
      asyncSetStatusVoteComment({
        threadId,
        commentId: comment.id,
        type
      })
    )
  }

  return (
    <>
      <div className="thread__item my-1">
        {comment.owner && (
          <div className="thread__user">
            <img src={comment.owner.avatar} alt={comment.owner.name} />
            <div>
            <h4 className="thread__user__name">{comment.owner.name}</h4>
            <span className='thread__date'>{ convertDate(comment.createdAt) }</span>
            </div>
          </div>
        )}

        <div className="thread__content">
          <div
            className="thread__content__body"
            dangerouslySetInnerHTML={{ __html: comment.content }}
          ></div>
        </div>

        <div className="thread__action">
          <div className="thread__action__button">
            <button onClick={(e) => onVote(VoteType.UPVOTE)}>
              {authUser && comment.upVotesBy.includes(authUser.id) ? (
                <FaThumbsUp color="green" />
              ) : (
                <FaThumbsUp />
              )}
              {comment.upVotesBy.length > 0 && (
                <span>{comment.upVotesBy.length}</span>
              )}
            </button>
          </div>
          <div className="thread__action__button">
            <button onClick={(e) => onVote(VoteType.DOWNVOTE)}>
              {authUser && comment.downVotesBy.includes(authUser.id) ? (
                <FaThumbsDown color="red" />
              ) : (
                <FaThumbsDown />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

DetailCommentItem.propTypes = {
  threadId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired
}

export default DetailCommentItem

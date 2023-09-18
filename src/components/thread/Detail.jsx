import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ThreadComment from './DetailComment'

import { useDispatch, useSelector } from 'react-redux'
import { FaThumbsUp, FaThumbsDown, FaCommentAlt } from 'react-icons/fa'
import {
  asyncGetDetailThread,
  VoteType,
  asyncSetStatusVoteThread
} from '../../states/threadDetail/action'
import { convertDate } from '../../utils/date'

function ThreadDetail ({ threadId }) {
  const { authUser, threadDetail } = useSelector((states) => states)
  const dispatch = useDispatch()

  const onVote = (type) => {
    if (!authUser) {
      return alert('Login to vote')
    }

    dispatch(
      asyncSetStatusVoteThread({
        threadId: threadDetail?.id,
        type
      })
    )
  }

  useEffect(() => {
    dispatch(asyncGetDetailThread(threadId))
  }, [dispatch])

  if (!threadDetail) {
    return (
      <>
        <div className="text-center">
          <h3>Thread Tidak Ditemukan</h3>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="thread__item thread__detail my-1">
        {threadDetail.owner && (
          <div className="thread__user">
            <img
              src={threadDetail.owner.avatar}
              alt={threadDetail.owner.name}
            />
            <div>
              <h4 className="thread__user__name">{threadDetail.owner.name}</h4>
              <span className="thread__date">
                {convertDate(threadDetail.createdAt)}
              </span>
            </div>
          </div>
        )}

        <ThreadBody
          title={threadDetail.title}
          category={threadDetail.category}
          body={threadDetail.body}
        />

        <ThreadButton
          isUpvoted={authUser && threadDetail.upVotesBy.includes(authUser.id)}
          upvotedCount={threadDetail.upVotesBy.length}
          isDownVoted={
            authUser && threadDetail.downVotesBy.includes(authUser.id)
          }
          commentCount={threadDetail.totalComments}
          onVote={onVote}
        />
      </div>

      <div className="my-1">
        <ThreadComment
          threadId={threadDetail.id}
          comments={threadDetail.comments}
        />
      </div>
    </>
  )
}

ThreadDetail.propTypes = {
  threadId: PropTypes.string
}

export default ThreadDetail

export function ThreadBody ({ title, category, body }) {
  return (
    <div className="thread__content">
      <div className="thread__content__title">
        <h4>{title}</h4>
        <span className="thread__content__category">{category}</span>
      </div>
      <div
        className="thread__content__body"
        dangerouslySetInnerHTML={{ __html: body }}
      ></div>
    </div>
  )
}

ThreadBody.propTypes = {
  // Title of the thread
  title: PropTypes.string.isRequired,
  // category of the thread
  category: PropTypes.string.isRequired,
  // content body of the thread
  body: PropTypes.string.isRequired
}

export function ThreadButton ({ isUpvoted, upvotedCount, isDownVoted, commentCount, onVote }) {
  return (
    <>
      <div className="thread__action">
        <div className="thread__action__button">
          <button onClick={(e) => onVote(VoteType.UPVOTE)}>
            {isUpvoted ? (
              <FaThumbsUp color="green" />
            ) : (
              <FaThumbsUp />
            )}
            {upvotedCount > 0 && (
              <span>{upvotedCount}</span>
            )}
          </button>
        </div>
        <div className="thread__action__button">
          <button onClick={(e) => onVote(VoteType.DOWNVOTE)}>
            {isDownVoted ? (
              <FaThumbsDown color="red" />
            ) : (
              <FaThumbsDown />
            )}
          </button>
        </div>

        {commentCount > 0 && (
          <div className="thread__action__button">
            <FaCommentAlt /> <span>{commentCount}</span>
          </div>
        )}
      </div>
    </>
  )
}

ThreadButton.propTypes = {
  // is user up votes thread
  isUpvoted: PropTypes.bool,
  // thread up votes count
  upvotedCount: PropTypes.number,
  // is user down votes thread
  isDownVoted: PropTypes.bool,
  // thread comment count
  commentCount: PropTypes.number,
  // when user click up vote / down vote
  onVote: PropTypes.func
}
ThreadButton.defaultProps = {
  onVote: (type) => {}
}

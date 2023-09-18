import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ThreadComment from './DetailComment'

import { useDispatch, useSelector } from 'react-redux'
import { FaThumbsUp, FaThumbsDown, FaCommentAlt } from 'react-icons/fa'
import { asyncGetDetailThread, VoteType, asyncSetStatusVoteThread } from '../../states/threadDetail/action'
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
            <img src={threadDetail.owner.avatar} alt={threadDetail.owner.name} />
            <div>
            <h4 className="thread__user__name">{threadDetail.owner.name}</h4>
            <span className='thread__date'>{ convertDate(threadDetail.createdAt) }</span>
            </div>
          </div>
        )}

        <div className="thread__content">
          <div className="thread__content__title">
            <h4>{threadDetail.title}</h4>
            <span className="thread__content__category">
              {threadDetail.category}
            </span>
          </div>
          <div
            className="thread__content__body"
            dangerouslySetInnerHTML={{ __html: threadDetail.body }}
          ></div>
        </div>

        <div className="thread__action">
          <div className="thread__action__button">
            <button onClick={(e) => onVote(VoteType.UPVOTE)}>
              {authUser && threadDetail.upVotesBy.includes(authUser.id) ? (
                <FaThumbsUp color="green" />
              ) : (
                <FaThumbsUp />
              )}
              {threadDetail.upVotesBy.length > 0 && (
                <span>{threadDetail.upVotesBy.length}</span>
              )}
            </button>
          </div>
          <div className="thread__action__button">
            <button onClick={(e) => onVote(VoteType.DOWNVOTE)}>
              {authUser && threadDetail.downVotesBy.includes(authUser.id) ? (
                <FaThumbsDown color="red" />
              ) : (
                <FaThumbsDown />
              )}
            </button>
          </div>

          {threadDetail.totalComments > 0 && (
            <div className="thread__action__button">
              <FaCommentAlt /> <span>{threadDetail.totalComments}</span>
            </div>
          )}
        </div>
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

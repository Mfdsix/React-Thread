import React from 'react'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'

import ThreadCommentItem from './DetailCommentItem'
import CommentInput from './CommentInput'

function DetailComment ({ threadId, comments }) {
  const { authUser } = useSelector((states) => states)

  return (
    <>
      <div>
        <h3>Comments </h3>

        {authUser ? (
          <CommentInput threadId={threadId} />
        ) : (
          <>
            <div className="text-center">
              <h3>Login to add Comment</h3>
            </div>
          </>
        )}

        {comments.map((comment) => (
          <ThreadCommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  )
}

DetailComment.propTypes = {
  threadId: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default DetailComment

import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { asyncAddComment } from '../../states/threadDetail/action'

function CommentInput ({
  threadId
}) {
  const dispatch = useDispatch()

  const [content, setContent] = useState('')
  const [contentError, setContentError] = useState('')

  const [formDisabled, setFormDisabled] = useState(false)

  const onContentChange = (e) => {
    setContent(e.target.value)
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()

    dispatch(
      asyncAddComment({
        threadId,
        content
      })
    )
  }

  useEffect(() => {
    if (!content) {
      if (!content) setContentError('Content must be filled')

      setFormDisabled(true)
    }

    return () => {
      setContentError('')
      setFormDisabled(false)
    }
  }, [content])

  return (
    <>
      <div>
        <div className="my-1">
          <h3>Add Your Comment</h3>
        </div>

        <form onSubmit={onFormSubmit}>
          <div>

            <div className="form__group form__limit__char">
              <textarea
                onChange={onContentChange}
                defaultValue={content}
                className="form__input"
                cols="30"
                rows="10"
              ></textarea>
              {contentError && (
                <span className="form__invalid__feedback">
                  *( {contentError}
                </span>
              )}
            </div>
          </div>
          <div className="form__action flex__end">
            <button
            disabled={formDisabled}
            type="submit" className="btn btn__submit">
              Comment
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

CommentInput.propTypes = {
  threadId: PropTypes.string
}

export default CommentInput

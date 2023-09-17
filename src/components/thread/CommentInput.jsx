import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { asyncAddComment } from '../../states/threadDetail/action'
import {
  FaSpinner
} from 'react-icons/fa'

function CommentInput ({
  threadId
}) {
  const dispatch = useDispatch()

  const [content, setContent] = useState('')
  const [contentError, setContentError] = useState('')

  const [formLoading, setFormLoading] = useState(false)
  const [formDisabled, setFormDisabled] = useState(false)

  const onContentChange = (e) => {
    setContent(e.target.value)
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()

    setFormLoading(true)
    const isPosted = await dispatch(
      asyncAddComment({
        threadId,
        content
      })
    )
    setFormLoading(false)

    if (isPosted) {
      setContent('')
    }
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
                value={content}
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
            disabled={formDisabled || formLoading}
            type="submit" className="btn btn__submit">
              { formLoading ? <FaSpinner/> : 'Comment' }
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

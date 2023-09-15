import React from 'react'
import PropTypes from 'prop-types'

import {
  asyncSetStatusVoteComment
} from '../../states/threadDetail/action'
import { useDispatch } from 'react-redux'

function DetailCommentItem ({
  comment
}) {
  const dispatch = useDispatch()

  return <>
        <div>List Item</div>
    </>
}

DetailCommentItem.propTypes = {
  thread: PropTypes.object
}

export default DetailCommentItem

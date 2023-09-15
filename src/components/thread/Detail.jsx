import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'
import {
  asyncGetDetailThread
} from '../../states/threadDetail/action'

function ThreadDetail ({
  threadId
}) {
  const {
    authUser
  } = useSelector((states) => states)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncGetDetailThread(threadId))
  }, [dispatch])

  return <>
        <div>Thread Input</div>
    </>
}

ThreadDetail.propTypes = {
  threadId: PropTypes.number
}

import React from 'react'
import PropTypes from 'prop-types'

import {
  asyncSetStatusVoteThread
} from '../../states/threads/action'
import { useDispatch } from 'react-redux'

function ListItem ({
  thread
}) {
  const dispatch = useDispatch()

  return <>
        <div>List Item</div>
    </>
}

ListItem.propTypes = {
  thread: PropTypes.object
}

export default ListItem

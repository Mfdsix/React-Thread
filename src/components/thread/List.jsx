import React, { useEffect } from 'react'

import ListItem from './ListItem'

import { useDispatch, useSelector } from 'react-redux'
import {
  asyncPopulateUsersAndThreads
} from '../../states/shared/action'

function ThreadList () {
  const {
    threads
  } = useSelector((states) => states)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads())
  }, [dispatch])

  return <>
        <div className='my-1'>
          <h3>Thread List</h3>

          { threads.map((thread) => (
            <ListItem key={thread.id} thread={thread}/>
          )) }
        </div>
    </>
}

export default ThreadList

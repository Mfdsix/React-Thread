import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  asyncPopulateUsersAndThreads
} from '../../states/shared/action'

function ThreadList () {
  const {
    authUser,
    threads,
    users
  } = useSelector((states) => states)
  const disptach = useDispatch()

  useEffect(() => {
    disptach(asyncPopulateUsersAndThreads())
  }, [disptach])

  return <>
        <div>Thread List</div>
    </>
}

export default ThreadList

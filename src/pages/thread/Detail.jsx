import React from 'react'

import ThreadDetail from '../../components/thread/Detail'
import UserLayout from '../../components/layouts/User'
import { useParams } from 'react-router-dom'

function Detail () {
  const { threadId } = useParams()

  return <>
  <UserLayout>
        <ThreadDetail threadId={threadId}/>
  </UserLayout>
    </>
}

export default Detail

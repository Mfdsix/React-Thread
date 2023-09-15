import React from 'react'

import ThreadDetail from '../../components/thread/Detail'
import { useParams } from 'react-router-dom'

function Detail () {
  const { threadId } = useParams()

  return <>
        <ThreadDetail threadId={threadId}/>
    </>
}

export default Detail

import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  asyncAddThread
} from '../../states/threads/action'

function ThreadInput () {
  const {
    authUser
  } = useSelector((states) => states)
  const disptach = useDispatch()

  return <>
        <div>Thread Input</div>
    </>
}

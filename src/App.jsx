import React, { useEffect } from 'react'
import Router from './router'

import { useDispatch, useSelector } from 'react-redux'
import {
  asyncSetIsPreload
} from './states/isPreload/action'
import LoadingBar from './components/LoadingBar'

function App () {
  const {
    isPreload
  } = useSelector((states) => states)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncSetIsPreload())
  }, [dispatch])

  return isPreload ? null : <>
  <LoadingBar/>
  <Router/>
  </>
}

export default App

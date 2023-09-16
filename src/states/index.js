import {
  configureStore
} from '@reduxjs/toolkit'
import { loadingBarReducer } from 'react-redux-loading-bar'

import authUserReducer from './authUser/reducer'
import usersReducer from './users/reducer'
import isPreloadReducer from './isPreload/reducer'
import threadsReducer from './threads/reducer'
import threadDetailReducer from './threadDetail/reducer'
import leaderboardsReducer from './leaderboards/reducer'

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer
  }
})

export default store

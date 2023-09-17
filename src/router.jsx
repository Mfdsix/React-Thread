import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import Home from './pages/Home'
import ThreadDetail from './pages/thread/Detail'
import Leaderboard from './pages/Leaderboard'
import PageNotFound from './pages/PageNotFound'

function Router () {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/leaderboard" element={<Leaderboard />} />

        <Route path="/:threadId" element={<ThreadDetail />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default Router

import React from 'react'

import UserLayout from '../components/layouts/User'

import ThreadInput from '../components/thread/Input'
import ThreadList from '../components/thread/List'
import LeaderboardLink from '../components/thread/LeaderboardLink'
import { useSelector } from 'react-redux'

function Home () {
  const {
    authUser
  } = useSelector((states) => states)

  return (
    <>
      <UserLayout>
         { authUser ? <ThreadInput/> : (
          <>
            <div className='text-center'>
              <h3>Login to post thread</h3>
            </div>
          </>
         )}

        <div className='my-1'></div>

        <LeaderboardLink/>

        <div className='my-1'></div>

        <ThreadList/>
      </UserLayout>
    </>
  )
}

export default Home

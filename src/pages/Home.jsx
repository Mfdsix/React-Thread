import React from 'react'

import UserLayout from '../components/layouts/User'

import ThreadInput from '../components/thread/Input'
import ThreadList from '../components/thread/List'

function Home () {
  return (
    <>
      <UserLayout>
        <ThreadInput/>
        <ThreadList/>
      </UserLayout>
    </>
  )
}

export default Home

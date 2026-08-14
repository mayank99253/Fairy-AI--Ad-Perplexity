import React from 'react'
import { useAuth } from '../../auth/hook/useAuth'

const Home = () => {
  const {handleLogout} = useAuth()
  return (
    <div>Home
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Home
import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes.jsx'
import { ToastContainer } from 'react-toastify'
import { useAuth } from './feature/auth/hook/useAuth'
import { useSelector } from 'react-redux'
import PageLoader from './components/Loader/PageLoader.jsx'

const App = () => {
  const {handleGetMe} = useAuth()
  const {user , isUserLoading} = useSelector((s)=>s.auth)

  useEffect(()=>{
      handleGetMe()
    },[handleGetMe])

    if(isUserLoading) return <PageLoader />
  return (
    <div className='h-dvh w-dvw'>
      <RouterProvider router={router(user)} />
      <ToastContainer />
    </div>
  )
}

export default App
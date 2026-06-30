import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { route } from './app.routes'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div>
      <RouterProvider router={route} />
      
      <ToastContainer />
    </div>
  )
}

export default App
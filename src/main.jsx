import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import './index.css'
import ProfilePage from './pages/ProfilePage.jsx'
import SearchPage from './pages/SearchPage.jsx'

// Possibly helpful template for the sign in page: https://mui.com/material-ui/getting-started/templates/sign-in/

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

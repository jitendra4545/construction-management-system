

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Signup } from '../components/Signup'
import { Login } from '../components/Login'
import { HomePage } from './HomePage'
import { AdminPage } from './AdminPage'
import { ReqAuth } from './ReqAuth'
import { UserPage } from './UserPage'
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={

        <HomePage />

      } />
      <Route path='/admin' element={
        <ReqAuth>
          <AdminPage />
        </ReqAuth>


      } />

<Route path='/user' element={
  <ReqAuth>
<UserPage/>
  </ReqAuth>
  
} />
    </Routes>
  )
}

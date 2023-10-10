

import React from 'react'
import {Route, Routes} from 'react-router-dom'
import { Signup } from '../components/Signup'
import { Login } from '../components/Login'
import { HomePage } from './HomePage'
export const AllRoutes = () => {
  return (
   <Routes>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<HomePage/>} />
   </Routes>
  )
}

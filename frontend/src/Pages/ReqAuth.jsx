import { Box } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../assets/Api'
import { Navigate } from 'react-router-dom'

export const ReqAuth = ({ children }) => {
    
    let token = localStorage.getItem("token")
    
    if (!token) {
        return <Navigate to='/login' />
    }
   
return children







}

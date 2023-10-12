import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { API } from '../assets/Api'


export const Navbar = () => {
const [Single,setSingle]=useState([])
let token=localStorage.getItem("token")
const navigate=useNavigate()
const handleLogout=async()=>{
    await fetch(`${API}/user/logout`, {
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    }).then(res => res.json())
        .then((res) => {
            console.log("fddfsdfs",res)
            localStorage.removeItem("token")
         window.location.reload()
        navigate("/")
        }).catch((err) => {
            console.log(err)
        })
}


    const getSingleData = async () => {
        await fetch(`${API}/user/single`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then((res) => {
                console.log("fddfsdfs",res)
                setSingle(res)
            }).catch((err) => {
                console.log(err)
            })

    }

    useEffect(() => {
        getSingleData()
    }, [token])

    console.log("adssd",Single)

    return (
        <Box bg='teal'>
            <Box display={'flex'} justifyContent={'space-evenly'} p='15px 20px'>
               
<Link to={`/`}><Text _hover={{color:"yellow"}} textShadow={' 2px 2px #FF0000'} fontSize={'20px'} color={'white'} fontWeight={'bold'} >HOME</Text></Link>
{
    Single[0]?.isAdmin==true && Single[0]?.isActive==true &&<Link to={`/admin`}><Text _hover={{color:"yellow"}} textShadow={' 2px 2px #FF0000'} fontSize={'20px'} color={'white'} fontWeight={'bold'} >ADMIN</Text></Link>


}
{
    Single[0]?.isAdmin==false && Single[0]?.isActive==true &&

<Link to={`/user`}><Text _hover={{color:"yellow"}} textShadow={' 2px 2px #FF0000'} fontSize={'20px'} color={'white'} fontWeight={'bold'} >USER</Text></Link>

}

{
     Single[0]?.isActive==true ?
     <Button onClick={handleLogout}>Logout</Button>
     :
     <>

    <Link to={`/login`}><Text _hover={{color:"yellow"}} textShadow={' 2px 2px #FF0000'} fontSize={'20px'} color={'white'} fontWeight={'bold'} >LOGIN</Text></Link>
    <Link to={`/signup`}><Text _hover={{color:"yellow"}} textShadow={' 2px 2px #FF0000'} fontSize={'20px'} color={'white'} fontWeight={'bold'} >SIGNUP</Text></Link>        
    </> 
    
}

            </Box>

        </Box>
    )
}

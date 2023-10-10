import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const NavOp = [
    {
        name: "HOME",
        path: "/"
    },
    {
        name: "LOGIN",
        path: "/login"
    },
    {
        name: "SIGNUP",
        path: "/signup"
    }, {
        name: "USER",
        path: "/user"
    },
    {
        name: "ADMIN",
        path: "/admin"
    }
]

export const Navbar = () => {
    return (
        <Box bg='blue.300'>
            <Box display={'flex'} justifyContent={'space-evenly'} p='15px 20px'>
                {
                    NavOp.map((el, i) => {
                        return <Link to={`${el.path}`}><Text _hover={{color:"blue"}} textShadow={' 2px 2px #FF0000'} fontSize={'20px'} color={'white'} fontWeight={'bold'} >{el.name}</Text></Link>
                    })
                }
            </Box>

        </Box>
    )
}

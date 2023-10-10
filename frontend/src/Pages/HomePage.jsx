import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <Box>
        <Link to='/login'><Button>Login</Button>
        </Link>
        <Link to='/signup'><Button>Login</Button>
        </Link>
         {/* <Link to='/login'><Button>Login</Button> */}
        {/* </Link> */}
 
    </Box>
  )
}

import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

export const Loader = () => {
  return (
    <Box mt='50px' display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Heading>
            Please Wait .......
        </Heading>
    </Box>
  )
}

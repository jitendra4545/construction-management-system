import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export const ProjectCard = (el) => {  
  return (
    <Box borderRadius={'15px'} bg='orange.300' border={'1px solid black'}   p='30px' >
              <Heading fontSize={'2xl'} >Project Name :- {el.project_name}</Heading>
              {/* <Text textAlign={'center'} borderRadius={"15px"} fontSize={'20px'} mt='10px' fontWeight={'bold'} border={'2px solid yellow'}>Assign To :- {el.project_assign}</Text> */}
              <Box fontSize={'20px'} m='10px 0px' display={'flex'} justifyContent={'space-between'}>
                <Text >Create Time :- {el.createdAt}</Text>
                <Text>Due Date :- {el.due_date}</Text>
              </Box>



            
              
              <Text>{el.project_desc}</Text>

            
            </Box>
  )
}

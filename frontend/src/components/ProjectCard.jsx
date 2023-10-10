import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export const ProjectCard = (el) => {
    
  return (
    <Box>
        <Heading fontSize={'2xl'} >Title :- {el.project_name}</Heading>
        <Text>Assign To :- {el.project_assign}</Text>
        <Text>Create Time :- {el.createdAt}</Text>
        <Text>Due Date :- {el.due_date}</Text>
        <Text>{el.project_desc}</Text>
    </Box>
  )
}

import { Box, Button, FormControl, FormLabel, Input, Select, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../assets/Api'

export const EditProj = () => {

   const navigate=useNavigate()
    const [project_name, setproject_name] = useState("")
    const [project_desc, setproject_desc] = useState("")
   
    const [due_date, setdue_date] = useState("")
    const [project_assign, setproject_assign] = useState("")
   const params=useParams()
   let id=params.id
   

    const handleUpdate=async()=>{

if(project_assign==""||due_date==""){
    alert("Fill all the Fields")
}
const payload={
    project_assign,due_date
}
        await fetch(`${API}/project/${id}`,{
          method:"PATCH",
          headers:{
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
          },
          body:JSON.stringify(payload)
        }).then(res => res.json())
        .then((res) => {
          console.log("fddfsdfs", res)
         navigate("/admin")
         alert("Project Updated Successfully")
        }).catch((err) => {
          console.log(err)
        })
    
            
       
      }

  return (
    <Box>
        <Navbar/>
        <Box w='90%' m='auto'>
              <Box w={{base:"80%",md:"55%",lg:"35%"}} p='20px' bg='orange.400' m='auto' mt='40px' borderRadius={'15px'}>
              
                            <FormControl mt={4}>
                                <FormLabel>Project Assign To</FormLabel>
                                <Select onChange={(e) => setproject_assign(e.target.value)}>
                                    <option value="">Select Assigner</option>
                                    <option value="project manager">Project Manager</option>
                                    <option value="contractor">Contractor</option>
                                    <option value="supervisor">Supervisor</option>
                                </Select>
                            </FormControl>
                            
                            
                            <FormControl mt={4}>
                                <FormLabel>Project Due Date</FormLabel>
                                <Input onChange={(e) => setdue_date(e.target.value)} type='date' />
                            </FormControl>
                            <Button w='100%' mt='20px' onClick={handleUpdate} >Update</Button>
              </Box>
        </Box>
        </Box>
  )
}

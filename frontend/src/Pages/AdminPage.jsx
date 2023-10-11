import { Box, Button, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../assets/Api'
import { useNavigate } from 'react-router-dom'

export const AdminPage = () => {
    const [projects, setProjects] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [project_name, setproject_name] = useState("")
    const [project_desc, setproject_desc] = useState("")
    const [task_assignment, settask_assignment] = useState([])
    const [due_date, setdue_date] = useState("")
    const [project_assign, setproject_assign] = useState("")
    const [task, settask] = useState("")

    const navigate=useNavigate()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const getProj = () => {
        axios.get(`${API}/project`)
            .then((res) => {

                setProjects(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }
    console.log(projects)
    useEffect(() => {
        getProj()
    }, [])

    const AddProject = async () => {

        console.log(project_name, project_assign, project_desc, task_assignment, due_date)
        if (project_assign == "" || project_name == "" || project_desc == "" || task_assignment == [] || due_date == "") {
            alert('Please Fill all the Fields')
        } else {
            const payload = {
                project_name,
                project_assign,
                project_desc,
                task_assignment,
                due_date,
                status: false
            }
            await fetch(`${API}/project`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": (localStorage.getItem(`token`))
                },
                body: JSON.stringify(payload)
            }).then(res => res.json()).then((res) => {
                console.log(res)
                alert(res.msg)
            }
            )
                .catch(err => console.log(err))
        }

    }



    const handleEdit=async()=>{
        
    }

    const handleDelete=async(id)=>{
        await fetch(`${API}/project/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("token")
            },

        }).then(res=>res.json())
        .then((res)=>{
            console.log(res)
            alert(res.msg)
            getProj()
        }).catch(err=>console.log(err))
   
    }


    const handleAddTask = () => {
        settask_assignment([...task_assignment, task])
        settask("")
    }

    console.log(task_assignment)
    return (
        <Box w='90%' m='auto'>
            <Button m='20px' onClick={onOpen} bg='blue' color={'white'} _hover={{ bg: "blue", color: "white" }}>+ Add New Proj</Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Project</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Project Name</FormLabel>
                            <Input ref={initialRef} onChange={(e) => setproject_name(e.target.value)} type='text' placeholder='project name' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Upload Project Blueprint</FormLabel>
                            <Input type='file' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Project Description</FormLabel>
                            <Textarea placeholder='Enter Project Description' onChange={(e) => setproject_desc(e.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Project Assign To</FormLabel>
                            <Select onChange={(e) => setproject_assign(e.target.value)}>
                                <option value="">Select Assigner</option>
                                <option value="project manager">Project Manager</option>
                                <option value="contractor">Contractor</option>
                                <option value="supervisor">Supervisor</option>
                            </Select>
                        </FormControl>
                        <ul>
                        {
                           
                           task_assignment?.map((el)=>{
                            return <li>{el}</li>
                           })
                       }  
                                </ul>
                        
                        <FormControl mt={4}>
                            <FormLabel>Project Tasks</FormLabel>
                            <Input value={task} onChange={(e) => settask(e.target.value)} type='text' />
                        </FormControl>
                        <Button onClick={handleAddTask} bg='blue' color={'white'} _hover={{ bg: "blue", color: "white" }}>ADD TASK</Button>
                        <FormControl mt={4}>
                            <FormLabel>Project Due Date</FormLabel>
                            <Input onChange={(e) => setdue_date(e.target.value)} type='date' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={AddProject} colorScheme='blue' mr={3}>
                            ADD
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>



            <Box mt='20px' display={'grid'} gridTemplateColumns={"repeat(2,1fr)"} gap='10'>
                {
                    projects.map((el, i) => {
                        return <Box color={'white'} p='30px' bg={el.status ? "green" : "orange.700"} key={i}>
                            <Heading fontSize={'2xl'} >Title :- {el.project_name}</Heading>
                            <Text>Assign To :- {el.project_assign}</Text>
                            <Text>Create Time :- {el.createdAt}</Text>
                            <Text>Due Date :- {el.due_date}</Text>
                            <Text>{el.project_desc}</Text>

                            <Text>Task Assignments :-</Text>
                            <ul>
                                {
                                    el?.task_assignment?.map((el, i) => {
                                        return <li>{el}</li>

                                    })
                                }
                            </ul>
                            <Box display={'flex'} mt='20px' justifyContent={'center'} gap='10'>
                                <Button  color={'white'} bg='green' _hover={{ bg: "green.500", color: "white" }}>EDIT</Button>
                                <Button onClick={()=>handleDelete(el._id)} color={'white'} bg='red' _hover={{ bg: "red.500", color: "white" }}>DELETE</Button>
                            </Box>

                        </Box>
                    })
                }
            </Box>

        </Box>
    )
}

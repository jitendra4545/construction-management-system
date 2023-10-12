import { Box, Button, Heading } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../assets/Api'
import { ProjectCard } from '../components/ProjectCard'
import { Navbar } from '../components/Navbar'

export const HomePage = () => {
    const [projects, setProjects] = useState([])

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

    return (
        <>
        <Navbar/>
          <Box w='90%' m='auto'>
            <Heading m='20px' fontSize={'2xl'} textAlign={'center'}>All On Going Projects</Heading>
            <Box mt='20px' display={'grid'} gridTemplateColumns={"repeat(2,1fr)"} gap='10'>
                {
                    projects.map((el, i) => {
                        return <ProjectCard {...el} />
                    })
                }
            </Box>
        </Box>
        </>
      

    )
}

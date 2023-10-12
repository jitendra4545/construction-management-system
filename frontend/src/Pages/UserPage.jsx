import { Box, Button, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import axios from 'axios'
import { API } from '../assets/Api'
import { Loader } from '../components/Loader'

export const UserPage = () => {
  const [Loading,setLoading]=useState(false)
const [Data,setData]=useState([])
  const [project, setProjects] = useState([])
  const [single, setSingle] = useState([])
  const getProj = () => {
    setLoading(true)
    axios.get(`${API}/project`)
      .then((res) => {

        setProjects(res.data)
        setLoading(false)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  console.log(project)

  const getSingleData = async () => {
    setLoading(true)
    await fetch(`${API}/user/single`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    }).then(res => res.json())
      .then((res) => {
        setLoading(false)
        console.log("fddfsdfs", res)
        setSingle(res)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
      })

  }


  useEffect(() => {
    getProj()
    getSingleData()
  }, [])

  useEffect(() => {
    let data = project?.filter((el) => el?.project_assign == single[0]?.user_role)
   console.log(data)
    setData(data)
  },[single,project])

  console.log(Data)

  const handleToggle=async(id)=>{
    setLoading(true)
    await fetch(`${API}/project/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body:JSON.stringify({status:true})
    }).then(res => res.json())
    .then((res) => {
      console.log("fddfsdfs", res)
      setLoading(false)
     getProj()
    }).catch((err) => {
      console.log(err)
      setLoading(false)
    })

        
   
  }



  return (
    <Box>
      <Navbar />
      <Box  w='90%' m='auto'>

     {
      Loading&& <Loader/>
     }
      <Heading m='20px' fontSize={"2xl"}>Project Assign To You</Heading>
      <Box  mt='20px' display={'grid'} gridTemplateColumns={"repeat(2,1fr)"} gap='10'>
      
        {
          Data?.map((el, i) => {
            return <Box borderRadius={'15px'} color={'white'} p='30px' bg={el.status ? "green" : "orange.700"} key={i}>
              <Heading fontSize={'2xl'} >Project Name :- {el.project_name}</Heading>
              <Text textAlign={'center'} borderRadius={"15px"} fontSize={'20px'} mt='10px' fontWeight={'bold'} border={'2px solid yellow'}>Assign To :- {el.project_assign}</Text>
              <Box fontSize={'20px'} m='10px 0px' display={'flex'} justifyContent={'space-between'}>
                <Text >Create Time :- {el.createdAt}</Text>
                <Text>Due Date :- {el.due_date}</Text>
              </Box>



              <Text fontSize={'20px'}>Task Assignments :-</Text>
              <ul style={{ marginLeft: "35%" }}>
                {
                  el?.task_assignment?.map((el, i) => {
                    return <li style={{ marginBottom: "10px" }}>{el}</li>

                  })
                }
              </ul>
              <Text>{el.project_desc}</Text>

              {
                el?.status==false ? <Button onClick={()=>handleToggle(el._id)} _hover={{bg:'teal'}} m='10px 0px' bg='teal' color={'white'}>Click Here To Complete</Button>
                :
<Button  _hover={{bg:'grey'}} m='10px 0px' bg='grey' color={'white'} disabled> Completed</Button>
              }
            </Box>
          })
        }
      </Box>
      </Box>
    </Box>
  )
}

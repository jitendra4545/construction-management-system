import React, { useState } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import axios from 'axios'
import { API } from '../assets/Api'
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
const navigate=useNavigate()
    const handleLogin =() => {
        if(email==""||password==""){
            alert("Fill All the Fields")
        }else{
            const payload = {
                email, password
            }
            console.log(payload)
           
        axios.post(`${API}/user/login`, payload)
                .then((res) => {
                    console.log(res.data)
                    if(res?.data?.token){
                        localStorage.setItem("token",(res.data.token))
                    }
                    navigate("/")
                    alert("Login Successful")
                }).catch(err => console.log(err))
        }
        

  
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input onChange={(e) => setemail(e.target.value)} type="email" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input onChange={(e) => setpassword(e.target.value)} type="password" />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Text >New User <Link to='/signup'><span style={{color:"blue"}}>Register Here</span></Link></Text>
                            </Stack>
                            <Button
                                onClick={handleLogin}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )

}

import axios from 'axios'
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
    InputGroup,
    InputRightElement,
    Select,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { API } from '../assets/Api'
export const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isAdmin, setAdmin] = useState(false)
    const [name, setName] = useState("")
    const [email, setemail] = useState("")
    const [user_role, setuser_role] = useState("")
    const [password, setpassword] = useState("")
    const [isValid, setIsValid] = useState(true);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setpassword(newPassword);

        const isLengthValid = newPassword.length >= 8;
        const hasUpperCase = /[A-Z]/.test(newPassword);
        const hasLowerCase = /[a-z]/.test(newPassword);
        const hasDigit = /[0-9]/.test(newPassword);
        const isPasswordValid = isLengthValid && hasUpperCase && hasLowerCase && hasDigit;

        setIsValid(isPasswordValid);
    };


    const handleRegister = async () => {

        if (name == "" || email == "" || password == "") {
            alert("Fill all the mandatory fields")
        } else {
            if (isValid) {
                const payload = {
                    name,
                    email,
                    password,
                    user_role,
                    isAdmin
                }
                console.log("payload", payload)
                axios.post(`${API}/user/register`, payload)
                    .then((res) => {
                        console.log(res)
                        alert(res.data.msg)
                    }).catch((err) => {
                        console.log(err)
                    })
            } else {
                alert("Enter Valid Password")
            }
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
                    <Heading fontSize={'4xl'}>Sign Up To Create account</Heading>

                </Stack>

                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack
                        mb='10px'
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}>
                        <Checkbox size={'lg'} onChange={(e) => setAdmin(e.target.checked)} colorScheme='red' fontWeight={'bold'} >Register As Admin</Checkbox>

                    </Stack>
                    <Stack spacing={4}>
                        <FormControl isRequired id="name">
                            <FormLabel>Name</FormLabel>
                            <Input onChange={(e) => setName(e.target.value)} placeholder='Enter Name' type="text" />
                        </FormControl>
                        <FormControl isRequired id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input placeholder='Enter Email' onChange={(e) => setemail(e.target.value)} type="email" />
                        </FormControl>
                        {
                            !isAdmin ? <FormControl id="role">
                                <FormLabel>Select Role</FormLabel>
                                <Select onChange={(e) => setuser_role(e.target.value)}>
                                    <option value="">Select Your Role</option>
                                    <option value="project manager">Project Manager</option>
                                    <option value="contractor">Contractor</option>
                                    <option value="supervisor">Supervisor</option>
                                </Select>
                            </FormControl>
                                :
                                <FormControl id="role">
                                    <FormLabel>Select Role (Disabled)</FormLabel>
                                    <Select disabled onChange={(e) => setuser_role(e.target.value)}>
                                        <option value="">Select Your Role</option>
                                        <option value="project manager">Project Manager</option>
                                        <option value="contractor">Contractor</option>
                                        <option value="supervisor">Supervisor</option>
                                    </Select>
                                </FormControl>
                        }
                        <FormControl id="pasword" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input placeholder='Enter Password'
                                    value={password}
                                    onChange={handlePasswordChange}
                                    // onChange={(e) => setpassword(e.target.value)}
                                    type={showPassword ? 'text' : 'password'} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {isValid ? (
                                <Text style={{ color: "green" }}>Password is valid.</Text>
                            ) : (
                                <Text style={{ color: "red" }}>Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.</Text>
                            )}
                        </FormControl>
                        <Stack spacing={10}>

                            <Button
                                onClick={handleRegister}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign Up
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>

    )
}

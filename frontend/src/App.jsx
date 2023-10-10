import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Box } from '@chakra-ui/react'
import { Signup } from './components/Signup'
import { Login } from './components/Login'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box>
      <Login/>
<Signup/>
    </Box>
  )
}

export default App

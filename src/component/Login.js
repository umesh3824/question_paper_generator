import { Flex } from '@mantine/core';
import { TextInput, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { Link,Route,Routes, BrowserRouter as Router,useNavigate,redirect  } from 'react-router-dom';
import loginUser from '../utils/login';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const handleSubmit = (e) =>{
    loginUser(email,password)
    if(sessionStorage.getItem('LoginToken')){
      navigate("/home/generate_paper");
    }
  }
    return (
      <div className="p-5">
              <Flex
      direction={{ base: 'column', sm: 'row' }}
      gap={{ base: 'sm', sm: 'lg' }}
      justify={{ sm: 'center' }}
    >
      <div style={{width:'40%',margin: 'auto',padding:'20px'}} className="border">
      <h5 className="text-center ">Login</h5>
      <TextInput mt="md" label="Email" placeholder="Email"  value={email} onChange={e => setEmail(e.target.value)}/>
      <TextInput mt="md" label="Password" placeholder="Password" value={password}  onChange={e => setPassword(e.target.value)}/>

      <Group position="center" mt="xl">
        {/* <Link to="/generate_paper" > */}
        <Button variant="outline" onClick={handleSubmit}>
          Login
        </Button>
        {/* </Link> */}
      </Group>
    </div>
    </Flex>
      </div>
    );
  }
  export default Login;
  
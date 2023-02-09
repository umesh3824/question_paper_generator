import { Flex } from '@mantine/core';
import { TextInput, Button, Group } from '@mantine/core';
import { Link,Route,Routes, BrowserRouter as Router } from 'react-router-dom';
function Login() {
    return (
      <div className="p-3">
              <Flex
      direction={{ base: 'column', sm: 'row' }}
      gap={{ base: 'sm', sm: 'lg' }}
      justify={{ sm: 'center' }}
    >
      <div style={{width:'40%',margin: 'auto',padding:'20px'}} className="border">
      <h5 className="text-center ">Login</h5>
      <TextInput mt="md" label="Email" placeholder="Email"  />
      <TextInput mt="md" label="Password" placeholder="Password"  />

      <Group position="center" mt="xl">
        <Link to="/generate_paper" >
        <Button variant="outline">
          Login
        </Button>
        </Link>
      </Group>
    </div>
    </Flex>
      </div>
    );
  }
  export default Login;
  
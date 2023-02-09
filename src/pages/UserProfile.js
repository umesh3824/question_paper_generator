import { Flex } from '@mantine/core';
import { TextInput, Button, Group } from '@mantine/core';

function UserProfile() {
    return (
      <div className="p-3">
              <h5 className='text-center'>UserProfile/Tmp Logout</h5>
              
              {/* <Flex
      direction={{ base: 'column', sm: 'row' }}
      gap={{ base: 'sm', sm: 'lg' }}
      justify={{ sm: 'center' }}
    >
      <div style={{width:'50%',margin: 'auto' }}>
      <TextInput label="Name" placeholder="Name"/>
      <TextInput mt="md" label="Email" placeholder="Email"  />
      <TextInput mt="md" label="Password" placeholder="Password"  />

      <Group position="center" mt="xl">
        <Button variant="outline">
          Update
        </Button>
      </Group>
    </div>
    </Flex> */}
      </div>
    );
  }
  export default UserProfile;
  
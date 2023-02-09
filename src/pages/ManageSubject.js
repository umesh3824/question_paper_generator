import { Table } from '@mantine/core';
import { Button } from '@mantine/core';
import { useState } from 'react';
import { Dialog, Group,Grid, Input ,TextInput, Text } from '@mantine/core';

function ManageSubject() {
  const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ];
  const [opened, setOpened] = useState(false);
  return (
    <div className="text-center p-3">
      <h5>ManageSubject</h5>
      <Grid>
          <Grid.Col span={11}>
                <Input.Wrapper
                  id="input-demo"
                  label="Enter Subject Title"
                  style={{textAlign:'left',marginBottom:'20px'}}
                >
                  <Input id="input-demo" placeholder="Enter Subject Title"/>
                  
                </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={1}>
                  <Button variant="gradient" style={{marginTop:'25px'}} gradient={{ from: 'teal', to: 'lime', deg: 105 }}>ADD</Button>
          </Grid.Col>
      </Grid>
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Subject Title</th>
            <th style={{width:'200px'}}>Action</th>
          </tr>
        </thead>
        <tbody>{elements.map((element) => (
          <tr key={element.name}>
            <td>{element.position}</td>
            <td>{element.name}</td>
            <td>  <Button variant="gradient" onClick={() => setOpened((o) => !o)} style={{margin:'5px'}} gradient={{ from: 'teal', to: 'lime', deg: 105 }}>EDIT</Button>
              <Button variant="gradient" style={{margin:'5px'}} gradient={{ from: 'orange', to: 'red' }}>DELETE</Button></td>
          </tr>
        ))}</tbody>
      </Table>


      <Dialog
        opened={opened}
        withCloseButton
        onClose={() => setOpened(false)}
        size="lg"
        radius="md"
        position={{ top: 100, left: 600 }}
      >
        <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
          Update Subject Title
        </Text>

        <Group align="flex-end">
          <TextInput placeholder="Enter Subject Title" style={{ flex: 1 }} />
          <Button onClick={() => setOpened(false)}>Update</Button>
        </Group>
      </Dialog>
    </div>
  );
}
export default ManageSubject;

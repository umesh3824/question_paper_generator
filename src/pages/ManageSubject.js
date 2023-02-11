import { Table } from '@mantine/core';
import { Button } from '@mantine/core';
import { useState,useMemo,useEffect } from 'react';
import { Dialog, Group,Grid, Input ,TextInput, Text } from '@mantine/core';
import { collection, query, where, getDocs, addDoc ,setDoc,doc,deleteDoc,updateDoc} from "firebase/firestore";
import { db } from '../utils/firebase'


function ManageSubject() {

  const [opened, setOpened] = useState(false);
  const [subjectList, setSubjectList] = useState([]);
  const [addSubData,setAddSubData] = useState({
    sub_title:'',
    data:''
  })
  const [updateSubData,setUpdateSubData] = useState({})


  const getAllSubList=()=>{
    getDocs(collection(db, "subject"))
  .then((querySnapshot) => {
      const subjectData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
      setSubjectList(subjectData)
      console.log(subjectList.length)
  })
  }
  useEffect(()=>{ getAllSubList()},[])

  
  const addSubHandler=()=>{
    if(addSubData.sub_title==""){
      alert("Enter Subject title")
      return 
    }
    try {
      const index=subjectList.length+1;
      setDoc(doc(db, "subject", index+""), { sub_title: addSubData.sub_title});
      setAddSubData({...addSubData,sub_title:''})
      getAllSubList()
      // alert("Subject title Added")
    } catch (e) {
      alert("Something Wrong!")
    }
  }

  const deleteSubHandler=(id)=>{
    deleteDoc(doc(db, "subject/", id+""));
    getAllSubList()
    alert("Subject Deleted!")
  }

  const updateSubHandler=()=>{
    const washingtonRef = doc(db, "subject", updateSubData.id+"");
    updateDoc(washingtonRef, {sub_title:updateSubData.sub_title});
    getAllSubList()
    alert("Subject Updated Successful!")
    setOpened(false)
  }
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
                  <Input id="input-demo" placeholder="Enter Subject Title" value={addSubData.sub_title} onChange={(e) =>{setAddSubData({...addSubData,sub_title:e.target.value})}}/>
                </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={1}>
                  <Button onClick={addSubHandler} variant="gradient" style={{marginTop:'25px'}} gradient={{ from: 'teal', to: 'lime', deg: 105 }}>ADD</Button>
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
        <tbody>{subjectList.map((subject) => (
          <tr key={subject.id}>
            <td>{subject.id}</td>
            <td>{subject.sub_title}</td>
            <td>  <Button variant="gradient" onClick={() => {setOpened((o) => !o); setUpdateSubData(subject) }} style={{margin:'5px'}} gradient={{ from: 'teal', to: 'lime', deg: 105 }}>EDIT</Button>
              <Button variant="gradient" onClick={e => deleteSubHandler(subject.id)} style={{margin:'5px'}} gradient={{ from: 'orange', to: 'red' }}>DELETE</Button></td>
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
          <TextInput placeholder="Enter Subject Title" style={{ flex: 1 }} onChange={(e) =>{setUpdateSubData({...updateSubData,sub_title:e.target.value})}} value={updateSubData.sub_title}/>
          <Button onClick={() => updateSubHandler()}>Update</Button>
        </Group>
      </Dialog>
    </div>
  );
}
export default ManageSubject;

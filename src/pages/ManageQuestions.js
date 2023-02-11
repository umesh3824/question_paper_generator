import { FileInput } from '@mantine/core';
import { IconUpload } from '@tabler/icons';
import { Table } from '@mantine/core';
import { Button, Select } from '@mantine/core';
import { useState, useMemo, useEffect } from 'react';
import { Dialog, Group, Grid, Input, TextInput, Text } from '@mantine/core';
import { collection, query, where, getDocs, addDoc, setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../utils/firebase';


function ManageQuestions() {

  const [opened, setOpened] = useState(false);
  const [openedForQUpload, setOpenedForQUpload] = useState(false);
  const [subjectList, setSubjectList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [addQData, setAddQData] = useState({
    question_title: '',
    sub_id: '',
    question_level: 'Easy',
    data: ''
  })
  const [updateQData, setUpdateQData] = useState({})
  const [selectValue, setSelectValue] = useState({
    sub_title: '',
    id: '3',
    data: ''
  })


  const getAllSubList = () => {
    getDocs(collection(db, "subject"))
      .then((querySnapshot) => {
        const selectList = []
        const subjectData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setSubjectList(subjectData)
        setAddQData({ ...addQData, sub_id: subjectData[0].id })
        setUpdateQData({ ...addQData, sub_id: subjectData[0].id })
      })
  }

  const addQHandler = () => {

    if (addQData.question_title == "") {
      alert("Enter Question title")
      return
    }
    try {
      getDocs(collection(db, "subject/" + addQData.sub_id + "/questionList"))
        .then((querySnapshot) => {
          const questionCount = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })).length + 1;

          setDoc(doc(db, "subject/" + addQData.sub_id + "/questionList/" + questionCount + ""), { question_title: addQData.question_title, question_level: addQData.question_level });
          getAllQuestionBySubId(selectValue.id);
          alert("Question is Added!")
        })
    } catch (e) {
      alert("Something Wrong!")
    }
  }

  const deleteQHandler = (id) => {
    deleteDoc(doc(db, "subject/", selectValue.id + "/questionList/" + id + ""));
    getAllQuestionBySubId(selectValue.id);
    alert("Question Deleted!")
  }

  const updateQHandler = () => {
    if (updateQData.question_title == "") {
      alert("Enter Question title")
      return
    }
    const washingtonRef = doc(db, "subject/", updateQData.sub_id + "/questionList/" + updateQData.id + "");
    updateDoc(washingtonRef, {question_title:updateQData.question_title,question_level:updateQData.question_level});
    getAllQuestionBySubId(selectValue.id)
    alert("Question Updated Successful!")
    setOpened(false)
  }
  const subjectValueChanged = (e) => {
    setSelectValue({ ...selectValue, id: e })
    // console.log(e)

    getAllQuestionBySubId(e)
  }

  const getAllQuestionBySubId = (id) => {
    // alert("subject/"+id+"/questionList")
    getDocs(collection(db, "subject/" + id + "/questionList"))
      .then((querySnapshot) => {
        const subjectData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));

        setQuestionList(subjectData)
        // console.log(subjectData)
      })
  }

  useEffect(() => { getAllSubList() }, [])
  useEffect(() => { getAllQuestionBySubId(selectValue.id) }, [])
    ;


  return (
    <div className="text-center p-3">
      <h5>ManageQuestions</h5>
      <Grid>
        <Grid.Col span={5}>
          <Input.Wrapper
            id="input-demo"
            label="Enter Subject Title"
            style={{ textAlign: 'left', marginBottom: '20px' }}
          >
            <Input id="input-demo" placeholder="Enter Question Title" value={addQData.question_title} onChange={(e) => { setAddQData({ ...addQData, question_title: e.target.value }) }} />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col span={2}>
          <Select label="Select Subject" style={{ textAlign: 'left' }}
            placeholder="Pick one Subject"
            value={addQData.sub_id}
            onChange={(e) => { setAddQData({ ...addQData, sub_id: e }) }}
            data={subjectList.map((doc) => ({ ...doc, value: doc.id, label: doc.sub_title }))}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <Select label="Question Level" style={{ textAlign: 'left' }}
            placeholder="Pick one Level"
            value={addQData.question_level}

            data={[
              { value: 'Easy', label: 'Easy' },
              { value: 'Medium', label: 'Medium' },
              { value: 'Hard', label: 'Hard' },
            ]}
            onChange={(e) => { setAddQData({ ...addQData, question_level: e }) }}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <Button onClick={() => addQHandler()} variant="gradient" style={{ marginTop: '25px' }} gradient={{ from: 'teal', to: 'lime', deg: 105 }}>ADD</Button>
        </Grid.Col>
        <Grid.Col span={1}>
          <Button onClick={()=>setOpenedForQUpload((o) => !o)}variant="gradient" style={{ marginTop: '25px' }} gradient={{ from: 'teal', to: 'lime', deg: 105 }}>Upload Question (.CSV)</Button>
        </Grid.Col>
      </Grid>
      <hr />
      <Grid style={{ paddingBottom: '20px' }}>
        <Grid.Col span={4} >
          <Select label="Select Subject To See Question" style={{ textAlign: 'left' }}
            placeholder="Pick one Subject"
            value={selectValue.id}
            onChange={(e) => { subjectValueChanged(e) }}
            data={subjectList.map((doc) => ({ ...doc, value: doc.id, label: doc.sub_title }))}
          />
        </Grid.Col>
        <Grid.Col span={1}>

        </Grid.Col>
      </Grid>
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Question Title</th>
            <th>Question Level</th>
            <th style={{ width: '200px' }}>Action</th>
          </tr>
        </thead>
        <tbody>{questionList.map((question) => (
          <tr key={question.id}>
            <td>{question.id}</td>
            <td>{question.question_title}</td>
            <td>{question.question_level}</td>
            <td>
              <Button variant="gradient" onClick={() => { setOpened((o) => !o); setUpdateQData({...question,sub_id:selectValue.id}) }} style={{ margin: '5px' }} gradient={{ from: 'teal', to: 'lime', deg: 105 }}>EDIT</Button>
              <Button variant="gradient" onClick={e => deleteQHandler(question.id)} style={{ margin: '5px' }} gradient={{ from: 'orange', to: 'red' }}>DELETE</Button>
            </td>
          </tr>
        ))}</tbody>
      </Table>


      <Dialog
        opened={opened}
        withCloseButton
        onClose={() => setOpened(false)}
        size="xl"
        radius="md"
        position={{ top: 100, left: 600 }}
      >
        <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
          Update Question Title
        </Text>
        <Input.Wrapper
          id="input-demo"
          label="Enter Subject Title"
          style={{ textAlign: 'left', marginBottom: '20px' }}
        >
        <Input id="input-demo" placeholder="Enter Question Title" value={updateQData.question_title} onChange={(e) => { setUpdateQData({ ...updateQData, question_title: e.target.value }) }} />
        </Input.Wrapper>
        <Select label="Select Subject" style={{ textAlign: 'left' }}
          placeholder="Pick one Subject"
          value={updateQData.sub_id}
          onChange={(e) => { setUpdateQData({ ...updateQData, sub_id: e }) }}
          data={subjectList.map((doc) => ({ ...doc, value: doc.id, label: doc.sub_title }))}
        />
        <Select label="Question Level" style={{ textAlign: 'left' }}
          placeholder="Pick one Level"
          value={updateQData.question_level}

          data={[
            { value: 'Easy', label: 'Easy' },
            { value: 'Medium', label: 'Medium' },
            { value: 'Hard', label: 'Hard' },
          ]}
          onChange={(e) => { setUpdateQData({ ...updateQData, question_level: e }) }}
        />
        <div style={{textAlign:'center'}}>
            <Button onClick={() => updateQHandler()} variant="gradient" style={{ marginTop: '25px' }} gradient={{ from: 'teal', to: 'lime', deg: 105 }}>Update</Button>
        </div>
      </Dialog>



      <Dialog
        opened={openedForQUpload}
        withCloseButton
        onClose={() => setOpenedForQUpload(false)}
        size="xl"
        radius="md"
        position={{ top: 100, left: 600 }}
      >
        <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
          Upload Bulk Question using .CSV file
        </Text>
        <FileInput label="Upload .CSV file" placeholder="Select .CSV file" />
        <Select label="Select Subject" style={{ textAlign: 'left' }}
          placeholder="Pick one Subject"
          value={updateQData.sub_id}
          onChange={(e) => { setUpdateQData({ ...updateQData, sub_id: e }) }}
          data={subjectList.map((doc) => ({ ...doc, value: doc.id, label: doc.sub_title }))}
        />
        <div style={{textAlign:'center'}}>
            <Button onClick={() => updateQHandler()} variant="gradient" style={{ marginTop: '25px' }} gradient={{ from: 'teal', to: 'lime', deg: 105 }}>Update</Button>
        </div>
      </Dialog>
    </div>
  );
}
export default ManageQuestions;

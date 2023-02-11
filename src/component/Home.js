import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';

import Sidebar from './Sidebar';
import { Link,Route,Routes, BrowserRouter as Router } from 'react-router-dom';
import GenerateQuestionPaper from '../pages/GenerateQuestionPaper';
import ManageQuestions from '../pages/ManageQuestions';
import UserProfile from '../pages/UserProfile';
import ManageSubject from '../pages/ManageSubject';
import Login from '../component/Login';
import Logout from '../component/Logout';
export default function Home() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
        <Sidebar/>
        </Navbar>
      } 

      footer={
        <Footer height={60} p="md" style={{backgroundColor:'black',color:'white',textAlign:'center',border:'none'}}>
          Application footer
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md" style={{color:'white',backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,border:'none'}}>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%'}}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text sx={{margin:'auto',fontWeight:'900'}}>Question Paper Generator</Text>
          </div>
        </Header>
      }
    >
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/generate_paper" element={<GenerateQuestionPaper/>}/>
          <Route path="/manage_question" element={<ManageQuestions/>}/>
          <Route path="/manage_subject" element={<ManageSubject/>}/>
          <Route path="/user_profile" element={<UserProfile/>}/>

      </Routes>    
    </AppShell>
  );
}
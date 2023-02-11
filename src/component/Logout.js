import { Flex } from '@mantine/core';
import { TextInput, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { Link,Route,Routes, BrowserRouter as Router,useNavigate,redirect  } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
function Logout() {

  const auth = getAuth();
  let navigate = useNavigate();
  signOut(auth).then(() => {
    sessionStorage.setItem("LoginToken","")
    sessionStorage.clear()
    navigate('/')
  }).catch((error) => {
    // An error happened.
  });

    return (
      <div className="p-5">
      <h1>Logout</h1>
      </div>
    );
  }
  export default Logout;
  
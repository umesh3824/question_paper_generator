import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/style.css';
import { Route,Routes, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/header'
import Home from './component/Home';
import Sidebar from './component/Sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    {/* <Sidebar/> */}
    <Router>
    <Home/>
    </Router>
    {/* <Header/> 
    <Home/>  */}
  </div>
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/style.css';
import { Route,Routes, BrowserRouter as Router , useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './component/Home';
import Sidebar from './component/Sidebar';
import firebaseApp from './utils/firebase'
import loginUser from './utils/login';
import Login from './component/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div>
    <Router>
          <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/home/*" element={<Home/>} />
          </Routes>
    </Router>
  </div>
);


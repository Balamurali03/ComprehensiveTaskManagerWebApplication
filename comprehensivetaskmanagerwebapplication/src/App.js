//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup'
import Dashboard from './Components/Dashboard';
import Nav from './Components/Nav';
import Update from './Components/Update';

function App() {
  return (
   
  <Router>
    <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard></Dashboard>}/>
        <Route path='/nav' element={<Nav></Nav>}/>
        <Route path='/update' element={<Update></Update>}/>
      </Routes>
    </Router>
  
  );
}

export default App;

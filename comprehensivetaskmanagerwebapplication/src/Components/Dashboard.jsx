import React, { useEffect } from 'react';
import Admin from "./Admin";
import Employee from "./Employee";
import Employer from "./Employer";
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const userData = JSON.parse(localStorage.getItem('userDetails'));
  const navigate = useNavigate();
  
  useEffect(()=>{
    if( userData == null) {
        navigate("/") 
    }
  })
 // console.log(userData);
    return (  <>
   { userData != null && <div> 
        <Nav></Nav>
     <h1>Hello {userData.signupData.name}</h1>
    {userData.signupData.role==='EMPLOYER' && <Employer></Employer>}
    {userData.signupData.role==='ADMIN' &&  <Admin></Admin>}
    {userData.signupData.role==='EMPLOYEE' && <Employee></Employee>}
    </div>}
    </>
   
   )
};

export default Dashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  let [isDataPresent,setIsDataPresent] =useState(false)
 
    const navigate = useNavigate();
   

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if(formData.email ===''||formData.password ==='') {
      notifyMsgFieldEmpty()
    } else {
    // Perform login action here with formData
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(formData);
//console.log(raw);
    const requestOptions = {
      method: "POST", // Change method to POST for login
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

  try {
    const response = await fetch("http://localhost:9001/login", requestOptions);
    const data = await response.json();
    console.log(data);

    localStorage.setItem('userDetails', JSON.stringify(data));
  
   
    if (data.signupData !== null) {
     
      notifyLogin(data.message);
      navigate("/dashboard");
    } else {
      notifyLogin(data.message);
    }
  } catch (error) {
    console.error(error);
    notifyLogin('Data incorrect');
  }

  console.log('Logging in with data:', formData);
};
}
 useEffect(()=>{
  const userData = JSON.parse(localStorage.getItem('userDetails'));
  if(userData != null) {
    setIsDataPresent (true);
    console.log(isDataPresent );
  }

 },[isDataPresent])
 
  let notifyMsgFieldEmpty= ()=> {
    toast.dismiss();
    toast(<b>
        &nbsp;&nbsp;Please fill all the fields</b>, {
        position: "top-center",
    });
    }

    let notifyLogin=(message) => {
      toast.success(<b>{message}</b>, {
        position: "top-center",
       });
       
  }

  return (
    <div>
      {! isDataPresent &&<div>
        <div className="login-headcontainer">
            <h2>Login</h2>
            </div>
        <div className="login-container">
     
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    <ToastContainer className="Toast-at-center" />
    </div>} 
    {isDataPresent && navigate("/dashboard") }
    </div>
  );
};

export default Login;

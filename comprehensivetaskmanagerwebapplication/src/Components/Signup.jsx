import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    phno: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name==="confirm-password") {
        setConfirmPassword(value);
    }
    setFormData({ ...formData, [name]: name === 'phno' ? parseInt(value, 10) : value });
  };


const handleSubmit = async (e) => {
    e.preventDefault(); 
    if(formData.email===''||formData.name===''||formData.password===''||formData.phno===''||formData.role==='') {
        notifyMsgFieldEmpty();
    } else {
        if (confirmPassword === formData.password) {
            try {
              const myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
      
              const raw = JSON.stringify(formData);
      
              const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
              };
      
              const response = await fetch("http://localhost:9001/signup", requestOptions);
              const result = await response.text();
              notifySignup(result);
              console.log(result);
             
            } catch (error) {
                notifySignup(error);
              console.error(error);
            }
          } else {
            notifyMsgPasswordMismatch();
            console.log('Password mismatch');
          }
    }
   
  };
  let notifyMsgFieldEmpty= ()=> {
    toast.dismiss();
    toast(<b>
        &nbsp;&nbsp;Please fill all the fields</b>, {
        position: "top-center",
    });
    }

    let notifyMsgPasswordMismatch= ()=> {
      toast.dismiss();
      toast(<b>
          &nbsp;&nbsp;Password doesn't match </b>, {
          position: "top-center"
      });}

      let notifySignup=(message) => {
        toast.success(<b>{message}</b>, {
          position: "top-center",
         });
         window.location.reload();
    }


  return (
    
   <div>
    <div className="signup-headcontainer">
        <h2>Signup</h2>
    </div>
     <div className="signup-container">
   
   <form onSubmit={handleSubmit} className="signup-form">
     <div className="form-group">
       <label htmlFor="name">Name:</label>
       <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
     </div>
     <div className="form-group">
       <label htmlFor="email">Email:</label>
       <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
     </div>
     <div className="form-group">
       <label htmlFor="password">Password:</label>
       <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
     </div>
     <div className="form-group">
       <label htmlFor="confirm-password">Confirm Password:</label>
       <input type="password" id="confirm-password" name="confirm-password" value={formData.confirmPassword} onChange={handleChange} />
     </div>
     <div className="form-group">
       <label>Role:</label>
       <div className="role-checkboxes">
         <div>
         <label htmlFor="role_admin">Admin</label>
           <input type="checkbox" id="role_admin" name="role" value="ADMIN" checked={formData.role === 'ADMIN'} onChange={handleChange} />
           
         </div>
         <div>
         <label htmlFor="role_employer">Employer</label>
           <input type="checkbox" id="role_employer" name="role" value="EMPLOYER" checked={formData.role === 'EMPLOYER'} onChange={handleChange} />
          
         </div>
         <div>
         <label htmlFor="role_employee">Employee</label>
           <input type="checkbox" id="role_employee" name="role" value="EMPLOYEE" checked={formData.role === 'EMPLOYEE'} onChange={handleChange} />
           
         </div>
       </div>
     </div>
     <div className="form-group">
       <label htmlFor="phno">Phone Number:</label>
       <input type="tel" id="phno" name="phno" value={formData.phno} onChange={handleChange} maxLength="10" pattern="[0-9]{10}" />
     </div>
     <button type="submit">Signup</button>
   </form>
 </div>
 <div className="signup-tailcontainer">
    
    <Link to="/login">Already have an account?<button>Login</button> </Link>
 </div>
 <ToastContainer className="Toast-at-center" />
   </div>
  
  );
};

export default Signup;

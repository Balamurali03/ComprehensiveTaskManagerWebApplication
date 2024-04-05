import React, { useState } from 'react';
import axios from 'axios';

const Update = () => {

    const userData = JSON.parse(localStorage.getItem('userDetails'));
    const [formData, setFormData] = useState({
        role: userData.signupData.role,
        name: userData.signupData.name,
        email: userData.signupData.email,
        password: userData.signupData.password,
        phno: userData.signupData.phno,
      });
      const [message, setMessage] = useState('');
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'phno' ? parseInt(value, 10) : value });
      };


      const handleUpdate =  () => {


       // let data = JSON.stringify(formData)
        const token = userData.jwtToken;
       
        
        axios.patch('http://localhost:9001/update-account',formData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}` // Use the token from userData
            }
          })
          .then(response => {
            console.log(response);
            if (response.data === "Account updated") {
              setMessage('User data updated successfully!');
              userData.signupData=formData;
              localStorage.setItem('userDetails', JSON.stringify(userData));
              console.log(userData);
            
            } else {
              setMessage('Failed to update user data.');
            }
          })
          .catch(error => {
            setMessage('An error occurred while updating user data.');
            console.error('Error updating user data:', error);
          });

          

       
       
      };
    
      return (
        <div>
          <h2>Update User Data</h2>
          
          <div>
            <label>New Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
         
          {/* <div>
            <label>New Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(e.target.value)}
            />
          </div> */}
         
          <div>
            <label>New Phone:</label>
            <input
            name="phno"
              type="tel"
              value={formData.phno}
              onChange={handleChange} maxLength="10" pattern="[0-9]{10}"
            />
          </div>
          <button onClick={handleUpdate}>Update</button>
          {message && <p>{message}</p>}
        </div>
      );
    };

export default Update;
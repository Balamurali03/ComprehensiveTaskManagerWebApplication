import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';


import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import cssu


const NavBar = ({ setShowProfileModal }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userDetails');
        navigate("/login")
        
    };
    let showConfirmationPopup = () => {
        confirmAlert({
          title: "Confirm to Logout",
          message: 'Are you sure you want to logout?',
          buttons: [
            {
              label: "Yes",
              onClick: () => handleLogout(),
            },
            {
              label: "No",
            },
          ],
        });
      }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-light">
            <div className="container">

                <div>
                <span className="navbar-brand" style={{  cursor:'pointer'}}>Task Manager App</span>
                </div>
                <div style={{ marginLeft:'100px', cursor:'pointer'}}>
                    <Link to="/dashboard">HOME</Link>
                </div>
                
                <div className="collapse navbar-collapse" id="navbarNav" style={{ marginLeft:'150px' }}>
                    
                            <button className="btn btn-link nav-link btn btn-info" style={{ width: '80px' }} onClick={() => setShowProfileModal(true)}>Profile</button>
                       
                </div>



                <div className="collapse navbar-collapse" id="navbarNav" style={{ marginLeft:'100px' }}>
                   
                            <button className="btn btn-link nav-link btn btn-outline-danger" style={{ width: '80px' }} onClick={showConfirmationPopup}>Logout</button>
                       
                </div>
            </div>
        </nav>
    );
};

const ProfileModal = ({ show, onClose }) => {

    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userDetails'));
    const jwtToken = userData.jwtToken
   


    let handleDeleteAccount = () => {
        const email = userData.signupData.email;
        const token = jwtToken;
    console.log(token);
       
        axios.delete('http://localhost:9001/delete-account', {
      headers: {
        email: email,
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
        console.log(response.data);
            localStorage.removeItem('userDetails');
            navigate("/");
    })
    .catch(error => {
      console.error('Error fetching departments:', error);
    });
    };
    

    let showConfirmationPopup = () => {
        confirmAlert({
          title: "Confirm to Delete",
          message: 'Are you sure you want to delete this account?',
          buttons: [
            {
              label: "Yes",
              onClick: () => handleDeleteAccount(),
            },
            {
              label: "No",
            },
          ],
        });
      }

 
      let pushToUpdatePage = () => {
        navigate("/update");
      }
   
    return (
        <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '1050' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Profile</h5>
                        <button type="button" className="close" aria-label="Close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {/* User Details */}
                        <p>Name: {userData.signupData.name}</p>
                        <p>Email: {userData.signupData.email}</p>
                        <p>Phone: {userData.signupData.phno}</p>
                        <p>Role:{userData.signupData.role}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-primary" onClick={pushToUpdatePage}>Update</button>
                        <button type="button" className="btn btn-outline-danger" onClick={() => { showConfirmationPopup(); onClose(); }}>Delete Account</button>
                        <button type="button" className="btn btn-outline-warning" onClick={onClose}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Nav = () => {
    const [showProfileModal, setShowProfileModal] = useState(false);

    return (
        <div>
            <NavBar setShowProfileModal={setShowProfileModal} />
            <ProfileModal show={showProfileModal} onClose={() => setShowProfileModal(false)} />
        </div>
    );
};

export default Nav;

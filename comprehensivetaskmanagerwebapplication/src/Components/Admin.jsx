import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Admin = () => {
  const [userData, setUserData] = useState(null); 
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    phno: '',
  });
 // const [message, setMessage] = useState('');
 

    
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userDetails'));
     const token = user.jwtToken;

    
    let fetchData =  () => {
   
                axios.get('http://localhost:9001/show-all-signup-data', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(response => {
              console.log(response.data);
              setUserData(response.data);
            })
            .catch(error => {
              console.error('Error fetching departments:', error);
            }); 
    };

    fetchData(); 
  }, []); 

  
  let handleDeleteAccount = (id) => {
    const user = JSON.parse(localStorage.getItem('userDetails'));
    let filteredEmail='';
    const filteredUser = userData.find(user => user.id === id);
    if (filteredUser) {
        filteredEmail =filteredUser.email;
    } 
     const jwtToken = user.jwtToken;

   
    const token = jwtToken;
console.log(token); 
console.log(filteredEmail);
   
    axios.delete('http://localhost:9001/delete-account', {
  headers: {
    email: filteredEmail,
    Authorization: `Bearer ${token}`
  }
})
.then(response => {
    console.log(response.data);
    window.location.reload();
})
.catch(error => {
  console.error('Error deleting  details:', error);
});
};


let showConfirmationPopup = (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: 'Are you sure you want to delete this Data?',
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDeleteAccount(id),
        },
        {
          label: "No",
        },
      ],
    });
  }

  const handleUpdate = (id) => {
    setSelectedUser(id);
    console.log(id);
    console.log(selectedUser);
    console.log(updatedData);
    const filteredUser = userData.find(user => user.id === id);
    if (filteredUser) {
       console.log("entered");
        setUpdatedData({
            name: filteredUser.name,
            email: filteredUser.email,
            phno: filteredUser.phno,
            role: filteredUser.role,
            password: ''
          });
       
    } 
    setOpenDialog(true);
  };

  const handleSave = () => {

    const userData = JSON.parse(localStorage.getItem('userDetails'));
    const token = userData.jwtToken;

    axios.patch('http://localhost:9001/update-account',updatedData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Use the token from userData
        }
      })
      .then(response => {
        console.log(response);
        if (response.data === "Account updated") {
          //setMessage('User data updated successfully!');
         // userData.signupData=formData;
         // localStorage.setItem('userDetails', JSON.stringify(userData));
          console.log(updatedData);
          toast.success('User data updated successfully!');
          window.location.reload();
        } else {
         // setMessage('Failed to update user data.');
          toast.error('Failed to update user data.')
        }
      })
      .catch(error => {
       // setMessage('An error occurred while updating user data.');
        console.error('Error updating user data:', error);
        toast.warning("An error occurred while updating user data.")
      });
    //  window.location.reload();
    console.log("Updated Data:", updatedData);
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: name === 'phno' ? parseInt(value, 10) : value });
    // setUpdatedData({
    //   ...updatedData,
    //   [e.target.name]: e.target.value
    // });
  };
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData && userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phno}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleUpdate(user.id)}>Update</Button>
                <Button variant="contained" color="secondary" onClick={() => showConfirmationPopup(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={userData ? userData.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>

    <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            name="name"
            fullWidth
            value={updatedData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            name="email"
            fullWidth
            value={updatedData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="phno"
            label="Phone Number"
            type="text"
            name="phno"
            fullWidth
            value={updatedData.phno}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="role"
            label="Role"
            type="text"
            name="role"
            fullWidth
            value={updatedData.role}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
  </>
  );
};

export default Admin;


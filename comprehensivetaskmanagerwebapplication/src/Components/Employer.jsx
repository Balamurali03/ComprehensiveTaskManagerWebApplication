import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField,Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,MenuItem } from '@mui/material';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";


const Employer = () => {
    const [workData, setWorkData] = useState([]);
    const [selectedWork, setSelectedWork] = useState(null); 
  const [open, setOpen] = useState(false); 
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false); 
  const [assignedToOptions, setAssignedToOptions] = useState([]);
  const [openAssignToDialog, setOpenAssignToDialog] = useState(false); 
  const [newWorkData, setNewWorkData] = useState({
    workTopic: '',
    description: '',
    assignedBy:  JSON.parse(localStorage.getItem('userDetails')).signupData.email,
    deadLine: '',
    assignedTime:null,
    assignedTo:[],
    workId:0
  });
  const [selectedUser, setSelectedUser] = useState(''); 
  const [newAssignData, setNewAssignData] = useState({
    assignedTo:'',
	 comments:'',
	 status:'',
	 updates:'',
     work :{
        workTopic: '',
        description: '',
        assignedBy:  JSON.parse(localStorage.getItem('userDetails')).signupData.email,
        deadLine: '',
        assignedTime:null,
        assignedTo:[],
        workId:''
     }
  });
 

  const handleChangeEmail = (event) => {
    setSelectedUser(event.target.value); 
  };

  const setWorkId = (workId) => {
    setNewAssignData(prevState => ({
      ...prevState,
      work: {
        ...prevState.work,
        workId: workId
      }
    }));
  };

  const setSelectedUserAndAssignTo = (selectedMail) => {
   // setSelectedUser(user);
    newAssignData.assignedTo=selectedMail
    setNewAssignData(prevState => ({
      ...prevState,
      assignedTo: selectedMail,
      work: {
        ...prevState.work,
        assignedTo: [selectedMail]
      }
    }));
  };
  const handleAssignedToClick1 = () => {

    setWorkId(selectedWork.workId)

    const user = JSON.parse(localStorage.getItem('userDetails'));
    const token = user.jwtToken;

   
  
  
               axios.get('http://localhost:9001/show-all-signup-data', {
             headers: {
               Authorization: `Bearer ${token}`
             }
           })
           .then(response => {
             console.log(response.data);
             const filteredEmployees = response.data.filter(employee => employee.role === "EMPLOYEE");
             const emails = filteredEmployees.map(employee => employee.email);
             const assignedToEmails = selectedWork.assignedTo.map(item => item.assignedTo);
             const notInAssignedTo = emails.filter(email => !assignedToEmails.includes(email));
             
             console.log(notInAssignedTo);
             if(notInAssignedTo.length>0) {
                setAssignedToOptions(notInAssignedTo);
             }
             else {
                setAssignedToOptions(["No Employee Left"]);
             }
             //setUserData(response.data);
           })
           .catch(error => {
             console.error('Error fetching departments:', error);
           }); 
   
   
   
    setOpenAssignToDialog(true);
  };
  const handleCloseAssignToDialog = () => {
    setOpenAssignToDialog(false);
    setOpen(true);
    

  };
  const handleSaveAssignTo =() => {

    setSelectedUserAndAssignTo(selectedUser);
    console.log("trying to change",selectedUser, selectedWork);
   
    const userData = JSON.parse(localStorage.getItem('userDetails'));
    const token = userData.jwtToken;

   
console.log("newAssignData",newAssignData);
    axios.post('http://localhost:9001/create-assigned-detail',newAssignData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Use the token from userData
        }
      })
      .then(response => {
        console.log(response);
        console.log(response);
        if (response.data === "AssignedToDetails created") {
         
          console.log(newAssignData);
          //setOpen(false);
         // window.location.reload();
        
        } else {
         // setMessage('Failed to update user data.');
         console.log("failed");
        }
      })
      .catch(error => {
        
        console.error('Error updating user data:', error);
      });


    setOpenAssignToDialog(false);
    //setOpen(false);
  }
 
  const handleAssignedToClick = (work) => {
    setSelectedWork(work); 
    //console.log(work);
    setOpen(true); 
  };

 
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleUpdateWorkClick = (id) => {
    setSelectedWork(id); 
    const filteredWork = workData.find(work => work.workId === id);
    if (filteredWork) {
        setNewWorkData({
            workId:id,
            workTopic: filteredWork.workTopic,
            description: filteredWork.description,
            assignedBy: filteredWork.assignedBy, 
            deadLine: filteredWork.deadLine,
            assignedTime:filteredWork.assignedTime,
            assignedTo:filteredWork.assignedTo
          });
    }
   
    setOpenUpdateDialog(true);
  };
  const handleAddWork = () => {
      console.log('Add new work');
    setOpenAddDialog(true);
  };

  const handleChange = (e) => {
    setNewWorkData({
      ...newWorkData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveWork = () => {
    const userData = JSON.parse(localStorage.getItem('userDetails'));
    const token = userData.jwtToken;

    console.log(newWorkData);

    axios.post('http://localhost:9001/create-work',newWorkData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Use the token from userData
        }
      })
      .then(response => {
        console.log(response);
        console.log(response);
        if (response.data === "Work created") {
         // setMessage('User data updated successfully!');
         // userData.signupData=formData;
         // localStorage.setItem('userDetails', JSON.stringify(userData));
          console.log(newWorkData);
          window.location.reload();
        
        } else {
         // setMessage('Failed to update user data.');
         console.log("failed");
        }
      })
      .catch(error => {
        
        console.error('Error updating user data:', error);
      });

    setOpenAddDialog(false);
    // Example: window.location.reload();
  };

  const convertAssignedToArray = (assignedTo) => {
    const users = [];
    for (const key in assignedTo) {
      if (assignedTo.hasOwnProperty(key)) {
        users.push(assignedTo[key]);
      }
    }
    console.log(users);
    return users;
  };

  const handleUpdateWork = () => {
    const userData = JSON.parse(localStorage.getItem('userDetails'));
    const token = userData.jwtToken;

    console.log('Update work with assigningId:');
    console.log(newWorkData);

    axios.patch('http://localhost:9001/update-work',newWorkData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Use the token from userData
        }
      })
      .then(response => {
        console.log(response);
        console.log(response);
        if (response.data === "Work Updated") {
         // setMessage('User data updated successfully!');
         // userData.signupData=formData;
         // localStorage.setItem('userDetails', JSON.stringify(userData));
          console.log(newWorkData);
          window.location.reload();
        
        } else {
         // setMessage('Failed to update user data.');
         console.log("failed");
        }
      })
      .catch(error => {
        
        console.error('Error updating user data:', error);
      });
      setOpenUpdateDialog(false);


  };

  const handleDeleteWork = (assigningId) => {
    
    console.log('Delete work with assigningId:', assigningId);
    confirmAlert({
      title: "Confirm to Delete",
      message: 'Are you sure you want to delete this Work?',
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteWork(assigningId),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const deleteWork = (assigningId) => {


    const userData = JSON.parse(localStorage.getItem('userDetails'));
    const token = userData.jwtToken;

    console.log(assigningId);

    axios.delete('http://localhost:9001/delete-work',{
        headers: {
          id: assigningId,
          Authorization: `Bearer ${token}` 
        }
      })
      .then(response => {
        console.log(response);
        console.log(response);
        if (response.data === "Data deleted") {
          
          window.location.reload();
        
        } else {
         // setMessage('Failed to update user data.');
         console.log("failed");
        }
      })
      .catch(error => {
        
        console.error('Error deleting user data:', error);
      });

    //setOpenAddDialog(false);
    // axios.delete(`http://localhost:9001/delete-work/${assigningId}`)
    //   .then(response => {
    //     console.log(response.data);
    //     fetchData(); // Fetch updated data
    //   })
    //   .catch(error => {
    //     console.error('Error deleting work details:', error);
    //   });
  };

  

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userDetails'));
         const token = user.jwtToken;
        const email = user.signupData.email;
        
        let fetchData =  () => {
       
                    axios.get('http://localhost:9001/show-all-creator-work', {
                  headers: {
                    email: email,
                    Authorization: `Bearer ${token}`
                  }
                })
                .then(response => {
                  console.log(response.data);
                  setWorkData(response.data);
                })
                .catch(error => {
                  console.error('Error fetching departments:', error);
                }); 
        };
    
        fetchData(); 
      }, []); 

    return ( <>
       
        <Button variant="contained" color="primary" onClick={() => handleAddWork()}  style={{ width:'150px'}}>Add Work</Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Work ID</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Assigned By</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workData.map((work) => (
                <TableRow key={work.workId}>
                  <TableCell>{work.workId}</TableCell>
                  <TableCell>{work.workTopic}</TableCell>
                  <TableCell>{work.description}</TableCell>
                  <TableCell>{work.assignedBy}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleAssignedToClick(work)}>View Assigned To</Button>
                  </TableCell>
                  <TableCell>{work.deadLine}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleUpdateWorkClick(work.workId)}>Update</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteWork(work.workId)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

       

        <Dialog open={open} onClose={handleClose}>
        {/* Assigned to dialog content... */}
      </Dialog>

      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Work</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="workTopic"
            label="Work Topic"
            type="text"
            name="workTopic"
            fullWidth
            value={newWorkData.workTopic}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            name="description"
            fullWidth
            value={newWorkData.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="deadLine"
            label="Deadline"
            type="text"
            name="deadLine"
            fullWidth
            value={newWorkData.deadLine}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleSaveWork} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
  
        {/* Popup/Modal */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Assigned To</DialogTitle>
          <Button variant="contained" color="primary" onClick={() => handleAssignedToClick1()} style={{ width:'20px' }}>+</Button>
          <DialogContent>
          {selectedWork && (
  <TableContainer component={Paper}>
    <Table>
   
      <TableHead>
        <TableRow>
          <TableCell>Assigned To</TableCell>
          <TableCell>Comments</TableCell>
          <TableCell>Status Updates</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {convertAssignedToArray(selectedWork.assignedTo).map((assignedItem, index) => (
          <TableRow key={index}>
            <TableCell>{assignedItem.assignedTo}</TableCell>
            <TableCell>{assignedItem.comments}</TableCell>
            <TableCell>{assignedItem.updates}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Update Work</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="workTopic"
            label="Work Topic"
            type="text"
            name="workTopic"
            fullWidth
            value={newWorkData.workTopic}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            name="description"
            fullWidth
            value={newWorkData.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="deadLine"
            label="Deadline"
            type="text"
            name="deadLine"
            fullWidth
            value={newWorkData.deadLine}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
          <Button onClick={handleUpdateWork} color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAssignToDialog} onClose={handleCloseAssignToDialog}>
        <DialogTitle>Assign To</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Select User"
            fullWidth
            value={selectedUser}
            onChange={handleChangeEmail}
            name="assignedTo"
          >
            {assignedToOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignToDialog}>Cancel</Button>
          <Button onClick={handleSaveAssignTo} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      </>)
};

export default Employer;



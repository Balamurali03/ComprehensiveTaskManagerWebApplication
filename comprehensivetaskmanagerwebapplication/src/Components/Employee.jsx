import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Employee = () => {

    const [myWorkData, setMyWorkData] = useState([]);
    const [selectedWork, setSelectedWork] = useState(null);
    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [comments, setComments] = useState('');
    const [updates, setUpdates] = useState('');
    

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userDetails'));
         const token = user.jwtToken;
        const email = user.signupData.email;
        
        let fetchData =  () => {
       
                    axios.get('http://localhost:9001/show-my-work', {
                  headers: {
                    email: email,
                    Authorization: `Bearer ${token}`
                  }
                })
                .then(response => {
                  console.log(response.data);
                  setMyWorkData(response.data);
                })
                .catch(error => {
                  console.error('Error fetching departments:', error);
                }); 
        };
    
        fetchData(); 

    },[])

    const handleUpdateWork = (work) => {
        setSelectedWork(work);
        setComments(work.comments); 
        setUpdates(work.updates);
        setUpdateOpen(true);
    };
   const handleWorkPopUp =(work)=>{
    setSelectedWork(work);
    setOpen(true);
   }

    const handleClose = () => {
        setSelectedWork(null);
        setUpdateOpen(false);
        setComments('');
        setUpdates('');
        setOpen(false);
    };

    const handleSaveUpdate = () => {

        let update=null;
       
        if (selectedWork) {
             update =  selectedWork;
            update.comments=comments;
            update.updates=updates;
            console.log("update",update);
           
        }

         //console.log("selectedWork",selectedWork);
        const user = JSON.parse(localStorage.getItem('userDetails'));
        const token = user.jwtToken;
      
      
                   axios.patch('http://localhost:9001/update-assigned-detail',update, {
                 headers: {
                    'Content-Type': 'application/json',
                   Authorization: `Bearer ${token}`
                 }
               })
               .then(response => {
                 console.log(response.data);
                // setMyWorkData(response.data);
               // window.location.reload();
               })
               .catch(error => {
                 console.error('Error fetching departments:', error);
               }); 
       


        console.log('Assigning ID:', selectedWork.assigningId);
        console.log('Comments:', comments);
        console.log('Updates:', updates);
        handleClose();
    };

    return (<>
        
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Assigning Id</TableCell>
                        <TableCell>Comments</TableCell>
                        <TableCell>Updates</TableCell>
                        <TableCell>Work</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {myWorkData.map((work) => (
                        <TableRow key={work.assigningId}>
                            <TableCell>{work.assigningId}</TableCell>
                            <TableCell>{work.comments}</TableCell>
                            <TableCell>{work.updates}</TableCell>
                            <TableCell>
                                <Button variant="outlined"  onClick={() => handleWorkPopUp(work)}>Work Details</Button>   
                                {/* */}
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" onClick={() => handleUpdateWork(work)}>Update</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Dialog open={updateOpen} onClose={handleClose}>
                <DialogTitle>Update Work</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Comments"
                        fullWidth
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Updates"
                        fullWidth
                        value={updates}
                        onChange={(e) => setUpdates(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSaveUpdate} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle> Work Data</DialogTitle>
            <DialogContent>
                {selectedWork && (
                    <div>
                        <p>Work ID: {selectedWork.work.workId}</p>
                        <p>Work Topic: {selectedWork.work.workTopic}</p>
                        <p>Description: {selectedWork.work.description}</p>
                        <p>Assigned By: {selectedWork.work.assignedBy}</p>
                        <p>Deadline: {selectedWork.work.deadLine}</p>
                        {/* Add additional fields for other work details */}
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                {/* <Button onClick={handleUpdateSubmit} color="primary">Update</Button> */}
            </DialogActions>
        </Dialog>
    </>)
};

export default Employee;
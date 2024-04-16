import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import axios from 'axios';
import NewDiaryIcon from '../diaries/NewDiaryIcon';

export default function CreateDiary({ updated, setUpdated, userId }) {
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios.post(`http://localhost:5000/users/${userId}/diaries/new`, { year:year });
    if(response) alert(response.data);
    handleClose();
    setUpdated(!updated);
  }

  return (
    <div>
        {/* <Fab color="primary" onClick={handleClickOpen} aria-label="add"><AddIcon /></Fab> */}
        <NewDiaryIcon onClick={handleClickOpen}/>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create a new Diary for a year to view yearly and monthly data</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the year for which you want to create a new Diary</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Year"
            type="number" onChange={(e)=>setYear(e.target.value)}
            fullWidth value={year}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import React, { useState } from 'react';
import {Typography, InputBase, Button, makeStyles} from '@material-ui/core';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import {io} from 'socket.io-client';

const ChangePassword = ({userId}) => {

  const useStyles = makeStyles((theme) => ({
    modalContent: {
      position: 'absolute',
      width: '300px',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    field: {
      margin: '5px'
    },
    alert: {
      marginBottom: '10px'
    }
  }))
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const styles = useStyles();
    const [modalStyle] = useState(getModalStyle);
    function getModalStyle() {
      const top = 50 ;
      const left = 50 ;  
      return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }
const handleSubmit = async (e) => {
 e.preventDefault();
try {
const response = await axios.post(`/users/${userId}/changepass`, {password, newPassword, confirmNewPassword});
setMessage(response.data);
setConfirmNewPassword('');
setPassword('');
setNewPassword('');

}
catch(err) {
setMessage(err.response.data.error);
setSeverity('error');
}
}

  return (<div style={modalStyle} className={styles.modalContent}>
    <h3>Changing Password!!</h3>
    {message ? <Alert severity={severity} className={styles.alert}>{message}</Alert>:<div></div>}
     <form onSubmit={handleSubmit}>
        <TextField className={styles.field} label="Old Password" variant = "outlined" type="password" name="password" id="pass" value={password} onChange={(e)=>setPassword(e.target.value)} required={true}/>
        <TextField className={styles.field} label="New Password" variant = "outlined" type="password" name="newpassword" id="newpass" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required={true}/>
        <TextField className={styles.field} label="Confirm Password" variant = "outlined" type="password" name="confirmpassword" id="confirmpass" value={confirmNewPassword} onChange={(e)=>setConfirmNewPassword(e.target.value)} required={true}/>
        <Button type="submit" name="changepass" id="chnagepass" onClick = {handleSubmit}>Save</Button>
    </form>
  </div>);
};

export default ChangePassword;

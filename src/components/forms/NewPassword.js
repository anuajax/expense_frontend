import React, { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Button, InputBase, makeStyles, Paper, } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
    maindiv: {
        height: '100vh',
        width: '100%',
        background: theme.palette.primary.light,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paperRoot:{
        boxShadow: '0 0 15px #9ecaed',
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input : {
    border: "2px solid red",
    borderRadius : theme.shape.borderRadius,
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    background: 'rgba(0,1,2,0.6)',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    fontFamily: 'Verdana',
    fontWeight: 'bolder'
    },
    alert: {
        marginBottom: theme.spacing(2)
      }
}));
const NewPassword = () => {
    const styles = useStyles();
    const [newPassword, setPassword] = useState('');
    const [confirmNewPassword, setConfirm] = useState('');
    const [error, setError] = useState('');
    const {token} = useParams();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
     e.preventDefault();
     
    try {
    const pass = {newPassword, confirmNewPassword};
    const response = await axios.post(`/resetpass/${token}`,  pass);
    if(response) 
        setError(response.data);
        setPassword('');
        setConfirm('');
        setTimeout(()=> { navigate("/login"); }, 2000);
    }
    catch(err) {
        setError(err);
        console.error(err);
    }
}
  return (
    <div className={styles.maindiv}>
        <Grid item xs={12} sm={8} md={4} component={Paper} className={styles.paperRoot}>
            <Paper className={styles.paper}>
            { error && <Alert severity='success' className={styles.alert}>{error}</Alert>}
                <InputBase type='password' className={styles.input} required  variant="outlined" value={newPassword} placeholder='New Password' name='newPassword' autoFocus
                    onChange={e => setPassword(e.target.value)}/>
                <InputBase type='password' className={styles.input} required  variant="outlined" value={confirmNewPassword} placeholder='Confirm Password' name='confirmNewPassword' autoFocus
                    onChange={e => setConfirm(e.target.value)}/>
                <Button fullWidth onClick={handleSubmit} variant="outlined">Submit</Button>
            </Paper>
        </Grid>
    </div>
  )
}

export default NewPassword;
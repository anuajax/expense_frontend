import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, makeStyles, Paper, TextField, Typography} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import { green } from '@material-ui/styles'
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: 'url(https://wallpaperaccess.com/full/2109.jpg)',
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        backgroundPosition: 'fixed'
    },
    paperRoot: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        boxShadow: '0 0 15px #9ecaed',
        position: 'relative'
    },
    paper: {
        margin: theme.spacing(5, 3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.grey
      },
    input: {
        color: 'white',
        fontFamily: 'Helvetica',
        fontSize: '1.2rem'
    },
    font:{
        fontSize: '1.5rem',
        margin: theme.spacing(2),
        textAlign: 'center',
        color: 'white'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
      },
    alert:{
        
        width: '270px'
      },
    img: {
        width: '150px',
        height: '150px',
    },
    textfield: {
        width: '270px'
    }
}))
const Forgotpassword = () => {
    const [email, setEmail] = useState();
    const [alert, showAlert] = useState(false);
    const [alertType, setAlertType] = useState("success")
    const [alertMsg, setAlert] = useState();

    const styles = useStyles();
    const handleSubmit = async (e) => {
     e.preventDefault();
    try {
    const response = await axios.post('https://expenses-8tag.onrender.com/forgot',  {email: email});
        if(response.status === 200){
            showAlert(true);
            setAlertType('success');
            setAlert(response.data);
            setEmail('');
        }
        console.log(response.data);
    }
    catch(err) {
        console.log(err);
        showAlert(true);
        setAlertType('error');
        setAlert(err.response.data.error);
    }
    }
  return (
      <Box className={styles.root} >
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={10} square className={styles.paperRoot}>
        <div className={styles.paper}>
          <img src={`/images/sceneries/password.gif`} className={styles.img}/>
         <Box><Typography className={styles.font}>Please enter your registered email</Typography></Box>
      {/* <form  className={styles.form}  onSubmit={handleSubmit}> */}
        <TextField autoFocus className={styles.textfield} variant="outlined"  inputProps={{ className : styles.input}} onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <Button className={styles.submit} type='submit' variant="contained" color="secondary" onClick={handleSubmit}>Submit</Button>
      {/* </form> */}
          {alert ? <Alert severity={`${alertType}`} className={styles.alert}>{alertMsg}</Alert> : <></>}
          </div>
          </Grid>
      </Box>
  );
}
export default Forgotpassword;

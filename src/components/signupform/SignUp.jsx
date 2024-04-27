import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import PhoneInputCountry from '../InputElements/PhoneInputCountry';
import UserContext from '../../context/userContext.js';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import axios from 'axios';
import './signup.css'
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx'
import { InputBase } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        ExpenseAudit
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)',
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundPosition: '100%'
  },
  paperRoot: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    boxShadow: '0 0 15px #9ecaed',
    position: 'relative',
  },
  paper: {
    margin: theme.spacing(5, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.grey
  },
  font: {
    fontSize: '1.5rem',
    margin: theme.spacing(2),
    textAlign: 'center',
    color: 'white'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  textfield: {
    width: '280px',
    border: "2px solid red",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#222',
    fontSize: '16px',
    fontFamily: 'Poppins,sans-serif',
  },
  input: {
    background: 'whitesmoke',//rgba(255,255,255,0.94)
    height: '50px',
    marginBottom: theme.spacing(2)
  },
  alert: {
    marginBottom: theme.spacing(3)
  }
}));

export default function SignUp({ setToken, setUser }) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  //const { setUserData } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { name, email, password, tel };
      const resp = await axios.post("register", user);
      if (resp) {
        const response = await axios.post("login", { email, password });
        if (response) {
          const { user, token } = response.data;
          localStorage.setItem("authToken", token);
          window.location.href = "/dashboard";
        }
      }
    }
    catch (err) {
      setError(err.response.data.error);
      console.error(err);
    }
  }

  return (
    <Box className={classes.root}>
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={1} square className={classes.paperRoot}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
          <Typography component="h1" variant="h5" style={{ color: 'whitesmoke', margin: '20px' }}>Sign up</Typography>
          {error && <Alert severity='error' className={classes.alert}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} className={classes.input}>
                <InputBase className={classes.textfield} autoComplete="name" name="Name" variant="outlined" required value={name}
                  id="Name" placeholder="Name" autoFocus onChange={(e) => setName(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={12} className={classes.input}>
                <InputBase className={classes.textfield} variant="outlined" required id="email" placeholder="Email Address" value={email}
                  name="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={12} className={classes.input}>
                <InputBase className={classes.textfield} variant="outlined" required name="password" placeholder="Password" type="password" value={password}
                  id="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
              </Grid>
              <Grid className='space' item xs={12}><PhoneInputCountry setTel={setTel} /></Grid>
            </Grid>
            <Grid container alignItems='center' justifyContent='space-around'>
              <Button type="submit" variant="contained" color="secondary" className={classes.submit}>Sign Up</Button>
              <Link href="/login" variant="body2" style={{ color: 'whitesmoke' }}>Already have an account? <span>Sign in</span></Link>
            </Grid>
          </form>

        </div>
      </Grid>
    </Box>
  );
}
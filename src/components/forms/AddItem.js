import { Container, makeStyles, Box, Paper, FormControl, Grid, Button, Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { useState, useEffect } from 'react'
import SideDrawer from '../NavBars/SideDrawer';
import SuccessButton from '../InputElements/SuccessButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import useTwoStates from '../../hooks/useTwoStates';
import axios from 'axios';

const useStyles = makeStyles((theme)=>({

    root: {
        display: 'flex',
        backgroundColor: 'black'
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      },
      container: {
        marginTop: theme.spacing(6),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(8, 10, 12, 0.8)',
        color: 'white'
      },
      fixedHeight: {
        height: 240,
      },
      textField: {
        
        marginRight: theme.spacing(2),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      form:{
        backgroundColor: '#2f4353',
        backgroundImage: 'linear-gradient(315deg, #2f4353 0%, #d2ccc4 74%)',
        padding: theme.spacing(2),
        borderRadius: '5px'
      },
      typography:
      {
        marginBottom: theme.spacing(2)
      }
}))



const AddItem = () => {
    const styles = useStyles();
    const [itemE,  setItemE] = useState('');
    const [amountE, setAmountE] = useState(0);
    const [dateE, setDateE] = useState('');
    const [itemI,  setItemI] = useState('');
    const [amountI, setAmountI] = useState(0);
    const [dateI, setDateI] = useState('');

    async function postRequest(formdata)
    {
      const response = await axios.post("http://localhost:5000/items/new", formdata);
      if(response) return response.data;
    }

    async function handleSubmitExpense(e) {
      e.preventDefault();
      const state = { name: itemE, amount: amountE, date: dateE, type: false };
      const resp = await postRequest(state);
      console.log(resp);
      alert(resp);
      //alert(`item: ${state.itemE} amount: ${state.amountE} date: ${state.dateE} type: ${state.type}`);
      setItemE('');
      setAmountE('');
      setDateE('');
    }

    async function handleSubmitIncome(e) {
      e.preventDefault();
      const state = { name: itemI, amount: amountI, date: dateI, type: true };
      const resp = await postRequest(state);
      console.log(resp);
      alert(resp);
      setItemI('');
      setAmountI('');
      setDateI('');
    }

    return (
        <div className={styles.root}>
            <SideDrawer text={`New Entry`}/>
            <main className={styles.content}>
                <div className={styles.appBarSpacer}>
                    <Container maxWidth="lg" className={styles.container}>
                    <Paper className={styles.paper}>
                      <Typography className={styles.typography} variant="h4" >Expense</Typography>
                              <form className={styles.form} onSubmit={handleSubmitExpense}>
                              <Grid container spacing={3}>
                                  <Grid item xs={12} md={5} lg={4}>                               
                                      <TextField onChange={(e)=>setItemE(e.target.value)} value={itemE} className={styles.textField} variant="outlined" 
                                      id="outlined-basic" label="Expense Item" required margin="normal" fullWidth/>
                                  </Grid>
                                  <Grid item xs={12} md={3} lg={3}> 
                                      <FormControl>
                                        <Box>
                                          <TextField onChange={(e)=>setAmountE(e.target.value)} value={amountE} className={styles.textField} type="number" variant="outlined" 
                                          id="amount" label="Amount(₹)" name="amount" required margin="normal" fullWidth/>
                                        </Box>
                                      </FormControl>
                                  </Grid>
                                  <Grid item xs={12} md={3} lg={3}> 
                                        <TextField onChange={(e)=>setDateE(e.target.value)} value={dateE} id="date" label="Date" type="date"
                                         className={styles.textField} InputLabelProps={{ shrink: true}}
                                         required margin="normal" fullWidth/>
                                  </Grid>
                                  <Grid item xs={12} md={4} lg={2}> 
                                      <Button type="submit" variant="contained" color="secondary" className={styles.submit}>Submit</Button>
                                  </Grid>
                              </Grid>
                              </form>
                     </Paper>
                    </Container>


                    <Container maxWidth="lg" className={styles.container}>
                    <Paper className={styles.paper}>
                    <Typography variant="h4" className={styles.typography}>Income</Typography>
                              <form className={styles.form} onSubmit={handleSubmitIncome}>
                              <Grid container spacing={3}>
                                  <Grid item xs={12} md={5} lg={4}>                               
                                      <TextField onChange={(e)=>setItemI(e.target.value)} value={itemI}  className={styles.textField} variant="outlined" 
                                      id="outlined-basic" label="Income Item" required margin="normal" fullWidth/>
                                  </Grid>
                                  <Grid item xs={12} md={3} lg={3}> 
                                          <TextField onChange={(e)=>setAmountI(e.target.value)} value={amountI} className={styles.textField} type="number" variant="outlined" 
                                          id="amount" label="Amount(₹)" name="amount" required margin="normal" fullWidth/>
                                       {/* <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                            <OutlinedInput id="outlined-adornment-amount" className={styles.textField}
                                                            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                                            labelWidth={60}/>
                                      </FormControl> */}
                                  </Grid>
                                  <Grid item xs={12} md={3} lg={3}> 
                                        <TextField onChange={(e)=>setDateI(e.target.value)} value={dateI} id="date" label="Date" type="date"
                                         className={styles.textField} InputLabelProps={{ shrink: true}}
                                         required margin="normal" fullWidth/>
                                  </Grid>
                                  <Grid item xs={12} md={4} lg={2}> 
                                      <SuccessButton/>
                                  </Grid>
                              </Grid>
                              </form>
                     </Paper>
                    </Container>


                </div>

            </main>
        </div>
    )
}


export default AddItem;




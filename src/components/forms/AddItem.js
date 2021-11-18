import { Container, makeStyles, Box, Paper, FormControl, Grid, Button, Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React from 'react'
import SideDrawer from '../NavBars/SideDrawer';
import SuccessButton from '../InputElements/SuccessButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

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
    return (
        <div className={styles.root}>
            <SideDrawer/>
            <main className={styles.content}>
                <div className={styles.appBarSpacer}>
                    <Container maxWidth="lg" className={styles.container}>
                    <Paper className={styles.paper}>
                      <Typography className={styles.typography} variant="h4" >Expense</Typography>
                              <form className={styles.form}>
                              <Grid container spacing={3}>
                                  <Grid item xs={12} md={5} lg={4}>                               
                                      <TextField className={styles.textField} variant="outlined" 
                                      id="outlined-basic" label="Expense Item" required margin="normal" fullWidth/>
                                  </Grid>
                                  <Grid item xs={12} md={3} lg={3}> 
                                      <FormControl>
                                        <Box>
                                          <TextField className={styles.textField} type="number" variant="outlined" 
                                          id="amount" label="Amount(₹)" name="amount" required margin="normal" fullWidth/>
                                        </Box>
                                      </FormControl>
                                  </Grid>
                                  <Grid item xs={12} md={3} lg={3}> 
                                        <TextField id="date" label="Date" type="date" defaultValue=""
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
                              <form className={styles.form}>
                              <Grid container spacing={3}>
                                  <Grid item xs={12} md={5} lg={4}>                               
                                      <TextField  className={styles.textField} variant="outlined" 
                                      id="outlined-basic" label="Income Item" required margin="normal" fullWidth/>
                                  </Grid>
                                  <Grid item xs={12} md={3} lg={3}> 
                                          <TextField className={styles.textField} type="number" variant="outlined" 
                                          id="amount" label="Amount(₹)" name="amount" required margin="normal" fullWidth/>
                                       {/* <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                            <OutlinedInput id="outlined-adornment-amount" className={styles.textField}
                                                            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                                            labelWidth={60}/>
                                      </FormControl> */}
                                  </Grid>
                                  <Grid item xs={12} md={3} lg={3}> 
                                        <TextField id="date" label="Date" type="date" defaultValue=""
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




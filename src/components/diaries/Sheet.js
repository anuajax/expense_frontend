import {  Container, makeStyles, Box, Grid, Paper } from '@material-ui/core';
import React from 'react'
import clsx from 'clsx';
import SideDrawer from '../NavBars/SideDrawer';
const useStyles = makeStyles((theme) => ({
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
}))

const Sheet = () => {
    const styles = useStyles();
    return (
        <div className={styles.root}>
            <SideDrawer/>
            <main className={styles.content}>
                <div className={styles.appBarSpacer}>
                    <Container maxWidth="lg" className={styles.container}>
                        <Grid container spacing={3}>
                            <Grid>
                                <Paper className={styles.paper}>


                                </Paper>
                            </Grid>
                            <Grid>
                                <Paper>

                                </Paper>
                            </Grid>
                        </Grid>
                        
                    </Container>
                </div>
            </main> 
        </div>
    )
}

export default Sheet;

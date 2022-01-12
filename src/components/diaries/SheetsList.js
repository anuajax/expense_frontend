import { makeStyles, Container, Box, Paper, Typography, Divider } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import SideDrawer from '../NavBars/SideDrawer';
import SheetIcon from './SheetIcon';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    root: {
        display: 'flex',
        backgroundColor: 'black'
    },
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
      divider: {
        color:'white',
        backgroundColor: theme.palette.grey[50],
        opacity: '0.3',
        marginTop: '2px',
        width: '200px'
    },
}))

const SheetList = ({props}) => {
    const styles = useStyles();
    const fixedHeightPaper = clsx(styles.paper, styles.fixedHeight);
    let arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let {year} = useParams();
    return (
        <div className={styles.root}>
            <SideDrawer text={`${year} data`}/>
            <main className={styles.content}>
                <div className={styles.appBarSpacer}>
                    <Container maxWidth="lg" className={styles.container}>
                      <Paper className={styles.paper}>
                          <Box m={2}>
                            <Typography variant="h5" align="center">
                                {year}
                            </Typography>
                            <Divider className={styles.divider}/>
                            </Box>
                            <Box display='flex' flexWrap='wrap' justifyContent='center'>
                                {arr.map(month => <Link key={month} to={`/${year}/in/${month}`} style={{textDecoration: 'none', color: 'whitesmoke'}}><SheetIcon month={month} year={year}/></Link>)}
                            </Box>
                       </Paper>
                    </Container>
                </div>

            </main>
        </div>
    )
}

export default SheetList;

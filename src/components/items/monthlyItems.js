import React, {} from 'react'
import ItemsTable from './ItemsTable';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography, Paper } from '@material-ui/core';
import SideDrawer from '../NavBars/SideDrawer';

const useStyles = makeStyles((theme)=>({
    roott: {
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
        width: '100%',
        marginBottom: theme.spacing(2),
        backgroundColor : '#000000',
        backgroundImage : 'linear-gradient(147deg, #000000 0%, #2E2E2E 74%)',
        color: 'white'
      },
      fixedHeight: {
        height: 240,
      },
      active: {
        color: "yellow",
      }   
}));


const MonthlyItems = ({userId}) => {
    const styles = useStyles();
    const {year, month} = useParams();
    const text = `${month}, ${year} data`
    const months = {
      'January' : 1,
      'February' : 2,
      'March': 3,
      'April': 4,
      'May' : 5, 
      'June': 6, 'July' : 7, 'August' : 8, 'September' : 9, 
      'October': 10, 'November' : 11, 'December': 12
    }
    return (
        <div className={styles.roott}>
        <SideDrawer text={text}/>
        <main className={styles.content}>
            <div className={styles.appBarSpacer}>
              <Paper className={styles.paper}>
                    <ItemsTable year={year} month={months[`${month}`]} userId={userId}/>
            </Paper>
            </div>
            </main>
        </div>
        
    )
}

export default MonthlyItems

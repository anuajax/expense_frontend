import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SideDrawer from '../NavBars/SideDrawer';
import ItemsTable from './ItemsTable';
import { Paper } from '@material-ui/core';
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










const ItemsTablePage = () => {
    const styles = useStyles();
    return (
        <div className={styles.roott}>
        <SideDrawer text={`All Items`}/>
        <main className={styles.content}>
            <div className={styles.appBarSpacer}>
              <Paper className={styles.paper}>
                <ItemsTable/>
              </Paper>
            </div>
            </main>
        </div>
    )
}

export default ItemsTablePage

import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
        backgroundColor: 'rgba(8, 10, 12, 0.8)',
        color: 'white'
      },
      fixedHeight: {
        height: 240,
      },
      active: {
        color: "yellow",
      }   
}));

const ItemsTablePage = ({userId, setText}) => {
    const styles = useStyles();
    useEffect(() => { setText('All Items') }, [])
    return (
        <Paper className={styles.paper}>
            <ItemsTable year={0} month={0} userId={userId}/>
        </Paper>
    )
}
export default ItemsTablePage

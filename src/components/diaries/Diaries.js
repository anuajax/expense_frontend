import { Container, makeStyles, Box, Paper, Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import SideDrawer from '../NavBars/SideDrawer';
import FolderIcon from './FolderIcon';
import { Link } from 'react-router-dom';
import CreateDiary from '../forms/CreateDiary';
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
}))

const Diaries = ({userId, setText}) => {
    const styles = useStyles();
    const fixedHeightPaper = clsx(styles.paper, styles.fixedHeight);
    const [diaries, setDiaries] = useState([]);
    const [updated, setUpdated] = useState(false);
    useEffect(() => {
      async function getDiaries()
      {
        setText('Diaries')
        const response = await axios.get(`http://localhost:5000/users/${userId}/diaries`);
        if(response){
          console.log(response.data);
        setDiaries(response.data);
        }
        else console.log('Error fetching diaries');
      }
      getDiaries();
    }, [updated])
    return (
        // <div className={styles.root}>
        //     <SideDrawer text={`Dairies`} userId={userId}/>
        //     <main className={styles.content}>
        //         <div className={styles.appBarSpacer}>
                    <Container maxWidth="lg" className={styles.container}>
                      <Paper className={styles.paper}>
                      <Box display='flex'  flexWrap='wrap'>
                        {
                          diaries.map(item => (<FolderIcon key={item._id} userId={userId} diaryId={item._id} updated={updated} setUpdated={setUpdated} year={item.year}/>))
                        }
                        <CreateDiary updated={updated} setUpdated={setUpdated} userId={userId}/>
                      </Box>
                       </Paper>
                    </Container>
        //         </div>
        //     </main>
        // </div>
    )
}

export default Diaries;

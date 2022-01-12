import { Container, makeStyles, Box, Paper} from '@material-ui/core';
import React from 'react'
import clsx from 'clsx';
import SideDrawer from '../NavBars/SideDrawer';
import FolderIcon from './FolderIcon';
import { Link } from 'react-router-dom';
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

const Diaries = () => {
    const styles = useStyles();
    const fixedHeightPaper = clsx(styles.paper, styles.fixedHeight);
    const arr = [2019, 2020, 2021, 2022, 2023, 2024];
    return (
        <div className={styles.root}>
            <SideDrawer text={`Dairies`}/>
            <main className={styles.content}>
                <div className={styles.appBarSpacer}>
                    <Container maxWidth="lg" className={styles.container}>
                      <Paper className={styles.paper}>
                      <Box display='flex'   flexWrap='wrap'>
                        {
                          arr.map(item => (<Link key={item} to = {`/${item}/in`}><FolderIcon  year={item}/></Link>))
                        }
                      </Box>
                       </Paper>
                    </Container>

                </div>

            </main>
        </div>
    )
}

export default Diaries;

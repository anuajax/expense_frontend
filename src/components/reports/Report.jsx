import { Container, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Alert } from '@material-ui/lab';
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

const Report = ({ setText }) => {
    useEffect(() => setText('Report'), [])
    return (
        <Container maxWidth="lg" className={styles.container}>
            <Paper className={styles.paper}>
                <Box display='flex' flexWrap='wrap'>
                    <Alert style={{ margin: '2em' }} severity='info'>Nothing Yet !!</Alert>
                </Box>
            </Paper>
        </Container>
    )
}

export default Report
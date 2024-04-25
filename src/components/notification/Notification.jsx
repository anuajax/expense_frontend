import { Container, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import io from 'socket.io-client';
import { List, ListItem, ListItemText, Box } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import axios from 'axios';
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

const socket = io('http://localhost:3000');

const Notification = ({ userId, setText }) => {

    const styles = useStyles();
    const fixedHeightPaper = clsx(styles.paper, styles.fixedHeight);
    const [notifications, setNotifications] = useState([]);
    const [altText, setAltText] = useState('No notifications yet !!');
    useEffect(() => {
        setText('Notifications');
        socket.emit('joinRoom', userId);
        socket.on('newNotification', (notification) => {
            setNotifications(prev => [...prev, notification]);
        });

        const getNotifications = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${userId}/notifications`);
                console.log(altText);
                if (response) {
                    setNotifications(response.data);
                }
            } catch (error) {
                setAltText(error.response.data.error);
            }
        }
        getNotifications();
        return () => socket.off('newNotification');
    }, []);

    return (
        <Container maxWidth="lg" className={styles.container}>
            <Paper className={styles.paper}>
                <Box display='flex' flexWrap='wrap'>
                    {notifications.length === 0 ? <Alert style={{ margin: '2em' }} severity='info'>{altText}</Alert> :
                        <List>
                            {notifications.map(n => <ListItem key={n._id}>{n.text}</ListItem>)}
                        </List>
                    }
                </Box>
            </Paper>
        </Container>

    )
}

export default Notification;

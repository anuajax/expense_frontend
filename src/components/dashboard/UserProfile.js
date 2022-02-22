import { Avatar, Box, Chip, Container, Divider, Grid, InputBase, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import './useprofile.css'
import clsx from 'clsx'
import EditIcon from '@material-ui/icons/Edit';
import  useToggle  from '../../hooks/useToggle';
import ProfileEdit from '../forms/ProfileEdit';
import Modal from '@material-ui/core/Modal';
import ChangePassword from '../forms/ChangePassword';
const useStyles = makeStyles((theme) => ({
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
        backgroundColor: 'rgba(8, 10, 12, 0.8)',
        color: 'white',
        alignItems: 'center'
      },
      img: {
          width: '150px',
          height: '150px',
          borderRadius: '50%'
      },
      flexgrid: {
        display:'flex',  justifyContent:'center', alignItems:'center'
      },
      h2 : {
        "&:hover": {
            editicon: {
                display: 'inline'
            }    
        },
      },
      password:{
          marginTop: '5px'
      }
 
}))

function UserProfile({user}) {
    const styles = useStyles();
    const fixedHeightPaper = clsx(styles.paper,styles.fixedHeight);
    function rand() { return Math.round(Math.random() * 20) - 10; }
    

    const [open, setModalOpen] = useState(false);
    const handleOpen = () => { setModalOpen(true); };
    const handleClose = () => { setModalOpen(false); };
    const handleClick = () => { handleOpen() };
  return (
    // <div className="main">
    //     <div className="left">
    //         <div className="overlay-content">
    //             <img src="" alt="" className="profile-img" />
    //             <h2>Anurag Srigyan</h2>
    //         </div>
    //         <div className='overlay'></div>
    //     </div>
    //     <div className="right">
    //         <ul className="list">
    //             <li className="list-item">Email</li>
    //             <li className="list-item">Phone Number</li>
    //             <li className="list-item">Name</li>
    //             <li className="list-item">Password</li>
    //             <li className="list-item">Security questio</li>
    //         </ul>
    //     </div>
    // </div>
 

    <Container maxWidth="lg"  className={styles.container}>
        <Grid container spacing={3} className={styles.flexgrid}>
            <Grid item xs={12} md={8} lg={8} >
                <Paper className={styles.paper}>
                <img className={styles.img} src='https://images.unsplash.com/photo-1644945428609-0e7f21cd2a3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'/>
                {/* {editing ? <ProfileEdit userId={user.id} item={user.name} updated={updated} editingDone={editingDone} toggleEditing={toggleEditing}/> : <h2 className='box'>{user.name} <span onClick={()=>toggleEditing()}><EditIcon/></span></h2>} */}
                <h2 className='box'>{user.name}</h2>
                <h2 className='box'>Email: {user.email}</h2>
                    <Divider />
                    <h2 className='box'>Telephone Number(M): +91-9694951144{user.tel}</h2>
                    <h2 className='box'>Password: <span style={{paddingTop: '5px'}}>******************</span> <span className='icon' onClick={handleClick}><EditIcon/></span></h2>
                    <Modal open={open} onClose={handleClose} >
                       <ChangePassword userId={user.id}/>
                    </Modal>
                </Paper>
            </Grid>
        </Grid>
        </Container>
  )
}

export default UserProfile;
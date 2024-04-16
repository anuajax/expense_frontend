import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
// import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { MainListItems, SecondaryListItems } from '../dashboard/SidebarListitems';
import Button from '@material-ui/core/Button';
import { FormControlLabel } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: 'transparent'
  },
  text:{
    color: theme.palette.grey[500]
  },
  fixedHeight: {
    height: 240,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
   
    backgroundColor: '#000000',
backgroundImage: 'linear-gradient(147deg, #000000 0%, #434343 74%)'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.grey[900],
    color: 'whitesmoke',
    backgroundImage: 'url(/images/sceneries/nathan-anderson-5xZMSUEcze0-unsplash.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
 
  whitecolor: {
      color:'white',
      backgroundColor: theme.palette.grey[50],
      opacity: '0.2'
  }

}));
const SideDrawer = ({text, userId}) => 
{
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
      if(userId){
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      }
    }
    const handleDrawerOpen = (value) => {
      setOpen(value);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start" 
              color="inherit"
              aria-label="open drawer"
              onClick={()=>handleDrawerOpen(true)}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {text}
            </Typography>
            <IconButton color='inherit'>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color='inherit'>
              <Button color="secondary" variant="contained" onClick={handleClick} size="small">Logout</Button>
            </IconButton>
          </Toolbar>
        </AppBar>
        
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}>
  
          <div className={classes.toolbarIcon} >
            <IconButton onClick={handleDrawerClose} color='inherit'>
              <ChevronLeftIcon color='inherit'/>
            </IconButton>
          </div>
          <Divider />
          <List><MainListItems/></List>
          <Divider className={classes.whitecolor}/>
          <List>{<SecondaryListItems/>}</List>
        </Drawer>
        </div>  );
}
export default SideDrawer;
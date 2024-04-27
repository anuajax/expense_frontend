import React, { useState, useEffect, Suspense } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Welcome from './Welcome';
import Highlights from './Highlights';
import Chart from './Chart';
import SideDrawer from '../NavBars/SideDrawer';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// import CssBaseline from '@material-ui/core/CssBaseline';
// import Drawer from '@material-ui/core/Drawer';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import { MainListItems, SecondaryListItems } from './SidebarListitems';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

function Copyright() {
  const style = useStyles();
  return (
    <Typography variant="body2" className={style.text}  align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        XpenseManagement
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: 'black',
  },
  text:{
    color: theme.palette.grey[500]
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
    color: 'whitesmoke'
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
    backgroundColor: 'rgba(8, 10, 12, 0.8)',
    color: 'white'
  },
  fixedHeight: {
    height: 240,
  },
  whitecolor: {
      color:'white',
      backgroundColor: theme.palette.grey[50],
      opacity: '0.2'
  },
  welcome: {
      backgroundImage:'url(/images/sceneries/photo-1615232934495-9ff34ba4f953.jpg)',
        backgroundSize: 'cover',
        backgroundPosition:'center'
  },
  highlights: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1526488807855-309186804587?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80)',
    backgroundSize: 'cover',
   backgroundPosition: 'center'
  },
  
  
}));


export default function Dashboard({name, userId, setText}) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [news, setNews] = useState([]);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  useEffect(() => {
    async function getData() {
      setText('Dashboard');
        const response = await axios.get(`https://expenses-8tag.onrender.com/users/${userId}/items`, {withCredentials: true});
        if(response) setData(response.data);
        else console.log('Error fetching data');
        const response_news  = await axios.get("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b511741219fe4f9284ff6bb5f9874e97", {withCredentials: false});
        setNews(response_news.data.articles);
    }
    getData();
  }, []);

  return (
        
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Welcome */}
            <Grid item xs={12} md={8} lg={8}>
              <Paper className={clsx( fixedHeightPaper, classes.welcome)}>
                <Welcome name={name}/>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={clsx(fixedHeightPaper, classes.highlights)}>
                <Highlights news={news}/>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
      
                <Chart data={data}/>
              
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
        );
}
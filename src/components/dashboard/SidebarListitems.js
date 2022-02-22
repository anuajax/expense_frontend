import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {  makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    icons: {
        color: 'white',   
    },
    listitem: {
      
      "&:active":{
        backgroundColor: theme.palette.info
      }
    }

}))

export const MainListItems = () => {
const classes = useStyles();
  return (<div>
   <ListItem button className={classes.listitem} component={Link} to={'/dashboard'}>
      <ListItemIcon>
        <DashboardIcon className={classes.icons}/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button className={classes.listitem} component={Link} to={'/diaries'}>
      <ListItemIcon>
        <ShoppingCartIcon className={classes.icons}/>
      </ListItemIcon>
      <ListItemText primary="Diaries" />
    </ListItem>

 
    <ListItem button className={classes.listitem}  component={Link} to={'/addnew'}>
      <ListItemIcon>
        <PeopleIcon className={classes.icons}/>
      </ListItemIcon>
      <ListItemText primary="Add New Item" />
    </ListItem>
  
 
    <ListItem button className={classes.listitem}  component={Link} to={'/all/items'}>
      <ListItemIcon>
        <BarChartIcon className={classes.icons}/>
      </ListItemIcon>
      <ListItemText primary="All Items" />
    </ListItem>
    
    <ListItem button className={classes.listitem} component={Link} to ={'/profile'}>
      <ListItemIcon>
        <LayersIcon className={classes.icons}/>
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem>
  </div>);
}

export const SecondaryListItems = () => {
    const classes = useStyles();
    return(
  <div>
    <ListSubheader inset className={classes.icons}>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon className={classes.icons}/>
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon className={classes.icons}/>
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon className={classes.icons}/>
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>)
}

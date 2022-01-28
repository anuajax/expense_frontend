import { makeStyles, Switch } from '@material-ui/core';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Diaries from './components/diaries/Diaries';
import FolderIcon from './components/diaries/FolderIcon';
import SignIn from './components/loginform/SignIn';
import SignUp from './components/signupform/SignUp';
 import SideDrawer from './components/NavBars/SideDrawer';
import SheetList from './components/diaries/SheetsList';
import { Routes, Route, BrowserRouter, useNavigate, Redirect } from 'react-router-dom';
import AddItem from './components/forms/AddItem';
import ItemsTable from './components/items/ItemsTable';
import MonthlyItems from './components/items/monthlyItems';
import ItemsTablePage from './components/items/itemsTablePage';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';


 const useStyles = makeStyles((theme)=> ({

  scrollbar: {
    overflowY: "auto",
    margin: 0,
    padding: 0,
    listStyle: "none",
    height: "100%",
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 1px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '0px solid slategrey'
    }
  },
  
}));
function App() {
 const styles = useStyles();



  return (
    <div className={styles.scrollbar}>

<Routes>        
        <Route path = "/login" element={<SignIn/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/diaries" element={<Diaries/>}/>
        <Route path="/addnew" element={<AddItem/>}/>
        <Route  path="/" element={<Dashboard/>}/>

        <Route path="/all/items" element={<ItemsTablePage/>}/>
        <Route exact path="/:year/in" element={<SheetList/>}/>
        <Route exact path="/:year/in/:month" element={<MonthlyItems/>}/>
</Routes>


    
      {/* <Dashboard/> */}
      {/* <Diaries/> */}
      {/* <SignIn/> */}
      {/* <SheetList/> */}
    </div>
  );
}

export default App;

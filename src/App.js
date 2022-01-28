import { makeStyles, Switch } from '@material-ui/core';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Diaries from './components/diaries/Diaries';
import FolderIcon from './components/diaries/FolderIcon';
import SignIn from './components/loginform/SignIn';
import SignUp from './components/signupform/SignUp';
 import SideDrawer from './components/NavBars/SideDrawer';
import SheetList from './components/diaries/SheetsList';
import { Routes, Route, BrowserRouter, useNavigate, Navigate } from 'react-router-dom';
import AddItem from './components/forms/AddItem';
import ItemsTable from './components/items/ItemsTable';
import MonthlyItems from './components/items/monthlyItems';
import ItemsTablePage from './components/items/itemsTablePage';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';


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
const [user, setUser] = useState(null);

const handleToken = (token) => {
  const tokenData = jwt_decode(token);
  if(Date.now() < tokenData.exp)
  {
    localStorage.removeItem("authToken");
    setUser(null);
  }
  setUser(tokenData);
}

useEffect(()=>{
  const token = localStorage.getItem("authToken");
  token ? handleToken(token) : setUser(null); 
}, []);


return (
<div className={styles.scrollbar}>
<Routes>
  {!user && (<>
  <Route path = "/login" element={<SignIn/>}/>
  <Route path="/register" element={<SignUp/>}/>
  </>)}
        
  {user && (<>
  <Route path="/diaries" element={<Diaries userId={user.id}/>}/>
  <Route path="/addnew" element={<AddItem userId={user.id}/>}/>
  <Route path="/" element={<Dashboard name={user.name} userId={user.id}/>}/>
  <Route path="/all/items" element={<ItemsTablePage userId={user.id}/>}/>
  <Route exact path="/:year/in" element={<SheetList userId={user.id}/>}/>
  <Route exact path="/:year/in/:month" element={<MonthlyItems userId={user.id}/>}/>
  </>)}
  <Route path="*" element={<Navigate to={user ? "/" : "/login"}/>}/>

</Routes>
 </div>
  );
}

export default App;

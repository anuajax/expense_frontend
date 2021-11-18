import { makeStyles, Switch } from '@material-ui/core';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Diaries from './components/diaries/Diaries';
import FolderIcon from './components/diaries/FolderIcon';
import SignIn from './components/loginform/SignIn';
import SignUp from './components/signupform/SignUp';
 import SideDrawer from './components/NavBars/SideDrawer';
import SheetList from './components/diaries/SheetsList';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AddItem from './components/forms/AddItem';
import ItemsTable from './components/items/ItemsTable';
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
        <Route path = "/" element={<SignIn/>}/>
        <Route path="diaries" element={<Diaries/>}/>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="addnew" element={<AddItem/>}/>
        <Route path="signup" element={<SignUp/>}/>
        <Route path="/all/items" element={<ItemsTable/>}/>
        <Route exact path="/:year/in" element={<SheetList/>}/>
</Routes>
    
      {/* <Dashboard/> */}
      {/* <Diaries/> */}
      {/* <SignIn/> */}
      {/* <SheetList/> */}
    </div>
  );
}

export default App;

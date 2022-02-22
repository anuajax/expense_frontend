import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import MuiTableHead from "@material-ui/core/TableHead";
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import SideDrawer from '../NavBars/SideDrawer';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import { Box, Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import EditItemDialog from '../forms/EditItem';
import Item from './itemRow';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const useStyles = makeStyles((theme)=>({
  roott: {
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
      width: '100%',
      marginBottom: theme.spacing(2),
      backgroundColor : '#000000',
      backgroundImage : 'linear-gradient(147deg, #000000 0%, #2E2E2E 74%)',
      color: 'white'
    },
    fixedHeight: {
      height: 240,
    },
    active: {
      color: "yellow",
    },
    tablecontainer: {
      maxHeight: 440,
      marginTop: theme.spacing(10),
      maxWidth: 1080
    },
    fabStyle: {
      height: '20',
      width: '20'
    },
    tableheadrow: {
      "& .MuiTableCell-head": {
           color: "white",
           backgroundColor: '#000008'  
      }
    },
    tableexpensesrow: {
            backgroundColor: '#a71d31', //#f53844 #813867
      },
        tableincomerow: {
          backgroundColor: '#0d324d',
          // backgroundImage: 'linear-gradient(315deg, #637081 0%, #7c98b3 74%)'
        },
    totalrowI: {
      backgroundColor:'#d2d8d6',
      backgroundImage: 'linear-gradient(315deg, #d2d8d6 0%, #dce8e0 74%)',
      color: 'whitesmoke'
    },
    totalrowE: {
      backgroundColor:'#637081',
      backgroundImage: 'linear-gradient(315deg, #637081 0%, #7c98b3 74%)',
      color: 'whitesmoke'
    },
    fontsummary: {
      fontFamily: 'cursive', fontStyle: 'oblique', fontSize: '18px', fontWeight: '700'
    }
}));

function createData(name, amount, date, type, editing, id) {
  return { name, amount, date, type, editing, id };
}

const rows = [
  createData('fruits', 100.24, '12/11/2021', 1, false, 1),
  createData('sweets', 200.24, '13/11/2021', 0, false, 2),
  createData('fruits', 300.24, '12/12/2021', 1, false, 3),
  createData('cosmetics', 400.24, '12/10/2021', 1, false, 4),
  createData('meat', 500.2, '12/11/2020', 1, false, 5),
  createData('sex', 600.24, '15/01/2019', 0, false, 6),
  createData('electricity bill', 700.24, '26/11/2021', 0,false, 7),
  createData('fruits', 400, '13/11/2021', 1,false, 8),
  createData('fruits', 900.00, '12/09/2020', 1,false, 9),
  createData('dry fruits', 150.24, '12/11/2022', 0,false, 10),
  createData('puja samaan', 250.24, '12/11/2024', 1,false, 11),
  createData('fruits', 350.24, '12/11/2025', 1, false, 12),
  createData('flowers', 450.24, '12/11/2024', 0, false, 13),
  createData('fruits', 550.24, '12/11/2029', 0, false, 14),
];

const columns = [
  { id: 'name', label: 'Item', minWidth: 170 },
  { id: 'amount', label: 'Amount', minWidth: 170,  format: (value) => Number(value).toFixed(2) },
  { id: 'date', label: 'Date', minWidth: 170, align: 'right', format: (value) => value },
  { id: 'edit', label: 'Edit', minWidth: 140, align: 'right' },
];

function ItemsTable({year,month, userId})
{
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [order, setOrder] = useState(true); //asc==true desc=false
  const [sortBy, setsortBy] = useState('date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [updated, setUpdated] = useState(false);
  const history = useNavigate()
  useEffect(() => {
    async function getAllItems() {

       const response = await axios.get(`http://localhost:5000/users/${userId}/items`);
      if(response) {
        if(year === 0) setData(response.data);
        else
        {
          const diaryData = response.data.filter(item => {
            let d = item.date.split('/');
            return (d[2] === year && Number(d[1]) === month);
          });
          setData(diaryData);
        }
      }
      else console.log('Error fetching data');
    }
    getAllItems();
  }, [updated])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function compareDates(d1, d2){
    var parts =d1.split('/');
    var d1 = Number(parts[2] + parts[1] + parts[0]);
    parts = d2.split('/');
    var d2 = Number(parts[2] + parts[1] + parts[0]);
     if(d1 >= d2)
       return 1;
     else return -1;
    }
    function compareString(s1, s2)
    {
      if(s1.toLowerCase() >= s2.toLowerCase())
      return 1;
      else return -1;
    }
  function comparator(a,b,sortBy)
  {
    console.log(a[sortBy], b[sortBy])
    if(sortBy == 'date')
    {
      return compareDates(a[sortBy], b[sortBy]);
    }
    else if(sortBy === 'name')
    return compareString(a[sortBy], b[sortBy]);
    else{
    if(a[sortBy] > b[sortBy])
    return 1;
    else if(a[sortBy] < b[sortBy])
    return -1;
    }
    return 0;
  }
  const handleSort = (array, order, sortBy) => {
    setOrder(!order);
    setsortBy(sortBy);
    array.sort(order ? (a,b) => comparator(a,b,sortBy) : (a,b) => -comparator(a,b,sortBy));
    setData(array);
    console.log(data);
  }
  function subtotalExpense(items) {
    return items.filter(item => !item.type).map(({amount}) => Number(amount)).reduce((sum, i) => sum + i, 0);
  }
  function subtotalIncome(items) {
    return items.filter(item => item.type).map(({amount}) => Number(amount)).reduce((sum, i) => sum + i, 0);
  }
  const expenseSubtotal = subtotalExpense(data);
  const incomeSubtotal = subtotalIncome(data);

  // const editItem = (rowId, newName, newAmount, newDate) => {
  //     // const updatedRows = data.map(row => 
  //     // row._id === rowId ? {...row, name: newName, amount: newAmount, date: newDate} : row);
  //     // setData(updatedRows);
     
  // }
 function editingDone(value)
 {
   setUpdated(value);
 }
const printPDF = () => {

}
    return (
        // <div className={styles.roott}>
        //     <SideDrawer/>
        //     <main className={styles.content}>
        //         <div className={styles.appBarSpacer}>
                    // <Paper className={styles.paper}>
                      <>
                        <TableContainer className={styles.tablecontainer}>
                          <Table aria-label="sticky table">
                            <TableHead>
                              <TableRow className={styles.tableheadrow}>
                                <TableCell align="left" style={{ minWidth: columns[0].minWidth}} onClick={()=>handleSort(data, order, columns[0].id)}> 
                                  {columns[0].label}
                                </TableCell>
                                <TableCell align={columns[1].align} style={{ minWidth: columns[1].minWidth}} onClick={()=>handleSort(data, order, columns[1].id)}> 
                                  {columns[1].label}
                                </TableCell>
                                <TableCell align={columns[2].align} style={{ minWidth: columns[2].minWidth}} onClick={()=>handleSort(data, order, columns[2].id)}> 
                                  {columns[2].label}
                                </TableCell>
                                <TableCell align={columns[3].align} style={{ minWidth: columns[3].minWidth}}> 
                                  {columns[3].label}
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                              return ( 
                                <Item row={row} columns={columns} key={row._id} editingDone={editingDone} updated={updated} userId={userId}/>
                              );})}
                                
                                
                                
                                <TableRow className={styles.totalrowE}>
                                    {/* <TableCell rowSpan={3} /> */}
                                    <TableCell className={styles.fontsummary} align='left' component='blockquote'>Subtotal (Expenses):</TableCell>
                                    <TableCell className={styles.fontsummary}>₹ {expenseSubtotal.toFixed(2)}</TableCell>
                                </TableRow>
                                <TableRow className={styles.totalrowI}>
                                    {/* <TableCell rowSpan={3} /> */}
                                    <TableCell className={styles.fontsummary} align='left' component='blockquote'>Subtotal (Income):</TableCell>
                                    <TableCell className={styles.fontsummary}>₹ {incomeSubtotal.toFixed(2)}</TableCell>
                                </TableRow>
                            </TableBody>
                          </Table>
                      </TableContainer>
                      <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div"
                                        count={data.length} rowsPerPage={rowsPerPage}
                                        page={page} onPageChange={handleChangePage} 
                                        onRowsPerPageChange={handleChangeRowsPerPage} style={{color: 'white'}}/>
                    </>
                    
        //         </div>
        //     </main>
        // </div>
    )
  }
  export default ItemsTable;
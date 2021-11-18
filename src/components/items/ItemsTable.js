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
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/styles';
import { green, blue } from '@material-ui/core/colors';

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
       
      }));

function createData(name, amount, date, type) {
  return { name, amount, date, type };
}

const rows = [
  createData('fruits', 100.24, '12/11/2021', 1),
  createData('sweets', 200.24, '13/11/2021', 0),
  createData('fruits', 300.24, '12/12/2021', 1),
  createData('cosmetics', 400.24, '12/10/2021', 1),
  createData('meat', 500.2, '12/11/2020', 1),
  createData('sex', 600.24, '15/01/2019', 0),
  createData('electricity bill', 700.24, '26/11/2021', 0),
  createData('fruits', 800.24, '13/11/2021', 1),
  createData('fruits', 900.00, '12/09/2020', 1),
  createData('dry fruits', 150.24, '12/11/2022', 0),
  createData('puja samaan', 250.24, '12/11/2024', 1),
  createData('fruits', 350.24, '12/11/2025', 1),
  createData('flowers', 450.24, '12/11/2024', 0),
  createData('fruits', 550.24, '12/11/2029', 0),

];

const columns = [
  { id: 'name', label: 'Item', minWidth: 170 },
  { id: 'amount', label: 'Amount', minWidth: 170,  format: (value) => value.toFixed(2) },
  { id: 'date', label: 'Date', minWidth: 170, align: 'right', format: (value) => value.toLocaleString('en-IN') },
  { id: 'edit', label: 'Edit', minWidth: 170, align: 'right' },
];

function ItemsTable()
{
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [order, setOrder] = useState(true); //asc==true desc=false
  const [sortBy, setsortBy] = useState('date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setData(rows);
    return () => {
      return rows;
    }
  }, [])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function comparator(a,b,sortBy)
  {
    if(a[sortBy] > b[sortBy])
    return 1;
    else if(a[sortBy] < b[sortBy])
    return -1;

    return 0;
  }
  const handleSort = (array, order, sortBy) => {
    setOrder(!order);
    setsortBy(sortBy);
    // var arr = [];
    // arr = array;
    array.sort(order ? (a,b) => comparator(a,b,sortBy) : (a,b) => -comparator(a,b,sortBy));
    setData(array);
    console.log(data);
  }


    return (
        <div className={styles.roott}>
            <SideDrawer/>
            <main className={styles.content}>
                <div className={styles.appBarSpacer}>
                    <Paper className={styles.paper}>
                        <TableContainer className={styles.tablecontainer}>
                          <Table aria-label="sticky table">
                            <TableHead>
                              <TableRow className={styles.tableheadrow}>
                                {columns.map((column) => ( <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} onClick={()=>handleSort(rows, order, column.id)}>
                                                              {/* <TableSortLabel active={sortBy === column.id} direction={sortBy === column.id ? order : 'asc'}
                                                                              onClick={()=>handleSort(rows,order,)} classes={{root: styles.root, active: styles.active}}>
                                                              </TableSortLabel> */}
                                                              {column.label}
                                                          </TableCell> ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                              return (
                          
                               <TableRow hover role="checkbox" tabIndex={-1} key={index} className={row.type === 0 ? styles.tableexpensesrow : styles.tableincomerow}>
                                  {columns.map((column) => {
                                  const value = row[column.id];
                                  
                                  return (
                                    <TableCell key={column.id} align={column.align} style={{color: 'whitesmoke', fontSize: '14px'}}>
                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                    </TableCell> ); })}
                                </TableRow>
                              ); })}
                            </TableBody>
                          </Table>
                      </TableContainer>
                      <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div"
                                        count={data.length} rowsPerPage={rowsPerPage}
                                        page={page} onPageChange={handleChangePage} 
                                        onRowsPerPageChange={handleChangeRowsPerPage} style={{color: 'white'}}/>
                    </Paper>
                </div>
            </main>
        </div>
    )
  }
  export default ItemsTable;
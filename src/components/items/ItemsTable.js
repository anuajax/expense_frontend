import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Box, Menu, MenuItem, Divider } from "@material-ui/core";
import Item from "./itemRow";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LocalPrintshopTwoToneIcon from "@material-ui/icons/LocalPrintshopTwoTone";
import { PrintPDF } from "../../utils/createPDF";
import './spinner.css'

const useStyles = makeStyles((theme) => ({
  roott: {
    display: "flex",
    backgroundColor: "black",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    marginTop: theme.spacing(6),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: theme.spacing(2),
    backgroundColor: "#000000",
    backgroundImage: "linear-gradient(147deg, #000000 0%, #2E2E2E 74%)",
    color: "white",
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
    maxWidth: 1080,
      overflowY: "auto",
      '&::-webkit-scrollbar': {
        width: '0.5em'
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 1px rgba(0,0,0, 0.25)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.25)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(245, 245, 245, 0.4)',
        borderRadius: '10px',
        outline: '1px solid slategrey rounded'
      }
    
  },
  fabStyle: {
    height: "20",
    width: "20",
  },
  tableheadrow: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: "#000008",
    },
  },
  tableexpensesrow: {
    backgroundColor: "#a71d31", //#f53844 #813867
  },
  tableincomerow: {
    backgroundColor: "#0d324d",
    // backgroundImage: 'linear-gradient(315deg, #637081 0%, #7c98b3 74%)'
  },
  totalrowI: {
    backgroundColor: "#d2d8d6",
    backgroundImage: "linear-gradient(315deg, #d2d8d6 0%, #dce8e0 74%)",
    color: "whitesmoke",
  },
  totalrowE: {
    backgroundColor: "#637081",
    backgroundImage: "linear-gradient(315deg, #637081 0%, #7c98b3 74%)",
    color: "whitesmoke",
  },
  fontsummary: {
    fontFamily: "cursive",
    fontStyle: "oblique",
    fontSize: "18px",
    fontWeight: "700",
  },
}));

const columns = [
  { id: "name", label: "Item", minWidth: 170 },
  {
    id: "amount",
    label: "Amount",
    minWidth: 170,
    format: (value) => Number(value).toFixed(2),
  },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    align: "right",
    format: (value) => value,
  },
  { id: "edit", label: "Edit", minWidth: 140, align: "right" },
];

function ItemsTable({ year, month, userId }) {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [order, setOrder] = useState(true); //asc==true desc=false
  const [sortBy, setsortBy] = useState("date");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [updated, setUpdated] = useState(false);
  const [dataToPrint, setDataToPrint] = useState(null);
  const [print, setPrint] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAllItems() {
      setLoading(true);
      try{
        setError(null);
      const response = await axios.get(
        `https://expenses-8tag.onrender.com/users/${userId}/items`, {withCredentials: true}
      );
      if (response) {
        if (year === 0) setData(response.data);
        else {
          const diaryData = response.data.filter((item) => {
            let d = item.date.split("/");
            return d[2] === year && Number(d[1]) === month;
          });
          setData(diaryData);
        }
      } }
      catch(error){  if (error.response) {
        console.error('Error status:', error.response.status);
      } else {
        console.error('Unexpected error:', error);
      }
    }
    finally{
      setLoading(false);
    }
    }
    getAllItems();
  }, [updated]);

  useEffect(() => {
    if (dataToPrint !== null) PrintPDF(dataToPrint);
  }, [dataToPrint]);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function compareDates(d1, d2) {
    var parts = d1.split("/");
    var d1 = Number(parts[2] + parts[1] + parts[0]);
    parts = d2.split("/");
    var d2 = Number(parts[2] + parts[1] + parts[0]);
    if (d1 >= d2) return 1;
    else return -1;
  }
  const compareString = (s1, s2) =>
    s1.toLowerCase() >= s2.toLowerCase() ? 1 : -1;
  function comparator(a, b, sortBy) {
    console.log(a[sortBy], b[sortBy]);
    if (sortBy == "date") return compareDates(a[sortBy], b[sortBy]);
    else if (sortBy === "name") return compareString(a[sortBy], b[sortBy]);
    else {
      if (a[sortBy] > b[sortBy]) return 1;
      else if (a[sortBy] < b[sortBy]) return -1;
    }
    return 0;
  }
  const handleSort = (array, order, sortBy) => {
    setOrder(!order);
    setsortBy(sortBy);
    array.sort(
      order
        ? (a, b) => comparator(a, b, sortBy)
        : (a, b) => -comparator(a, b, sortBy)
    );
    setData(array);
    console.log(data);
  };
  const subtotalExpense = (items) =>
    items
      .filter((item) => !item.type)
      .map(({ amount }) => Number(amount))
      .reduce((sum, i) => sum + i, 0);
  const subtotalIncome = (items) =>
    items
      .filter((item) => item.type)
      .map(({ amount }) => Number(amount))
      .reduce((sum, i) => sum + i, 0);
  const expenseSubtotal = subtotalExpense(data);
  const incomeSubtotal = subtotalIncome(data);
  const editingDone = (value) => setUpdated(value);
  const handleClickPrintMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClosePrintMenu = () => setAnchorEl(null);
  const handlePagePrint = () =>
    setDataToPrint(
      data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  const handlePrint = () => setDataToPrint(data);
  if (loading) {
    return <Box className={styles.tablecontainer}><div className="loader"></div></Box>
  }
  if (error) {
    return <Box className={styles.tablecontainer}><div>Error: {error}</div></Box>;
  }
  return (
    <>
      <TableContainer className={styles.tablecontainer}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow className={styles.tableheadrow}>
              <TableCell
                align="left"
                style={{ minWidth: columns[0].minWidth }}
                onClick={() => handleSort(data, order, columns[0].id)}
              >
                {columns[0].label}
              </TableCell>
              <TableCell
                align={columns[1].align}
                style={{ minWidth: columns[1].minWidth }}
                onClick={() => handleSort(data, order, columns[1].id)}
              >
                {columns[1].label}
              </TableCell>
              <TableCell
                align={columns[2].align}
                style={{ minWidth: columns[2].minWidth }}
                onClick={() => handleSort(data, order, columns[2].id)}
              >
                {columns[2].label}
              </TableCell>
              <TableCell
                align={columns[3].align}
                style={{ minWidth: columns[3].minWidth }}
              >
                {columns[3].label}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <Item
                    row={row}
                    columns={columns}
                    key={row._id}
                    editingDone={editingDone}
                    updated={updated}
                    userId={userId}
                  />
                );
              })}

            <TableRow className={styles.totalrowE}>
              {/* <TableCell rowSpan={3} /> */}
              <TableCell
                className={styles.fontsummary}
                align="left"
                
              >
                <blockquote>
                Subtotal (Expenses):
                </blockquote>
              </TableCell>
              <TableCell className={styles.fontsummary}>
                ₹ {expenseSubtotal.toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow className={styles.totalrowI}>
              {/* <TableCell rowSpan={3} /> */}
              <TableCell
                className={styles.fontsummary}
                align="left"
                
              >
                <blockquote>
                Subtotal (Income):
                </blockquote>
              </TableCell>
              <TableCell className={styles.fontsummary}>
                ₹ {incomeSubtotal.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" alignItems="center">
        <span onClick={handleClickPrintMenu}>
          <LocalPrintshopTwoToneIcon style={{ marginRight: "10px" }} />
        </span>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClosePrintMenu}
        >
          <MenuItem onClick={handlePrint}>All</MenuItem>
          <Divider />
          <MenuItem onClick={handlePagePrint}>This Page</MenuItem>
        </Menu>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ color: "white" }}
        />
      </Box>
    </>
  );
}
export default ItemsTable;

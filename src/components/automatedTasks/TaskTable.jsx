import React, { useState, useEffect } from 'react';
import { Table, TableBody, Fab, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import TableRowItemWithDelete from './TableRowItem';
import axios from 'axios';
import RecurringItemModal from '../forms/RecurringItemModal';

const useStyles = makeStyles((theme) => ({
  glassTableContainer: {
    backdropFilter: 'blur(4px)',
    backgroundColor: 'rgba(255,255,255,0.5)',
    border: '1px solid rgba(255,255,255,0.3)',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    borderRadius: '10px',
    marginLeft: theme.spacing(6),
    maxHeight: '80%',
    marginTop: theme.spacing(6),
    maxWidth: 1080,
    font: 'white'
  },
  tableheadrow: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: '#000008'
    }
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(8),
    backgroundColor: 'rgba(8, 10, 12, 0.8)',
    color: 'white'
  },
  addRowButton: {
    visibility: 'hidden', // Start as hidden
  },
  addRow: {
    '&:hover button': {
      visibility: 'visible', // Show button on hover
    },
    '&:hover': {
      backgroundColor: '#f0f0f0', // Optional: change background color on hover
    },
  },
}));

const TaskTable = ({ userId, setText }) => {
  const styles = useStyles();
  const [rows, setRows] = useState([]);
  const [tableUpdated, setTableUpdated] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => { setText('Recurring Items') }, [])
  useEffect(() => {
    async function getAllItems() {
      const response = await axios.get(
        `/users/${userId}/items-recurring`
      );
      if (response) {
        setRows(response.data);
        console.log(rows);
      }
      else console.log("Error fetching data");

    }
    getAllItems();
  }, [tableUpdated]);
  // const testrows = [
  //   { _id: 1, name: 'Salary', amount: 52000, date: '31/03/2024', type: true },
  //   { _id: 2, name: 'Household', amount: 8000, date: '01/04/2024', type: false },
  // ];
  const columns = [
    { id: 'name', label: 'Item', minWidth: 170 },
    { id: 'amount', label: 'Amount', minWidth: 140, format: (value) => Number(value).toFixed(2) },
    { id: 'occurs', label: 'Occurs Every', minWidth: 170 },
    { id: 'date', label: 'Date', minWidth: 140, align: 'right', format: (value) => value },
    { id: 'edit', label: 'Edit', minWidth: 140, align: 'right' },
  ];
  // const TableRowItemWithDelete = withDelete(TableRowItem);
  const handleCloseModal = () => {
    setModalOpen(false);
    setTableUpdated(!tableUpdated);
  }

  return (
    <Paper className={styles.paper}>
      <Fab aria-label="add" onClick={() => setModalOpen(true)}>
        <AddIcon />
      </Fab>
      <RecurringItemModal userId={userId} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} tableUpdated={tableUpdated} setTableUpdated={setTableUpdated} />
      {rows.length === 0 ? <div style={{ 'padding': '10px' }} className={styles.glassTableContainer}>Nothing Here ! Try Adding a new Item.</div> :
        <TableContainer component={Paper} className={styles.glassTableContainer}>
          <Table aria-label="simple table" className={styles.table}>
            <TableHead>
              <TableRow className={styles.tableheadrow}>
                {columns.map(col => <TableCell key={col.id} align={col.align} style={{ minWidth: col.minWidth }}>{col.label}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRowItemWithDelete key={row._id} userId={userId} columns={columns} row={row} tableUpdated={tableUpdated} setTableUpdated={setTableUpdated} isModalOpen={isModalOpen} setModalOpen={setModalOpen} handleCloseModal={handleCloseModal} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>}
    </Paper>
  );
};

export default TaskTable;

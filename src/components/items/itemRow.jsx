import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteIcon from '@material-ui/icons/Delete';
import { Fab } from '@material-ui/core';
import useToggle from '../../hooks/useToggle';
import EditItemDialog from '../forms/EditItem';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  tableexpensesrow: {
    backgroundColor: '#a71d31', //#f53844 #813867
  },
  tableincomerow: {
    backgroundColor: '#0d324d',
    // backgroundImage: 'linear-gradient(315deg, #637081 0%, #7c98b3 74%)'
  },
  fabStyle: {
    height: '20',
    width: '20'
  },
  width: {
    width: '100%'
  }
}))


const Item = ({ columns, row, editingDone, updated, userId }) => {
  const styles = useStyles();
  const [isEditing, toggleIsEditing] = useToggle(false);

  async function handleDelete() {
    const response = await axios.delete(`/users/${userId}/items/${row._id}/delete`);
    if (response) {
      console.log(response.data);
      alert(response.data);
    }
    editingDone(!updated);
  }

  return (

    <>
      {isEditing ? <EditItemDialog name={row.name} amt={row.amount} dt={row.date} editingDone={editingDone} updated={updated} id={row._id} toggleIsEditing={toggleIsEditing} columns={columns} userId={userId} /> : <>

        <TableRow hover role="checkbox" tabIndex={-1} className={!row.type ? styles.tableexpensesrow : styles.tableincomerow}>
          <TableCell align={columns[0].align} style={{ minWidth: columns[0].minWidth, color: 'whitesmoke', fontSize: '14px' }}>
            {row.name}
          </TableCell>
          <TableCell align={columns[1].align} style={{ minWidth: columns[1].minWidth, color: 'whitesmoke', fontSize: '14px' }}>
            {columns[1].format(row.amount)}
          </TableCell>
          <TableCell align={columns[2].align} style={{ minWidth: columns[2].minWidth, color: 'whitesmoke', fontSize: '14px' }}>
            {columns[2].format(row.date)}
          </TableCell>
          <TableCell align={columns[3].align} style={{ minWidth: columns[3].minWidth, color: 'whitesmoke', fontSize: '14px' }}>
            <span style={{ marginRight: '5px' }}><Fab size="small" onClick={toggleIsEditing}><EditTwoToneIcon /></Fab></span>
            <span style={{ marginLeft: '5px' }}><Fab size="small" onClick={handleDelete}><DeleteIcon /></Fab></span>
          </TableCell>

        </TableRow></>
      }
    </>
  )
}
//()=> setEditing(true)
export default Item;

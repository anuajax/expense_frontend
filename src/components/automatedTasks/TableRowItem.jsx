import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteIcon from '@material-ui/icons/Delete';
import { Fab } from '@material-ui/core';
import useToggle from '../../hooks/useToggle';
import EditItemDialog from '../forms/EditItem';
import axios from 'axios';
import withDelete from './TableRowHOC';
import RecurringItemEdit from '../forms/RecurringItemEdit';

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


const TableRowItem = ({ userId, tableUpdated, setTableUpdated, columns, row, handleDelete }) => {
    const styles = useStyles();
    const { name, amount, date, type } = row.taskDetails;
    const [isEditing, setIsEditing] = useState(false);
    const handleCloseEdit = () => {
        setIsEditing(false);
        setTableUpdated(!tableUpdated);
    }
    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1} className={!type ? styles.tableexpensesrow : styles.tableincomerow}>
                <TableCell align={columns[0].align} style={{ minWidth: columns[0].minWidth, color: 'whitesmoke', fontSize: '14px' }}>
                    {name}
                </TableCell>
                <TableCell align={columns[1].align} style={{ minWidth: columns[1].minWidth, color: 'whitesmoke', fontSize: '14px' }}>
                    {columns[1].format(amount)}
                </TableCell>
                <TableCell align={columns[2].align} style={{ minWidth: columns[2].minWidth, color: 'whitesmoke', fontSize: '14px' }}>
                    {columns[2].format(date)}
                </TableCell>
                <TableCell align={columns[3].align} style={{ minWidth: columns[3].minWidth, color: 'whitesmoke', fontSize: '14px' }}>
                    <span style={{ marginRight: '5px' }}><Fab size="small" onClick={() => setIsEditing(true)}><EditTwoToneIcon /></Fab></span>
                    <span style={{ marginLeft: '5px' }}><Fab size="small" onClick={() => handleDelete(row._id)}><DeleteIcon /></Fab></span>
                </TableCell>
                <RecurringItemEdit row={row} userId={userId} tableUpdated={tableUpdated} setTableUpdated={setTableUpdated} handleCloseEdit={handleCloseEdit} isEditing={isEditing} />
            </TableRow>
        </>
    )
}
export default withDelete(TableRowItem);

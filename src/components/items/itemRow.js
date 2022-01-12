import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import { Fab} from '@material-ui/core';
import  useToggle  from '../../hooks/useToggle';
import EditItemDialog from '../forms/EditItem';

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


const Item = ({columns, row, editItem}) => {
    const styles = useStyles();
    const [isEditing, toggleIsEditing] = useToggle(false);
    return (
        
        <>
            {isEditing ? <EditItemDialog name={row.name} amt={row.amount} dt={row.date} editItem={editItem} id={row.id} toggleIsEditing={toggleIsEditing} columns={columns}/> : <>
      
            <TableRow hover role="checkbox" tabIndex={-1} className={row.type === 0 ? styles.tableexpensesrow : styles.tableincomerow}>
                
                                    <TableCell align={columns[0].align} style={{minWidth: columns[0].minWidth, color: 'whitesmoke', fontSize: '14px'}}>
                                      {row.name}
                                   </TableCell>
                                    <TableCell align={columns[1].align} style={{minWidth: columns[1].minWidth, color: 'whitesmoke', fontSize: '14px'}}>
                                      {columns[1].format(row.amount)}            
                                    </TableCell>
                                    <TableCell align={columns[2].align} style={{minWidth: columns[2].minWidth, color: 'whitesmoke', fontSize: '14px'}}>
                                      {columns[2].format(row.date)}
                                   </TableCell>
                                   <TableCell align={columns[3].align} style={{minWidth: columns[3].minWidth, color: 'whitesmoke', fontSize: '14px'}}>
                                      <span><Fab size="small" onClick={toggleIsEditing}><EditTwoToneIcon/></Fab></span>
                                   </TableCell>
                
                                </TableRow></>
            }
                                  </>
        
    )
}
//()=> setEditing(true)
export default Item;

import { Box, makeStyles, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react'
const useStyles = makeStyles((theme) => ({
    box:{
        width: '300px',
        height: '50px',
        // backgroundColor: '#5b6467',
        // backgoundImage: 'linear-gradient(315deg, #5b6467 0%, #8b939a 74%)',
        margin: '10px',
     
        backgroundColor: '#000000',
        backgroundImage: 'linear-gradient(147deg, #000000 0%, #2c3e50 24%)',
        "&:hover": {
        
            boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
        },
     
    },
    text:{
        fontStyle: 'italic',
        marginRight: theme.spacing(10)
    },
    bin:{
        marginRight: '10px',
        "&:hover":{
            color: 'red'
        },
        fontSize: '26px'
    }
   
}))
const SheetIcon = ({month}) => {
    const styles = useStyles();
    const [deletebutton, togglebutton] = useState(false);
   
    return (
        <Box onMouseOver={()=>togglebutton(!deletebutton)}  display='flex' className={styles.box} alignItems='center' justifyContent="flex-end">
            <Box display='flex'>
                <Typography variant='h6' className={styles.text} >{month}</Typography>
                <DeleteIcon className={styles.bin}/>
            </Box>     
        </Box>
    )
}

export default SheetIcon;

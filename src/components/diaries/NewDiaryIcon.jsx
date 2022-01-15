import { Box, Button, makeStyles, Typography} from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme)=> ({
    background: {
        // backgroundColor: '#7f5a83',
        // backgroundImage: 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)'
        backgroundColor: '#2f4353',
        // backgroundImage: 'linear-gradient(315deg, #2f4353 0%, #d2ccc4 74%)'
    },
    dimension: {
        width: '200px',
        height: '200px',
        position: 'relative',
        borderRadius: '5px',
        margin: '10px',
        paddingBottom: '5px'
    },
    img: {
        width: '100px',
        height: '100px',
    },
    font:{
        fontWeight: 600,
        color: 'whitesmoke',
        textShadow: '0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135',
        marginBottom: '10px'
    }

}))
const NewDiaryIcon = ({onClick}) => {
    const styles = useStyles();
    return (
        <Button role="button" className={clsx(styles.dimension, styles.background)} onClick={onClick}>
            <Box display='flex' flexDirection='column' justifyContent="center" alignItems="center">
               <img src="https://icons.iconarchive.com/icons/creative-freedom/shimmer/256/Folder-New-icon.png" className={styles.img}/>
            </Box>
        </Button>
    )
}

export default NewDiaryIcon;


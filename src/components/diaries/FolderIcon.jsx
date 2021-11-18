import { Box, makeStyles, Typography} from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
const useStyles = makeStyles((theme)=> ({
    background: {
        // backgroundColor: '#7f5a83',
        // backgroundImage: 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)'
        backgroundColor: '#2f4353',
        backgroundImage: 'linear-gradient(315deg, #2f4353 0%, #d2ccc4 74%)'
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
        width: '155px',
        height: '155px',
    },
    font:{
        fontWeight: 600,
        color: 'whitesmoke',
        textShadow: '0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135',
        marginBottom: '10px'
    }

}))
const FolderIcon = ({year}) => {
    const styles = useStyles();
    let clicksound1 = new Audio("/sounds/mixkit-select-click-1109.wav");
    let clicksound2 = new Audio("/sounds/mixkit-modern-technology-select-3124.wav");
    const play = () => clicksound2.play();
    return (
        <div className={clsx(styles.dimension, styles.background)} onClick={play}>
            <Box display='flex' flexDirection='column' justifyContent="center" alignItems="center">
               <img src={`/images/burn_folder_20373.png`} className={styles.img}/>
               <Typography variant='h4' className={styles.font}>{year}</Typography>
            </Box>
        </div>
    )
}

export default FolderIcon;


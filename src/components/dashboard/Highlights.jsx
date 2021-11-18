import { Box, makeStyles, Typography, Divider } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    dividercolor: {
        color:'white',
        backgroundColor: theme.palette.grey[50],
        opacity: '0.2',
        marginTop: '2px'
    },
}))
const Highlights = () => {
    const styles = useStyles();
    return (
        <Box className={styles.root}>
            <Typography variant="h5" align="center">
                HIGHLIGHTS
            </Typography>
            <Divider className={styles.dividercolor}/>
        </Box>
    )
}

export default Highlights;

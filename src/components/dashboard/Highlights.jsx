import { Box, makeStyles, Typography, Divider, List, ListItem } from '@material-ui/core';
import React from 'react';
import StarsIcon from '@material-ui/icons/Stars';
import clsx from 'clsx';
import NewsTicker from 'react-advanced-news-ticker';
const useStyles = makeStyles((theme) => ({
    dividercolor: {
        color:'white',
        backgroundColor: theme.palette.grey[50],
        opacity: '0.2',
        marginTop: '2px'
    },
    font: {
        fontFamily: 'cursive',
        paddingBottom: '10px',
        marginBottom: '25px',
     
    }
}));
const Directions = Object.freeze({ UP: 1, DOWN: 2 });
const Highlights = () => {
    const styles = useStyles();
    return (
        <Box className={styles.root}>
            <Typography variant="h5" align="center">
                HIGHLIGHTS
            </Typography>
            <Divider className={styles.dividercolor}/>
            
                <NewsTicker rowHeight={60} maxRows={2} speed = {600} direction = {Directions.UP} duration = {8000}
                            autoStart = {true} pauseOnHover = {false}>
                    <Box className={styles.font}>  Site URL: https://www.getwatercooler.com/ </Box>
                     <Box  className={styles.font}> Bullet points — Items—known as "bullet points"</Box>
                     <Box  className={styles.font}>  Bullet point is a typographical symbol or glyph used to introduce items in a list.</Box>
                    <Box  className={styles.font}>  Bullet point is a typographical symbol or glyph used to introduce items in a list.</Box> 
                </NewsTicker> 
            
        </Box>
    )
}


export default Highlights;

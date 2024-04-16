import { Box, makeStyles, Typography, Divider, List, ListItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import StarsIcon from '@material-ui/icons/Stars';
import clsx from 'clsx';
import NewsTicker from 'react-advanced-news-ticker';
import './highlights.css'
const useStyles = makeStyles((theme) => ({
    list: {
        overflowY: "auto",

        height: "100%",
        '&::-webkit-scrollbar': {
          width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 1px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '0px solid slategrey'
        }
      },
    dividercolor: {
        color:'white',
        backgroundColor: theme.palette.grey[50],
        opacity: '0.2',
        marginTop: '2px'
    },
    font: {
        fontFamily: 'cursive',
        marginBottom: '16px',
        color: 'whitesomke'
    },
    heading: {
        zIndex: '1000'
    },
    wrapper: {
        // marginTop: '500px',
        // overflowY: 'hidden',
        zIndex: '-1',
        maxHeight: '1000px',
        overflowY: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: '10px',
        marginTop: '10px',
        flexWrap: 'wrap'
    },
    anchor:{
        "&:hover": {
            color: 'yellow',
            animation: 'paused'
        },
        textDecoration: 'none',
        color: 'whitesmoke'
    }
}));
const Directions = Object.freeze({ UP: 1, DOWN: 2 });
const Highlights = ({news}) => {
    const styles = useStyles();
    return (
        <Box className={styles.list}>
            <Box className={styles.heading}>
            <Typography variant="h5" align="center">
                HIGHLIGHTS
            </Typography>
            <Divider className={styles.dividercolor}/>
            </Box>
            <Box className={styles.wrapper}>
             <ul className='ul'>
               {news.map((n, i)=> <li className={styles.font} key={i}><a className={styles.anchor}  href={n.url}>{n.title}</a></li>)}
             </ul>
        </Box>
            
        </Box>
    )
}


export default Highlights;
import React from 'react'
import {makeStyles, Typography, Box} from '@material-ui/core';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import DateTime from './DateTime';
const useStyles = makeStyles((theme) => ({
    list: {
        overflowY: "auto",
        margin: 0,
        padding: 0,
        listStyle: "none",
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
    time:{
        fontFamily: 'Roboto',
        fontSize: 30,
        fontWeight: 600,
    },
    margintop : {
        marginTop: '4em'
    },
    quote: {
        fontFamily: '',
        fontStyle: 'italic',
        fontWeight: 600,
        fontSize: '24px'
    }
}));



function Welcome({name}) {
    const styles = useStyles();
    return (
        <Box display="flex" flexWrap="wrap" className={styles.list}>
                <Box  display="flex" flexDirection="column" flexWrap="wrap" alignItems="center" justifyContent="center">
                    <Box>
                    <Typography variant="h6">
                        <FormatQuoteIcon/><span className={styles.quote}>Beware of little expenses, a small leak will sink a great ship.</span><FormatQuoteIcon/>
                    </Typography>
                    </Box>
                    <Box>
                    <Typography variant="caption">
                                — Benjamin Franklin 
                    </Typography>
                  </Box>
                    
                </Box>
                <Box className={styles.margintop}><DateTime name={name}/></Box>
                
        </Box>
        
    )
}

export default Welcome;

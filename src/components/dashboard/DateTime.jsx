import { Box,  Typography } from '@material-ui/core';
import React, { Component } from 'react';

/* makeStyles is a HOOK used with function components
   withStyles is a HOC used with classs Components*/
class DateTime extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            date: new Date()
        }
    }
    
    currentTime()
    {
        this.setState({date: new Date()})
    }
    componentDidMount()
    {
      
        setInterval(() => {  
            this.currentTime()
        }, 1000);
       
    }
    render()
    {
        
        let time = this.state.date.toLocaleTimeString();
        let date = new Date().toLocaleString("en-US",{ dateStyle: 'full'});
        //const time = datetime.toLocaleTimeString("en-US",{timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric' });
        let hour = this.state.date.getHours();
        let wish = 'Good Morning';
        if(hour>15)
        wish = 'Good Evening';
        if(hour>=12 && hour<=15)
        wish = 'Good Afternoon'
        return(
            <Box>
                
                <Typography variant="h4">
                    {time}
                </Typography>
                <Typography variant="h6">
                    {date}
                </Typography>
                <Typography variant="subtitle2">
                    {`${wish}, ${this.props.user}`}
                </Typography>
                </Box>
        )
    }
}
export default DateTime;

import { Avatar, Divider, IconButton, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React from 'react'

const SideBarPro = () => {
    return (
        <div>
            <div className="sidebar-header">
                <IconButton>
                    <ChevronLeft/>
                </IconButton>
                <Divider/>
            </div>
            <div className="sidebar-profile">
                <Avatar/>
                <Typography>Hello Anurag!</Typography>
                <Divider/>
            </div>
            <div className="sidebar-body">

            </div>
        </div>
    )
}

export default SideBarPro;


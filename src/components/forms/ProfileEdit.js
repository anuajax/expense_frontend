import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
const ProfileEdit = ({item, toggleEditing, editingDone, updated, userId}) => {
    const [value, setValue] = useState(item);

    const handleSubmit = async (e) => {
     e.preventDefault();
     const name = value;
    try {
    const response = await axios.post(`https://expenses-8tag.onrender.com/users/${userId}/profile/edit`,  {name});
    toggleEditing();
    editingDone(!updated);
    }
    catch(err) {
    console.log(err);
    }
}

  return (
    <div>
        <Typography autoFocus value={value} onChange={(e) => setValue(e.target.value)}/>
        <Button onClick={handleSubmit} variant="contained" color="primary" size="small" style={{margin: '10px'}} startIcon={<SaveIcon />}>Save</Button>
    </div>
  )
}

export default ProfileEdit;
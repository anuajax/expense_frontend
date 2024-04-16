import { TextField, Grid, Radio,makeStyles, FormControl,InputLabel, Select, Box, Button, ButtonGroup, Modal } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ToggleDays from '../InputElements/ToggleDays';
import ToggleMonth from '../InputElements/ToggleMonth';
import axios from 'axios';

const useStyles = makeStyles((theme)=> ({
    form: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              // backgroundColor: "white",
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: "20px",
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(5px)',
              // -webkit-backdrop-filter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: theme.spacing(1),
              display: "flex",
              overflow: "auto",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              [theme.breakpoints.down('sm')]: {
                width: '60%', // Responsive width on small devices
                padding: theme.spacing(1), // Smaller padding on small devices
                marginLeft: theme.spacing(2)
              },
              [theme.breakpoints.up('md')]: {
                width: '30%', // Fixed width on medium devices and up
                 
              },
             
            },
            formControl: {
                margin: theme.spacing(2),
                minWidth: 40,
              }
}));
const monthsEnum = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};
const RecurringItemEdit = ({userId, tableUpdated, setTableUpdated, isEditing, setIsEditing, row, handleCloseEdit}) => {
    
    console.log(row);
    const styles=useStyles();
    const {frequency, interval, dayOfWeek, dayOfMonth} = row.recurrence;
    const {name, amount, date, type, user} = row.taskDetails;
    const [state, setState] = useState({
        frequency,
        interval,
        month: '',
        day: dayOfMonth,
        item: name,
        amount,
        date
      });
      console.log(state);
      const [radio, setRadio] = useState(type);
      const [days, setDays] = useState(dayOfWeek);
      const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
        console.log(event.target.value)
      };
    const renderComponent=() => {
        if (state.frequency==='Week') 
            return <ToggleDays days={days} setDays={setDays}/>;
        else if(state.frequency==='Month')
            return <TextField type="number" name='day' value={state.day} onChange={handleChange} label='On Day'/>
        else if(state.frequency==='Year')
          return <ToggleMonth handleChange={handleChange} monthsEnum={monthsEnum} month={state.month} day={state.day}/>
      }
      
      const handleSubmit = async (e) => {
        try{
        e.preventDefault();
        const {frequency, interval, month, day, date, item, amount} = state;
        const itemDetails = {name: item, amount, date, type: radio, user: userId};
        const recurrence = {frequency, interval, dayOfWeek: days, dayOfMonth: day};
        const data = {startDate: date, recurrence, taskDetails:itemDetails, user:userId};
        const response = await axios.put(`http://localhost:5000/users/${userId}/items-recurring/${row._id}`, data);
        if(response)
            {
                handleCloseEdit();
                setTableUpdated(!tableUpdated);
            }
        }
        catch(error){
            console.log(error);
        }
      }
    
     
console.log(row)
  return (
    <Modal open={isEditing} onClose={handleCloseEdit}>
        <form onSubmit={handleSubmit}>
            <div className={styles.form}>
                <Box >
            <TextField
                  type='text'
                  onChange={handleChange}
                  value={state.item}
                  className={styles.textField}
                  variant="outlined"
                  id="outlined-basic"
                  label="Item"
                  name="item"
                  required
                  margin="normal"
                />
                <Radio
        checked={radio === false}
        onChange={()=>setRadio(false)}
        value={radio}
        name="radio-button-E"
        inputProps={{ 'aria-label': 'A' }}
      />
    <Radio
        checked={radio === true}
        onChange={()=>setRadio(true)}
        value={radio}
        name="radio-button-I"
        color="primary"
        inputProps={{ 'aria-label': 'A' }}
      />
      </Box>
            <TextField
                      onChange={handleChange}
                      value={state.amount}
                      className={styles.textField}
                      type="number"
                      variant="outlined"
                      id="amount"
                      label="Amount(₹)"
                      name="amount"
                      required
                      margin="normal"
                      />
                      <TextField
                  onChange={handleChange}
                  value={state.date}
                  id="date"
                  label="Start Date"
                  variant="outlined"
                  type="date"
                  name='date'
                  className={styles.textField}
                  InputLabelProps={{ shrink: true }}
                  required
                  margin="normal"
                />
            <Box>
            <TextField type="number" name='interval' value={state.interval} onChange={handleChange} label='Repeat Every' required/>
            <FormControl className={styles.formControl}>
        <Select
          native
          value={state.frequency}
          onChange={handleChange}
          inputProps={{
            name: 'frequency',
            id: 'filled-age-native-simple',
          }}
        >
          <option value={'Day'}>Day</option>
          <option value={'Week'}>Week</option>
          <option value={'Month'}>Month</option>
          <option value={'Year'}>Year</option>
        </Select>
      </FormControl>
      </Box>
      {renderComponent()}
      <Box m={3}>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button type="reset" color='primary' >Reset</Button>
        <Button type="submit" color='green'>Save</Button>
        <Button color='secondary' onClick={handleCloseEdit}>Cancel</Button>
</ButtonGroup>
      </Box>
      </div>
  </form>
  </Modal>    
  )
}

export default RecurringItemEdit;
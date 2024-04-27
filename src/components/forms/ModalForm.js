import { TextField, Grid, makeStyles, FormControl,InputLabel, Select, Box, Button, ButtonGroup } from '@material-ui/core';
import React, { useState } from 'react';
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

const ModalForm = (props) => {
    const styles=useStyles();
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
    const {item, amount, date, type, user, ...otherProps} = props;
    const [state, setState] = useState({
        frequency: 'Day',
        interval: null,
        date,
        month: '',
        day: '',
        days: [2],
        name: '',
        item,
        type,
        amount
      });
      const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
      };
      function renderComponent() {
        if (state.frequency==='Week') 
            return <ToggleDays/>;
        else if(state.frequency==='Month')
            return <TextField type="number" label='On Day'/>
        else if(state.frequency==='Year')
          return <ToggleMonth handleChange={handleChange} monthsEnum={monthsEnum} month={state.month} day={state.day}/>
      }
      console.log(props);
      const handleSubmitRecurring = async (e) => {
        try{
        e.preventDefault();
        const {frequency, interval, month, day, date,days, item, amount} = state;
        const itemDetails = {name: item, amount, date, type: type, user};
        const recurrence = {frequency, interval, dayOfWeek: days, dayOfMonth: day};
        const data = {startDate: date, recurrence, taskDetails:itemDetails, user};
        const response = await axios.post(`https://expenses-8tag.onrender.com/users/${user}/items-recurring`, data, {withCredentials: true});
        if(response)
            {
                props.handleCloseModal();
                props.setMessage(response);
                props.setOpen(true);
            }
        }
        catch(error){
            console.log(error);
        }
      }
  return (
   
        <form onSubmit={handleSubmitRecurring}>
            <div className={styles.form}>
            <TextField type="date" label="Start Date" name='date' value={state.date} nputLabelProps={{shrink: true}}/>
            <Box>
            <TextField type="number" label='Repeat Every' name='interval' value={state.interval} onChange={handleChange}/>
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
        <Button type="submit" color='green' >Save</Button>
        <Button color='secondary' onClick={props.closeModal}>Cancel</Button>
</ButtonGroup>
      </Box>
      </div>
  </form>
)
}
export default ModalForm;
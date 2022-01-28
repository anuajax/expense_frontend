import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    select: {
        color: 'wheat'
    }
  }));
const CustomSelect = () => {
    const classes = useStyles();
    const [state, setState] = React.useState('');
    const handleChange = (event) => {
        setState(event.target.value)
      };
    return (
        <div>
            <FormControl className={classes.formControl}>
        <InputLabel htmlFor="options-native-simple">select</InputLabel>
        <Select
          native
          value={state}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option >View</option>
          <option >Delete</option>
        </Select>
      </FormControl>
        </div>
    )
}

export default CustomSelect;

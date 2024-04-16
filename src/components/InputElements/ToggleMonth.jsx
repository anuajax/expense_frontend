import React from 'react'
import { FormControl, Select, TextField, makeStyles, withStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 60
    }
}))
const ToggleMonth = ({ monthsEnum, handleChange, month, day }) => {
    const styles = useStyles();
    return (
        <>
            <FormControl className={styles.formControl}>
                <Select
                    native
                    value={month}
                    onChange={handleChange}
                    inputProps={{
                        name: 'month',
                        id: 'filled-age-native-simple',
                    }}
                >
                    {Object.keys(monthsEnum).map(m =>
                        <option value={monthsEnum[m]}>{m}</option>
                    )}
                </Select>
            </FormControl>
            <TextField type='number' value={day} onChange={handleChange} label={'On Day'} />
        </>
    )
}

export default ToggleMonth
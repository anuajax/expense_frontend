import React from 'react';
import Button from '@material-ui/core/Button';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.status.success,
      margin:   theme.spacing(3, 0, 2),
      color: 'white'
    },

  }));
function CustomButton()
{
    const classes = useStyles();
    return ( <Button type='submit' variant="contained" classes={{root: classes.root}}>Submit</Button>);
}
const theme = createTheme({
  status: {
      success: green[500]
  }
});
export default function SuccessButton() {
  return (
    <ThemeProvider theme={theme}>
      <CustomButton />
    </ThemeProvider>
  );
}
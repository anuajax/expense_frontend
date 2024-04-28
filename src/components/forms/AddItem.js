import {
  Container,
  makeStyles,
  Box,
  Paper,
  FormControl,
  Grid,
  Button,
  Typography,
  Modal,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { useState, useEffect } from "react";
import SideDrawer from "../NavBars/SideDrawer";
import SuccessButton from "../InputElements/SuccessButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import useTwoStates from "../../hooks/useTwoStates";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import ModalForm from "./ModalForm";
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "black",
  },
  top: {
    marginTop: theme.spacing(1)
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(8, 10, 12, 0.8)",
    color: "white",
  },
  fixedHeight: {
    height: 240,
  },
  textField: {
    marginRight: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  form: {
    backgroundColor: "#2f4353",
    backgroundImage: "linear-gradient(315deg, #2f4353 0%, #d2ccc4 74%)",
    padding: theme.spacing(2),
    borderRadius: "5px",
  },
  typography: {
    marginBottom: theme.spacing(2),
  },
}));

const AddItem = ({ userId, setText }) => {
  const styles = useStyles();
  const [itemE, setItemE] = useState("");
  const [amountE, setAmountE] = useState(0);
  const [dateE, setDateE] = useState("");
  const [itemI, setItemI] = useState("");
  const [amountI, setAmountI] = useState(0);
  const [dateI, setDateI] = useState("");
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [switchChecked, setSwitchChecked] = useState({
    checkedE: false,
    checkedI: false,
  });

  const handleSwitchCheck = (event) => {
    setSwitchChecked({
      ...switchChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      // Use setTimeout to delay modal opening
      setTimeout(() => {
        setModalOpen(true);
      }, 800); // Delay of 500 milliseconds
    } else {
      setModalOpen(false);
    }
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSwitchChecked({ checkedE: false, checkedI: false });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
const checkFilledE = (itemE,amountE,dateE) => (itemE.trim() === '' || amountE === 0 || dateE.trim() === '');
const checkFilledI = (itemI,amountI,dateI) => !itemI.trim() && !amountI.trim() && !dateI.trim();

  useEffect(() => {
    setText("New Entry");
  }, []);

  async function postRequest(formdata) {
    const response = await axios.post(
      `https://expenses-8tag.onrender.com/users/${userId}/items/new`,
      formdata, {withCredentials: true}
    );
    if (response) return response.data;
  }

  async function handleSubmitExpense(e) {
    e.preventDefault();
    const state = { name: itemE, amount: amountE, date: dateE, type: false };
    const resp = await postRequest(state);
    console.log(resp);
    //alert(resp);

    setMessage(resp);
    setOpen(true);
    setItemE("");
    setAmountE("");
    setDateE("");
  }

  async function handleSubmitIncome(e) {
    e.preventDefault();
    const state = { name: itemI, amount: amountI, date: dateI, type: true };
    const resp = await postRequest(state);
    console.log(resp);
    //alert(resp);
    setMessage(resp);
    setOpen(true);
    setItemI("");
    setAmountI("");
    setDateI("");
  }
  

  return (
    <>
      <Container maxWidth="lg" className={styles.container} >
        <Paper className={clsx(styles.paper, styles.top)}>
          <Typography className={styles.typography} variant="h4">
            Expense
          </Typography>
          <form className={styles.form} onSubmit={handleSubmitExpense}>
            <Grid container spacing={3} >
              <Grid item xs={12} md={5} lg={4}>
                <TextField
                  onChange={(e) => setItemE(e.target.value)}
                  value={itemE}
                  className={styles.textField}
                  variant="outlined"
                  id="outlined-basic"
                  label="Expense Item"
                  required
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <FormControl>
                  <Box>
                    <TextField
                      onChange={(e) => setAmountE(e.target.value)}
                      value={amountE}
                      className={styles.textField}
                      type="number"
                      variant="outlined"
                      id="amount"
                      label="Amount(₹)"
                      name="amount"
                      required
                      margin="normal"
                      fullWidth
                    />
                  </Box>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <TextField
                  onChange={(e) => setDateE(e.target.value)}
                  value={dateE}
                  id="date"
                  label="Date"
                  type="date"
                  className={styles.textField}
                  InputLabelProps={{ shrink: true }}
                  required
                  margin="normal"
                  fullWidth
                />
                <FormControlLabel
                  control={
                    <Switch disabled
                      checked={switchChecked.checkedE}
                      onChange={handleSwitchCheck}
                      name="checkedE"
                      color="primary"
                    />
                  }
                  label="Make Recurring"
                />
                <Modal
                  open={modalOpen}
                  onClose={handleCloseModal}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <ModalForm modalOpen={modalOpen} closeModal={handleCloseModal} item={itemE} amount={amountE} date={dateE} type={false} user={userId} setMessage={setMessage} setOpen={setOpen}/>
                </Modal>
              </Grid>
              <Grid item xs={12} md={4} lg={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={styles.submit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity={severity} style={{ width: "250px" }}>
          {message}
        </Alert>
      </Snackbar>

      <Container maxWidth="lg" className={styles.container}>
        <Paper className={styles.paper}>
          <Typography variant="h4" className={styles.typography}>
            Income
          </Typography>
          <form className={styles.form} onSubmit={handleSubmitIncome}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5} lg={4}>
                <TextField
                  onChange={(e) => setItemI(e.target.value)}
                  value={itemI}
                  className={styles.textField}
                  variant="outlined"
                  id="outlined-basic"
                  label="Income Item"
                  required
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <TextField
                  onChange={(e) => setAmountI(e.target.value)}
                  value={amountI}
                  className={styles.textField}
                  type="number"
                  variant="outlined"
                  id="amount"
                  label="Amount(₹)"
                  name="amount"
                  required
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <TextField
                  onChange={(e) => setDateI(e.target.value)}
                  value={dateI}
                  id="date"
                  label="Date"
                  type="date"
                  className={styles.textField}
                  InputLabelProps={{ shrink: true }}
                  required
                  margin="normal"
                  fullWidth
                />
                 <FormControlLabel
                  control={
                    <Switch disabled
                      checked={switchChecked.checkedI}
                      onChange={handleSwitchCheck}
                      name="checkedI"
                      color="primary"
                    />
                  }
                  label="Make Recurring"
                />
                <Modal
                  open={modalOpen}
                  onClose={handleCloseModal}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <ModalForm modalOpen={modalOpen} closeModal={handleCloseModal}/>
                </Modal>
              
              </Grid>
              <Grid item xs={12} md={4} lg={2}>
                <SuccessButton />
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default AddItem;

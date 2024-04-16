import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import Slide from "@material-ui/core/Slide";
import axios from "axios";
import { Box, Paper, TableRow, TextField } from "@material-ui/core";
import useInputState from "../../hooks/useInputState";

const EditItemDialog = ({
  name,
  amt,
  dt,
  id,
  toggleIsEditing,
  editingDone,
  updated,
  columns,
  userId,
}) => {
  const [item, setItem] = useState(name);
  const [amount, setAmount] = useState(amt);
  const [date, setDate] = useState(dt);

  const updateItem = async (rowId, name, amount, date) => {
    const response = await axios.put(
      `http://localhost:5000/users/${userId}/items/${rowId}/edit`,
      { name, amount, date }
    );
    if (response) console.log(response.data);
  };
  function handleSubmit(e) {
    e.preventDefault();
    updateItem(id, item, amount, date);
    toggleIsEditing();
    editingDone(!updated);
  }

  return (
    <TableRow style={{ backgroundColor: "wheat" }}>
      <TableCell
        align={columns[0].align}
        style={{
          minWidth: columns[0].minWidth,
          color: "whitesmoke",
          fontSize: "14px",
        }}
      >
        <TextField
          autoFocus
          margin="dense"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          label="Item"
          type="outlined"
          id="item"
          fullWidth
        />
      </TableCell>
      <TableCell
        align={columns[1].align}
        style={{
          minWidth: columns[1].minWidth,
          color: "whitesmoke",
          fontSize: "14px",
        }}
      >
        <TextField
          autoFocus
          margin="dense"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          label="Amount"
          type="outlined"
          id="amount"
          fullWidth
        />
      </TableCell>
      <TableCell
        align={columns[2].align}
        style={{
          minWidth: columns[2].minWidth,
          color: "whitesmoke",
          fontSize: "14px",
        }}
      >
        <TextField
          autoFocus
          margin="dense"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          label="Date"
          type="outlined"
          id="date"
          fullWidth
        />
      </TableCell>
      <TableCell
        align={columns[3].align}
        style={{
          minWidth: columns[3].minWidth,
          color: "whitesmoke",
          fontSize: "14px",
        }}
      >
        <Button type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </TableCell>
    </TableRow>
  );
};
export default EditItemDialog;

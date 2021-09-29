import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Grid, TextField, makeStyles ,Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "95%",
      margin: theme.spacing(2),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  },
}));

export default function BookingTableForm({onClose, booking,onChange,onSubmit}) {
const classes = useStyles();
  return (
    <div>
      <form className={classes.root} onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              name="tableName"
              label="table"
              value={booking.tableName}
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              label="Name"
              value={booking.customerName}
              name="customerName"
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              label="Email"
              value={booking.email}
              name="email"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Phone number"
              name="phone"
              value={booking.phone}
              onChange={onChange}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                id="time-picker"
                label="Date"
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
                inputVariant="outlined"
                value={booking.date}
                onChange={(date) =>
                  onChange({ target: { name: "date", value: date } })
                }
                name="date"
              />
              <KeyboardTimePicker
                id="time-picker"
                label="Time"
                format="h:mm a"
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
                inputVariant="outlined"
                value={booking.time}
                onChange={(time) =>
                  onChange({ target: { name: "time", value: time } })
                }
                name="time"
              />
            </MuiPickersUtilsProvider>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "20px", marginLeft: "300px" }}
                type="submit"
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  Button,
} from "@material-ui/core";

import Publish from "@material-ui/icons/Publish";


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: theme.spacing(2),
    },
  },
}));

export default function TableForm({table,buttonTitle,onSubmit}) {
  const [options, setOptions] = useState([
    { id: 1, name: "test1", age: 1 },
    { id: 2, name: "test2", age: 2 },
    { id: 3, name: "test3", age: 3 },
    { id: 4, name: "test4", age: 4 },
  ]);
  const [values, setValues] = useState(table)
  const classes = useStyles();
  
  const handleInputChnage = (e) => {
    const {name, value } = e.target;
    setValues({ ...values, [name]: value });
  };



  return (
    <form className={classes.root} onSubmit={(e)=>onSubmit(e,values)} >
      <Grid container>
        <Grid item xs={6}>
          <div
            style={{ position: "relative", width: "200px", height: "200px" }}
          >
            <img
              style={{ marginLeft: "100px", borderRadius: "10px" }}
              width="200px"
              height="200px"
              src= {values.image? values.image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAADdCAMAAACc/C7aAAAAaVBMVEXDw8MAAADGxsaXl5fJycnMzMxSUlKRkZF1dXV5eXnCwsIFBQWlpaV+fn66urqurq5dXV1sbGxMTEyKiopXV1czMzOcnJwaGhqoqKiEhIQlJSUrKysODg5mZmZHR0ezs7M7OzsVFRU5OTmFwHepAAAC+klEQVR4nO3bi1KjMBSAYXIarIbea2uttVXf/yE36Q0qobrITHP0/2Z2Zt2xDP+GQEDMMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANQ56dCtY+JcZge9zgzsrXvipGc61EtzLO29KbpKLMx9mkPpI83H410XFiblyGFufy7Ph0lHPnSya/aByFuqRv7sSqchUvwV83k4EHFtt6QhcrwOl4GXZdv9VBApq3CdK/w1c9nykNUQ+XK6pG/abin5SFmWy5Z+u6FMP7K6unttt6cKIqflSE4a9tQd/zRtKflI6ZeRw6Y9deFS2ryl5COzUXkzMWoIcZm45bixUkGkfd6PormyyBMZPxkzaVouKIjM7PAwjtPm/XRP4Rse8/hgaoh0djzdbl9XeePJxc7CUBdmHi/REOkPx3Bb2DTlnOwP6L34vNQReZ3szqffRXRa/oJIcetzpJnksS2pj3T5pPrIqmfr6wL9kbZvynWf/8uuPi21Rzrxa4WijCzMW/0j6iKdV/lSZPH5Ges0V3+4flqi+uV77Ql07QmCtkg7GlcumM4uI0/ZC+UjGe67FpVl+qhWGGw/f0pRpIS99aeWjTtV2rdopBleTktNkZkMwvmzMHf20BCaY42FWV3MXFWR2eZY8ezvpY/N8aF8UhuZz84jtV+Iu/d4YfiGu+oHFUX6e43i1LDODs1FfCT9P8+lXN7piZRxNWOS23nTOB7syvsRPZHZ+qKhv2uckMfBLqelmsjLew1/anlpOlbLwT5vSUeks/2rQVG9U5eSyLC0+f+3JE53XToiRT6+OjhjPjRFunz6dVHM9DAtVURG7zW+ZbAfSw2R0mpCHvi1vFMRabctC/1/zdaKisjTTwnaRIYfhCmIdHbQunF/Rl5J8pEizfca37Pxkzr5yNnXHdfNJPGRHNrRvP9D81HqkbnNO5D2W5K//X1XFyK7kuyby3/iHXTp8rcJVmk2/onfCwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALi1f4DsKck70eEzAAAAAElFTkSuQmCC"}
            />
            <Publish
              style={{ position: "absolute", top: "100px", left: "320px" }}
              fontSize="large"
            />
          </div>
          <TextField variant="outlined" name="name" label="Name" value={values.name} onChange={handleInputChnage} />
          <TextField variant="outlined" name="width" label="Width" value={values.width} onChange={handleInputChnage} />
          <TextField variant="outlined" name="height" label="Height" value={values.height} onChange={handleInputChnage} />
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined">
            <InputLabel>Category</InputLabel>
            <MuiSelect
              name="category"
              label="Category"
              value={values.category}
              onChange={handleInputChnage}
            >
              <MenuItem value="">None</MenuItem>
              {options.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </MuiSelect>
          </FormControl>
          <TextField variant="outlined" name="chairs" label="Chairs" value={values.chairs} onChange={handleInputChnage} />
          <TextField
            id="outlined-textarea"
            label="Description"
            placeholder="Description"
            multiline
            variant="outlined"
            maxRows={8}
            minRows={8}
            value={values.description}
            name="description"
            onChange={handleInputChnage}
          />
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "20px", marginLeft: "20px" }}
              type="submit"
            >
              {buttonTitle}
            </Button>
            <Button variant="contained" color="secondary" type="reset">
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}

import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import {
    Grid,
    TextField,
    makeStyles,
    Button,

  } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    root: {
        "& .MuiFormControl-root": {
          width: "90%",
          margin: theme.spacing(2),
        },
      },
  }))

function Updatecategory({ category, openEditPopup }) {

    const classes = useStyles();

    const [values, setValues] = useState(category);

    const inputHandleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name] : value });
    };

    async function updateCategoryName(e) {
        e.preventDefault();

        axios.put(`/category/update-category-name/${values._id}`, values)
        .then((response) => {
           console.log('Updated Successfully');
           openEditPopup();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <form className={classes.root}>
      <Grid container>

        <Grid item xs={12}>
        <TextField variant="outlined" name="name" label="Name"
                 value={values.categoryName} onChange={inputHandleChange} name="categoryName" />
          
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "20px", marginLeft: "20px" }}
              onClick={updateCategoryName}
            >
              Update
            </Button>
            <Button variant="contained" color="secondary">
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
        </div>
    )
}

export default Updatecategory

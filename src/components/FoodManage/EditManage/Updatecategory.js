import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {
    Grid,
    TextField,
    makeStyles,
    Button,

  } from "@material-ui/core";
import SnackbarFeddback from '../../snackbarFeedback/SnackbarFeedback';


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

function Updatecategory({ category, openEditPopup, handleAlertUpdate }) {

    const classes = useStyles();

    const [values, setValues] = useState(category);

    const [addedSuccess, setaddedSuccess] = useState(false);

    const handleEditClose = () => {
      setaddedSuccess(false);
    };

    // useEffect(() => {
    //   console.log(category.foodItems);
    // }, []);

    const getOwnFoodCategory = () => {
      axios.get(`/category/own-category/${values._id}`)
        .then((response) => {
          console.log(response.data.foodItems);
        })
        .catch((error) => {
          console.log(error);
        })
    }

    useEffect(() => {
      getOwnFoodCategory();
    }, [])


    // const getFoodItems = () => {
    //   axios.get(`/food/get-food/${}`)

    // }

    const inputHandleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name] : value });
    };

    async function updateCategoryName(e) {
        e.preventDefault();

        axios.put(`/category/update-category-name/${values._id}`, values)
        .then((response) => {
           console.log('Updated Successfully');
          //  setAlertOpen(true);
          // console.log(response.data.data);
           openEditPopup();
           handleAlertUpdate();
          //  reloadForForms();
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
            <Button variant="contained" onClick={openEditPopup} color="secondary">
              Cancle
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>

    <SnackbarFeddback
      open={addedSuccess}
      message="Category successfully updated!"
      onClose={handleEditClose}
      />

        </div>
    )
}

export default Updatecategory

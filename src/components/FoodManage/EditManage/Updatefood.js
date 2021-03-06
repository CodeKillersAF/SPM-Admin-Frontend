import React, { useEffect } from 'react';
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

function Updatefood({ food, openEditPopup, id, handleAlertUpdate }) {

    const classes = useStyles();

    // console.log('Id came : ' + id.id);
    const [Cname, setCName] = useState('');

    const categoryNameSet = () => { 
        axios.get(`/category/get-category/${id.id}`)
          .then((response) => {
            // console.log(response.data.data);
            setCName(response.data.data.categoryName);
          })
    }

    useEffect(() => {
      categoryNameSet();
    }, []);

    const [values, setValues] = useState(food);

    async function updateFoodDetails(e) {
        e.preventDefault();

            await axios.put(`/food/update-food/${values._id}`, values)
            .then((response) => {
                console.log('Updated successfully');
                openEditPopup();
                // reloadForForms();
                handleAlertUpdate();
            })
            .catch((error) => {
                console.log(error);
                // alert(error);
            })
    }

    const inputHandleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      };
    

    return (

        <form className={classes.root}>
        <Grid container>
          <Grid item xs={6}>
            <div
              style={{ position: "relative", width: "200px", height: "200px" }}
            >
              <img
                style={{ marginLeft: "100px", borderRadius: "10px" }}
                width="200px"
                height="200px"
                src={values.url}
              />
            </div>
  
            <TextField variant="outlined" name="name" label="Name"
                   value={values.foodName} onChange={inputHandleChange} name="foodName" />
  
            <TextField variant="outlined" name="price" label="Price"
                   value={values.foodPrice} onChange={inputHandleChange} name="foodPrice" />
  
          </Grid>
          <Grid item xs={6}>
          <TextField variant="outlined" name="Category" label="Category"
                   value={Cname} onChange={inputHandleChange} name="category" disabled />
  
            <TextField
              id="outlined-textarea"
              label="About Food"
              placeholder="About Food"
              multiline
              variant="outlined"
              maxRows={8}
              minRows={8}
              value={values.foodDescription} 
              onChange={inputHandleChange}
              name="foodDescription"
            />
            
            <div
              style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "20px", marginLeft: "20px" }}
                onClick={updateFoodDetails}
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

    )
}

export default Updatefood

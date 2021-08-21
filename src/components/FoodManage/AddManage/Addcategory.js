import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import {
    Grid,
    TextField,
    makeStyles,
    FormControl,
    InputLabel,
    Select as MuiSelect,
    Button,
    MenuItem,
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

function Addcategory() {

    const history = useHistory();
    const classes = useStyles();

    const [category, setCategory] = useState('');

    const [food, setFood] = useState([]);


    const getAllData = async() => {
        const data = await axios.get("/food/all-food");
        console.log(data.data.data);

        setFood(data.data.data);
    }

    useEffect(() => {
        getAllData();
    }, []);

    let allFoodsArray = [];
    food.map((f, index) => {
        let allFoods = {
            value: f._id,
            label: f.foodName
        }

    allFoodsArray.push(allFoods);

     //   console.log(value);
        
    })

    const [foodArray, setFoodArray] = useState();

    const selectedFood = (e) => {
        setFoodArray(Array.isArray(e)?e.map(item => item.value) : []);
    }


    async function addCategoryClick (e) {
        e.preventDefault();

        let categoryDetails = {
            categoryName: category,
            foodItems: foodArray,
        }

     //   console.log(categoryDetails);

        await axios.post("/category/add-category", categoryDetails)
            .then((response) => {
                console.log(response.data);
                let path = '/view-c';
                history.push(path);

                console.log(categoryDetails);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (

    <div>
        {/* <div className="addFood-box">
            <h2>Add Category</h2>
            <div className="formDesign">
                <div className="food-box">
                    <input type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} 
                        required />
                    <label>Category Name</label>
                </div>

                 <Select
                    //options={this.state.options}
                    options={allFoodsArray}
                    onChange={selectedFood}
                    className="basic-multi-select"
                    isMulti
                />

            </div>
        </div> */}

        <form className={classes.root}>
      <Grid container>

        <Grid item xs={12}>
        <TextField variant="outlined" name="name" label="Name"
                value={category} onChange={(e) => setCategory(e.target.value)} />
          <FormControl variant="outlined">
          <Select
                //options={this.state.options}
                options={allFoodsArray}
                onChange={selectedFood}
                className="basic-multi-select"
                isMulti
            />
          </FormControl>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "20px", marginLeft: "20px" }}
              onClick={addCategoryClick}
            >
              Create
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

export default Addcategory

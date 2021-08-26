import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { storage } from '../../../firebase';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  
import './addfood.css';

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


function Addfood({ openPopupClick, handleAlertCreate }) {


    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const [foodname, setFoodname] = useState('');
    const [aboutfood, setAboutfood] = useState('');
    const [foodprice, setFoodprice] = useState('');
    const [foodcategory, setFoodcategory] = useState([]);

    // file states
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [fileUploaded, setfileUploaded] = useState(false);


    const getAllCategory = async() => {
        const data = await axios.get("/category/all-category")

        console.log(data.data.data);

        setFoodcategory(data.data.data);
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    const [categoryValue, setCategoryValue] = useState('');

    const selectedCategory = (e) => {
       setCategoryValue(e.target.value);
    //    console.log(e.target.value);
    }

    async function addFoodsToCategory(e) {
        e.preventDefault();

        if(fileUploaded) {
         let foodDetails = {
             foodName: foodname,
             foodDescription: aboutfood,
             foodPrice: foodprice,
             url: url,
             category: categoryValue,
         }

         console.log(foodDetails);

         await axios.post("/food/add-food", foodDetails)
            .then((response) => {
                console.log(response.data.data);
                setfileUploaded(false);

                const getId = response.data.data._id;

                // console.log(getId);

                let newFoods = {
                    foodItems: [getId],
                }

                axios.put(`/category/update-category/${categoryValue}`, newFoods)
                    .then((response) => {
                        console.log(response.data.data);
                        console.log('Updated Successfully');
                        openPopupClick();
                        // reloadForForms();
                        handleAlertCreate();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
                alert('please fill all fields');
            });
        }
        else {
            alert ('Please Upload image');
        }
    }

    function onFileSelect(e) {
        setFile(e.target.files[0]);
        uploadfile(e.target.files[0]);
    }

    async function uploadfile(image) {
        // e.preventDefault();
        setOpen(!open);

        if(!image.name.match(/\.(jpg|jpeg|png)$/)) {
            // console.log('Select valid image');
            alert('Selecte an valid image type');
            setOpen(false);
        }
        else {
            let bucketName = "foodImages";
            let uploadTask = storage.ref(`${bucketName}/${image.name}`).put(image);

            console.log("File Name : " + image.name);
       
            await uploadTask.on(
                "state_changed",
                (snapshot) => {
                    console.log(snapshot);
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    storage.ref("foodImages").child(image.name).getDownloadURL()
                        .then((firebaseURl) => {
                            setUrl(firebaseURl);
                            console.log(firebaseURl);
                            setfileUploaded(true);
                            setOpen(false);
                        });
                }
            )
        }
    }

    return (
        
        <div>
            <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" />
                    {" "}Uploading....
            </Backdrop>

    <form className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <div
            style={{ position: "relative", width: "200px", height: "200px" }}
          > 
            <img
              style={{ marginLeft: "100px", borderRadius: "10px" }}
              width="200px"
              height="180px"
              src={url}
            />
            {/* <Publish
              style={{ position: "absolute", top: "100px", left: "320px" }}
              fontSize="large"
              onClick={uploadfile}
            /> */}
          </div>
          <div className="fileInputBrowse">
            <input type="file" id="formFile" onChange={onFileSelect} />
          </div>

          <TextField variant="outlined" name="name" label="Name"
                value={foodname} onChange={(e) => setFoodname(e.target.value)} />

          <TextField variant="outlined" name="price" label="Price" 
                value={foodprice} onChange={(e) => setFoodprice(e.target.value)} />

        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined">
            <InputLabel>Category</InputLabel>
            <MuiSelect
              name="name"
              label="Category"
              value={categoryValue}
              onChange={selectedCategory}
            >
              <MenuItem value="">None</MenuItem>
              {foodcategory.map((category) => (
                <MenuItem key={category.id} value={category._id}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </MuiSelect>

          </FormControl>

          <TextField
            id="outlined-textarea"
            label="About Food"
            placeholder="About Food"
            multiline
            variant="outlined"
            maxRows={8}
            minRows={8}
            value={aboutfood} 
            onChange={(e) => setAboutfood(e.target.value)}
            name="description"
          />
          
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "20px", marginLeft: "20px" }}
              onClick={addFoodsToCategory}
            >
              Create
            </Button>
            <Button variant="contained" onClick={openPopupClick} color="secondary">
              Cancle
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>

      </div> 

    )
}

export default Addfood;

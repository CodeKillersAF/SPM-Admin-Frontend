import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { storage } from '../../../firebase';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    Grid,
    TextField,
    makeStyles,
    FormControl,
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

function Addcategory({ openPopupClick, handleAlertCreate }) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [fileUploaded, setfileUploaded] = useState(false);

    const [category, setCategory] = useState('');

    const [food, setFood] = useState([]);

    const getAllData = async() => {
        const data = await axios.get("/food/all-food");
        // console.log(data.data.data);

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

        if(fileUploaded) {
        let categoryDetails = {
            categoryName: category,
            url: url,
            foodItems: foodArray,
        }

     //   console.log(categoryDetails);

        await axios.post("/category/add-category", categoryDetails)
            .then((response) => {
                // console.log(response.data);
                openPopupClick();
                handleAlertCreate();

            })
            .catch((error) => {
                console.log(error.message);
            })

        }
        else{
          alert('Please Upload Image');
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
          let bucketName = "categoryImages";
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
                  storage.ref("categoryImages").child(image.name).getDownloadURL()
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

      <form className={classes.root} onSubmit={addCategoryClick}>
          <Grid container>

        <Grid item xs={12}>

            <div
                style={{ position: "relative", width: "200px", height: "200px" }}
              > 
                <img
                  style={{ marginLeft: "100px", borderRadius: "10px" }}
                  width="200px"
                  height="180px"
                  src={url}
                />
              </div>
              <div className="fileInputBrowseFood">
                <input type="file" id="formFile" onChange={onFileSelect} />
              </div>

        <TextField variant="outlined" name="name" label="Name" required="true"
                value={category} onChange={(e) => setCategory(e.target.value)} />
          <FormControl variant="outlined">
          <Select
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
              type="submit"
              // onClick={addCategoryClick}
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

export default Addcategory

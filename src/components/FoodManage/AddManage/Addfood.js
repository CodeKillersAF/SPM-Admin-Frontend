import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { storage } from '../../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }))

function Addfood() {

    const history = useHistory();
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

    let allCategoryArray = [];
    foodcategory.map((fc, index) => {
        let allCategory = {
            value: fc._id,
            label: fc.categoryName
        }

        allCategoryArray.push(allCategory);

    });

    const [categoryValue, setCategoryValue] = useState('');

    const selectedCategory = (e) => {
       setCategoryValue(e.value);
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
                let path = '/didula/view-food';
                history.push(path);

                const getId = response.data.data._id;

                console.log(getId);

                let newFoods = {
                    foodItems: [getId],
                }

                axios.put(`/category/update-category/${categoryValue}`, newFoods)
                    .then((response) => {
                        console.log(response.data.data);
                        console.log('Updated Successfully');
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            });
        }
        else {
            alert ('Please Upload image');
        }
    }

    function onFileSelect(e) {
        setFile(e.target.files[0]);
    }

    async function uploadfile(e) {
        e.preventDefault();
        setOpen(!open);

        if(!file.name.match(/\.(jpg|jpeg|png)$/)) {
            console.log('Select valid image');
            setOpen(false);
        }
        else {
            let bucketName = "foodImages";
            let uploadTask = storage.ref(`${bucketName}/${file.name}`).put(file);

            console.log("File Name : " + file.name);
       
            await uploadTask.on(
                "state_changed",
                (snapshot) => {
                    console.log(snapshot);
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    storage.ref("foodImages").child(file.name).getDownloadURL()
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

        <form className="container">
            <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Food Name</label>
            <input type="text"
                 value={foodname}
                 onChange={(e) => setFoodname(e.target.value)} 
                className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
            </div>

            <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">About Food</label>
            <input type="text"
                 value={aboutfood}
                 onChange={(e) => setAboutfood(e.target.value)} 
                className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
            </div>

            <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Food Price</label>
            <input type="number"
                 value={foodprice}
                 onChange={(e) => setFoodprice(e.target.value)} 
                className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
            </div>

            <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Category</label>
            <Select 
                 className="basic-single"
                options={allCategoryArray}
                onChange={selectedCategory}
                //  isMulti
                required
            />
            </div> 

            <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Upload food image</label>
            <input className="form-control" type="file" id="formFile" onChange={onFileSelect} /> 
            </div>

        <button onClick={uploadfile} className="btn btn-warning">Upload Image</button> <br /><br />

        <button onClick={addFoodsToCategory} className="btn btn-primary">Add Food</button>

      </form>




      </div> 

    )
}

export default Addfood;

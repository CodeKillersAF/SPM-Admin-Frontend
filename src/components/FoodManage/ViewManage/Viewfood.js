import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function Viewfood() {

    const history = useHistory();
    const [open, setOpen] = React.useState(false);

    const [reload, setReload] = useState(false);

    const [foods, setFoods] = useState([]);

    const [foodid, setFoodid] = useState('');

      //delete handle functions
  const handleClickOpen = (e,foodId) => {
    setFoodid(foodId);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }


    const getAllFoods = async() => {
        await axios.get("/food/all-food")
         .then((response) => {
          //   console.log(response.data.data);
             setFoods(response.data.data);
         })
         .catch((error) => {
             console.log(error);
         })
    }

    useEffect(() => {
        getAllFoods();
    }, [reload]);

    async function deleteFood() {

        setOpen(false);
        await axios.delete(`/food/delete-food/${foodid}`)
            .then((response) => {
                console.log('Deleted Successfully');
                setReload(!reload);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const updateFood = (id) => {
        let path = `didula/update-food/${id}`;
        history.push(path);
    }

    // const updateFoodCategory = (id) => {
    //     let path = `/didula/update-food-category/${id}`;
    //     history.push(path);
    // }


    return (
        <div>

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
    
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This will delete Food permanently..!
              </DialogContentText>
            </DialogContent>
    
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={deleteFood} color="primary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
    
    
    
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                    {/* <th scope="col">Update Category</th> */}
                    </tr>
                </thead>
            <tbody>
                {foods.map((af) => (
                    <tr key={af._id}>
                        <td><img src={af.url} alt="food-image" /></td>
                        <td>{af.foodName}</td>
                        <td>{af.foodDescription}</td>
                        <td>{af.foodPrice}</td>
                        <td><button onClick={() => updateFood(af._id)}>Update</button></td>
                        <td><button onClick={(e) => handleClickOpen(e, af._id)} >Delete</button></td>
                        {/* <td><button onClick={() => updateFoodCategory(af._id)}>Update Category</button></td> */}
                    </tr>
                ))}
            </tbody>
    </table>
            </div>
    )
}

export default Viewfood

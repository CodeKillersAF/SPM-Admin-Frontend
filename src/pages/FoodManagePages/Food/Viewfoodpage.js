import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewDetailsBody from "../../../components/viewDetailsBody/ViewDetailsBody";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Popup from '../../../components/popup/Popup';
import AddFood from '../../../components/FoodManage/AddManage/Addfood';


function Viewfoodpage() {
    const [foods, setFoods] = useState([]);

    const columns = [
      // { field: "_id", headerName: "ID", width: 160 },
      {
        field: "url",
        headerName: "Image",
        width: 150,
        editable: true,
        renderCell: (params) => {
          return (
            <img
              src={params.row.url}
              alt="image"
              style={{ width: "80px", height: "40px" }}
            />
          );
        },
      },
      {
        field: "foodName",
        headerName: "Food Name",
        width: 150,
        editable: true,
      },
      {
        field: "foodDescription",
        headerName: "Food Description",
        width: 150,
        editable: true,
      },
      {
        field: "foodPrice",
        headerName: "Food Price",
        width: 150,
        editable: true,
      },
      {
        field: "action",
        headerName: "Action",
        width: 200,
        editable: true,
        renderCell: (params) => {
          return (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                style={{ marginLeft: "20px", marginRight: "30px" }}
              >
                Edit
              </Button>
              <DeleteIcon
              onClick = {(e) => handleClickOpen(e, params.row._id)}
              color="secondary" />
            </>
          );
        },
      },
    ];

    const history = useHistory();
    const [open, setOpen] = React.useState(false);

    const [reload, setReload] = useState(false);

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
            //  console.log(response.data.data);
             setFoods(response.data.data);
         })
         .catch((error) => {
             console.log(error);
         })
    }

    useEffect(() => {
        getAllFoods();
    }, []);


    async function deleteFood() {

        setOpen(false);
        await axios.delete(`/food/delete-food/${foodid}`)
            .then((response) => {
                console.log('Deleted Successfully');
                console.log(foodid);
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

        <div className="viewTable">
        <ViewDetailsBody columns={columns} rows={foods} />
        <Popup openPopup={true} title="Add new table" form={<AddFood />} />
      </div>

      </div>
    );
}

export default Viewfoodpage

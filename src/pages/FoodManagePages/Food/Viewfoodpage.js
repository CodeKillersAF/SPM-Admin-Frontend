import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewDetailsBody from "../../../components/viewDetailsBody/ViewDetailsBody";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Popup from '../../../components/popup/Popup';
import AddFood from '../../../components/FoodManage/AddManage/Addfood';
import Updatefood from '../../../components/FoodManage/EditManage/Updatefood';
import { useParams } from 'react-router-dom';
import SnackbarFeddback from '../../../components/snackbarFeedback/SnackbarFeedback';


function Viewfoodpage() {

    const paramsId = useParams();

    const [addedSuccess, setaddedSuccess] = useState(false);

    const handleAlertCreate = () => {
      setaddedSuccess(true);
    }

    const handleEditClose = () => {
      setaddedSuccess(false);
    };

    const [foods, setFoods] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);

    const openPopupClick = () => {
      setOpenPopup(false);
    }

    const openEditPopup = () => {
      setOpenEditForm(false);
    }

    const onClickCreate = (e) => {
      setOpenPopup(true);
    };

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
                onClick={() => handleEditOpen(params.row)}
              >
                Edit
                
              </Button>
              <DeleteIcon
              onClick = {() => handleClickOpen(params.row._id)}
              // onClick={getOneCate}
              color="secondary" />
            </>
          );
        },
      },
    ];

    const [openEditForm, setOpenEditForm] = useState(false);
    const [foodSelected, setFoodSelected] = useState([]);
    // Edit function
    const handleEditOpen = (food) => {
        setOpenEditForm(true);
        setFoodSelected(food);
    }

    // const history = useHistory();
    const [open, setOpen] = React.useState(false);

    const [reload, setReload] = useState();

    const [IdFood, setIdFood] = useState('');

      //delete handle functions
  const handleClickOpen = (id) => {
    setOpen(true);
    setIdFood(id);
    console.log(id);
  }


  const handleClose = () => {
    setOpen(false);
  }


    const getAllFoods = async() => {
        // setReload(!reload);
        await axios.get(`/category/own-category/${paramsId.id}`)
         .then((response) => {
              // console.log(response.data.foodItems);
             setFoods(response.data.foodItems);
             setReload(response.data.foodItems);
            //  console.log(paramsId.id);
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
        // console.log(IdFood);
        await axios.delete(`/food/delete-food/${IdFood}`)
            .then((response) => {
                console.log('Deleted Successfully');
                // console.log(IdFood);
                alert('Deleted successfully');
            })
            .catch((error) => {
                console.log(error);
            })
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
        <ViewDetailsBody columns={columns} rows={foods}
          onClickCreate={onClickCreate}
        />

        <Popup
        openPopup={openPopup}
        title="Add new food"
        form={<AddFood title="Add Food" openPopupClick={openPopupClick}
        // reloadForForms={reloadForForms}
      handleAlertCreate={handleAlertCreate}
          />}
      />

      <Popup
        openPopup={openEditForm}
        title="Update food"
        form={<Updatefood food={foodSelected} title="Update Food"
          openEditPopup={openEditPopup}
          id={paramsId}
          handleAlertCreate={handleAlertCreate}
          // reloadForForms={reloadForForms}
         />}
      />

    <SnackbarFeddback
      open={addedSuccess}
      message="Food menu successfully updated!"
      onClose={handleEditClose}
      />
      </div>

      </div>
    );
}

export default Viewfoodpage

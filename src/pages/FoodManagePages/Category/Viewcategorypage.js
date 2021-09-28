import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewDetailsBody from "../../../components/viewDetailsBody/ViewDetailsBody";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Popup from '../../../components/popup/Popup';
import AddCategory from '../../../components/FoodManage/AddManage/Addcategory';
import Updatecategory from '../../../components/FoodManage/EditManage/Updatecategory';
import SnackbarFeddback from '../../../components/snackbarFeedback/SnackbarFeedback';


function Viewcategorypage() {

    const history = useHistory();

    const [addedSuccess, setaddedSuccess] = useState(false);

    const handleAlertUpdate = () => {
      setaddedSuccess(true);
    }

    const handleEditClose = () => {
      setaddedSuccess(false);
    };

    const [addedCreateSuccess, setaddedCreateSuccess] = useState(false);

    const handleAlertCreate = () => {
      setaddedCreateSuccess(true);
    }

    const handleCreateClose = () => {
      setaddedCreateSuccess(false);
    }

    const [openPopup, setOpenPopup] = useState(false);

    const [open, setOpen] = React.useState(false);

    const [categoryid, setCategoryid] = useState('');

    const [viewCategory, setViewCategory] = useState([]);

    //delete handle functions
    const handleClickOpen = (e,categoryId) => {
      setCategoryid(categoryId);
      setOpen(true);
    }

    const openPopupClick = () => {
        setOpenPopup(false);
      }

    const onClickCreate = (e) => {
        setOpenPopup(true);
      };

    const handleClose = () => {
      setOpen(false);
    }

    const getAllCategories = async () => {
      // setReload(!reload);
        try {
            const details = await axios.get("/category/all-category");
            // console.log(details.data.data);
            setViewCategory(details.data.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [viewCategory]);

    const deleteCategory = () => {
        try {
          setOpen(false);
            axios.delete(`/category/delete-category/${categoryid}`)
              .then((response) => {
                console.log('Deleted Successfully');
              })
              .catch((error) => {
                console.log(error);
              })

        } catch (error) {
            console.log(error);
        }
    }

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
          field: "categoryName",
          headerName: "Category Name",
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
                  onClick={() => handleEditCategorySelect(params.row)}
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
        {
          field: "Food-Items",
          headerName: "Food Items",
          width: 200,
          editable: true,
          renderCell: (params) => {
            return (
              <>
                <Button
                  variant="contained"
                  color="Light"
                  startIcon={<DoubleArrowIcon />}
                  style={{ marginLeft: "20px", marginRight: "30px" }}
                  onClick={() => passSelectCategoryId(params.row._id)}
                >
                  View Food
                </Button>
              </>
            );
          },
        },
      ];

    const passSelectCategoryId = (id) => {
      console.log(id);
      let path = `/foodCategory/view-food/${id}`;
      history.push(path);
    } 

    const [openEditForm, setOpenEditForm] = useState(false);
    const [categorySelected, setCategorySelected] = useState([]);

    const openEditPopup = () => {
      setOpenEditForm(false);
    }
    
    // update category name
    const handleEditCategorySelect = (category) => {
        setOpenEditForm(true);
        setCategorySelected(category);
        // console.log(category);
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
              This will delete Category permanently..!
            </DialogContentText>
          </DialogContent>
  
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteCategory} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
  
        <div className="viewTable">
        <ViewDetailsBody columns={columns} rows={viewCategory}
          onClickCreate={onClickCreate}
        />

        <Popup
        openPopup={openPopup}
        title="Add new Category"
        form={<AddCategory title="Add Food" 
            openPopupClick={openPopupClick}
            handleAlertCreate={handleAlertCreate}
        />}
      />
      <Popup
        openPopup={openEditForm}
        title="Update Category Name"
        form={<Updatecategory category={categorySelected} title="Update Food"
           openEditPopup={openEditPopup}
           handleAlertUpdate={handleAlertUpdate}
          />}
      />

    <SnackbarFeddback
      open={addedCreateSuccess}
      message="Category list successfully added!"
      onClose={handleCreateClose}
      />

    <SnackbarFeddback
      open={addedSuccess}
      message="Category list successfully updated!"
      onClose={handleEditClose}
      />
      </div>

      </div>
    )
}

export default Viewcategorypage

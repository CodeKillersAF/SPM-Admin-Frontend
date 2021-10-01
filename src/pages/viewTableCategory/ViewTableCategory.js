import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "../../components/popup/Popup";
import TableCategoryForm from "../../components/tableCategoryForm/TableCategoryForm";
import ViewDetailsBody from "../../components/viewDetailsBody/ViewDetailsBody";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DialogBoxConfirm from "../../components/dialogBoxConfirm/DialogBoxConfirm";
import SnackbarFeddback from "../../components/snackbarFeedback/SnackbarFeedback";

const initialState = {
  name: "",
  description: "",
  image: "",
};

export default function ViewTableCategory() {
  const [tableCategoryID, setTableCategoryID] = useState("");
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [tableCategory, setTableCategory] = useState(initialState);
  const [updatedCategory, setupdatedCategory] = useState({});
  const [newTable, setnewTable] = useState({});
  const [deletedCategory, setdeletedCategory] = useState({});
  const [editCategory, seteditCategory] = useState(initialState);
  const [addedSuccess, setaddedSuccess] = useState(false);
  const [editSuccess, seteditSuccess] = useState(false);
  const [deleteSuccess, setdeleteSuccess] = useState(false);

  const onUpdate = (e, values) => {
    e.preventDefault();
    axios
      .put("http://localhost:8000/api/tableCategory/" + values._id, values)
      .then((res) => {
        setEditFormOpen(false);
        setupdatedCategory(values);
        seteditSuccess(true);
      });
  };

  const onClickEdit = (tableCategory) => {
    setEditFormOpen(true);
    console.log(tableCategory);
    seteditCategory(tableCategory);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setaddedSuccess(false);
  };
  const handleEditClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    seteditSuccess(false);
  };
  const handleDeleteClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setdeleteSuccess(false);
  };
  const handleClickOpen = (tableCategoryID) => {
    setTableCategoryID(tableCategoryID);
    setOpen(true);
  };

  const onClickDelete = () => {
    console.log(tableCategoryID);
    axios
      .delete("http://localhost:8000/api/tableCategory/" + tableCategoryID)
      .then((res) => {
        console.log("deleted");
        setOpen(false);
        setdeletedCategory(tableCategoryID);
        setdeleteSuccess(true);
      });
  };

  const [tableCategories, setTableCategories] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  useEffect(() => {
    getAllTableCategory();
  }, [updatedCategory, newTable, deletedCategory]);
  const onClickCreate = () => {
    setOpenPopup(true);
  };

  const addTableCategory = (e, values) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/tableCategory/", values)
      .then((res) => {
        setOpenPopup(false);
        setnewTable(values);
        setaddedSuccess(true);
      });
  };

  const getAllTableCategory = async () => {
    axios.get("http://localhost:8000/api/tableCategory").then((res) => {
      console.log(res.data);
      setTableCategories(res.data);
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", minWidth: 150 },
    {
      field: "image",
      headerName: "Image",
      minWidth: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <img
            src={params.row.image}
            alt="image"
            style={{ width: "80px", height: "40px" }}
          />
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 200,
      editable: true,
    },

    {
      field: "action",
      headerName: "Action",
      minWidth: 300,
      resizeble: true,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              style={{ marginLeft: "20px", marginRight: "30px" }}
              onClick={() => onClickEdit(params.row)}
            >
              Edit
            </Button>
            <IconButton onClick={() => handleClickOpen(params.row._id)}>
              <DeleteIcon color="secondary" />
            </IconButton>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <ViewDetailsBody
        columns={columns}
        rows={tableCategories}
        onClickCreate={onClickCreate}
        button={true}
      />

      <DialogBoxConfirm
        open={open}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        onClickDelete={onClickDelete}
        message={"This will delete category permanently!"}
      />
      <Popup
        openPopup={openPopup}
        title="Add new table Category"
        form={
          <TableCategoryForm
            buttonTitle="Add"
            tableCategory={tableCategory}
            onSubmit={addTableCategory}
          />
        }
      />
     
        <Popup
          openPopup={editFormOpen}
          title="Add new category table"
          form={
            <TableCategoryForm
              tableCategory={editCategory}
              buttonTitle="Update"
              onSubmit={onUpdate}
              formClose={() => setEditFormOpen(false)}
            />
          }
        />
    
      <SnackbarFeddback
        open={addedSuccess}
        message="Category successfully added!"
        onClose={handleAddClose}
      />
      <SnackbarFeddback
        open={editSuccess}
        message="Category successfully updated!"
        onClose={handleEditClose}
      />
      <SnackbarFeddback
        open={deleteSuccess}
        message="Category successfully deleted!"
        onClose={handleDeleteClose}
      />
    </div>
  );
}

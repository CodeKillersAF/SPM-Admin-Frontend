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

const initialState ={
  name:"",
  description:"",
  image :"",
};

export default function ViewTableCategory() {

  const [tableCategoryID, setTableCategoryID] = useState("");
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [tableCategory, setTableCategory] = useState(initialState);


  const onUpdate = (e, values) => {
    e.preventDefault();
    axios
      .put("http://localhost:8000/api/tableCategory/" + values._id, values)
      .then((res) => {
        setEditFormOpen(false);
      });
  };

  const onClickEdit = (tableCategory) => {
    setEditFormOpen(true);
    console.log(tableCategory);
    setTableCategory(tableCategory);
  };

  const handleClose = () => {
    setOpen(false);
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
      });
  };



  const [tableCategories, setTableCategories] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  useEffect(() => {
    console.log("useEffect");
    getAllTableCategory();
  }, []);
  const onClickCreate = () => {
    setOpenPopup(true);
  };

  const addTableCategory = (e, values) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/tableCategory/", values)
      .then((res) => {
        setOpenPopup(false);
      });
  };

  const getAllTableCategory = async () => {
    axios.get("http://localhost:8000/api/tableCategory").then((res) => {
      console.log(res.data);
      setTableCategories(res.data);
    });
  };

  const columns = [
    { field: "_id", headerName: "ID",minWidth:300 },
    {
      field: "image",
      headerName: "Image",
      minWidth: 200,
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
      minWidth: 200,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth:400,
      editable: true,
    },

    {
      field: "action",
      headerName: "Action",
      minWidth:300,
      resizeble:true,
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
      />
      <DialogBoxConfirm
        open={open}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        onClickDelete={onClickDelete}
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
      {editFormOpen && (
        <Popup
          openPopup={true}
          title="Add new category table"
          form={
            <TableCategoryForm tableCategory={tableCategory} buttonTitle="Update" onSubmit={onUpdate} />
          }
        />
      )}
    </div>
  );
}

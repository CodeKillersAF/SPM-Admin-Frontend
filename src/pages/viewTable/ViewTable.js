import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "../../components/popup/Popup";
import TableForm from "../../components/tableForm/TableForm";
import ViewDetailsBody from "../../components/viewDetailsBody/ViewDetailsBody";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DialogBoxConfirm from "../../components/dialogBoxConfirm/DialogBoxConfirm";

const initialState = {
  name: "",
  description: "",
  image: "",
  width: null,
  height: null,
  chairs: null,
  category: "",
};

export default function ViewTable() {
  const [tables, setTables] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [tableID, setTableID] = useState("");
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [table, setTable] = useState(initialState);
  const [openPopup, setOpenPopup] = useState(false);
  const [tableCategories, setTableCategories] = useState([]);
  const [updatedTable, setupdatedTable] = useState({});
  const [newTable, setnewTable] = useState({});
  const [deletedTable, setdeletedTable] = useState({});

  const onClickCreate = (e) => {
    setOpenPopup(true);
  };

  const addTable = (e, values) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/table/createTable/", values)
      .then((res) => {
        setOpenPopup(false);
        setnewTable(values);
      });
  };

  const onUpdate = (e, values) => {
    e.preventDefault();
    axios
      .put("http://localhost:8000/api/table/updateTable/" + values._id, values)
      .then((res) => {
        setEditFormOpen(false);
        setupdatedTable(values);
      });
  };

  const onClickEdit = (table) => {
    setEditFormOpen(true);
    setTable(table);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (tableID) => {
    setTableID(tableID);
    setOpen(true);
  };

  const onClickDelete = () => {
    axios
      .delete("http://localhost:8000/api/table/removeTable/" + tableID)
      .then((res) => {
        console.log("deleted");
        setOpen(false);
        setdeletedTable(tableID);
      });
  };

  useEffect(() => {
    const getTableDetails = () => {
      axios.get("http://localhost:8000/api/table/allTable").then((res) => {
        setTables(res.data);
        console.log(res.data);
      });
    };
    const getAllTableCategory = async () => {
      axios.get("http://localhost:8000/api/tableCategory").then((res) => {
        setTableCategories(res.data);
      });
    };
    getTableDetails();
    getAllTableCategory();
  }, [updatedTable, newTable, deletedTable]);

  const columns = [
    { field: "_id", headerName: "ID", width: 160 },
    {
      field: "image",
      headerName: "Image",
      width: 150,
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
      width: 150,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      editable: true,
    },
    {
      field: "chairs",
      headerName: "Chairs",
      width: 130,
      editable: true,
    },
    {
      field: "height",
      headerName: "Height",
      width: 130,
      editable: true,
    },
    {
      field: "width",
      headerName: "Width",
      width: 130,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      editable: false,
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
    <div className="viewTable">
      <ViewDetailsBody
        columns={columns}
        rows={tables}
        onClickCreate={onClickCreate}
      />
      <Popup
        openPopup={openPopup}
        title="Add new table"
        form={
          <TableForm
            buttonTitle="Add"
            table={table}
            onSubmit={addTable}
            tableCategories={tableCategories}
          />
        }
      />
      <DialogBoxConfirm
        open={open}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        onClickDelete={onClickDelete}
      />
      {editFormOpen && (
        <Popup
          openPopup={true}
          title="Add new table"
          form={
            <TableForm
              table={table}
              tableCategories={tableCategories}
              buttonTitle="Update"
              onSubmit={onUpdate}
            />
          }
        />
      )}
    </div>
  );
}

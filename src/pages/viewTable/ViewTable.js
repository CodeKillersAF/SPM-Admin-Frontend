import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "../../components/popup/Popup";
import TableForm from "../../components/tableForm/TableForm";
import ViewDetailsBody from "../../components/viewDetailsBody/ViewDetailsBody";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";
import Button from "@material-ui/core/Button";

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
    width: 150,
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
    width: 160,
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
          <DeleteIcon color="secondary" />
        </>
      );
    },
  },
];

export default function ViewTable() {
  const [movies, setmovies] = useState([]);

  useEffect(() => {
    getTableDetails();
  }, []);

  const getTableDetails = () => {
    axios.get("http://localhost:8000/api/table/allTable").then((res) => {
      setmovies(res.data);
      console.log(movies);
    });
  };
  return (
    <div className="viewTable">
      <ViewDetailsBody columns={columns} rows={movies} />
      <Popup openPopup={true} title="Add new table" form={<TableForm />} />
    </div>
  );
}

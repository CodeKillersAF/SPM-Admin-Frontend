import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "../../components/popup/Popup";
import TableCategoryForm from "../../components/tableCategoryForm/TableCategoryForm";
import ViewDetailsBody from "../../components/viewDetailsBody/ViewDetailsBody";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";
import Button from "@material-ui/core/Button";

const columns = [
  { field: "_id", headerName: "ID", width: 90 },
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

export default function ViewTableCategory() {
  const [tableCatgories, setTableCategories] = useState([]);
  useEffect(() => {
    console.log("useEffect");
    getAllTableCategory();
  }, []);

  const getAllTableCategory = async () => {
    axios.get("http://localhost:8000/api/tableCategory").then((res) => {
      console.log(res.data);
      setTableCategories(res.data);
    });
  };
  return (
    <div>
      <ViewDetailsBody columns={columns} rows={tableCatgories} />
      <Popup
        openPopup={true}
        title="Add new table Category"
        form={<TableCategoryForm />}
      />
    </div>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import ViewDetailsBody from "../../components/viewDetailsBody/ViewDetailsBody";

const columns = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "image",
    headerName: "Image",
    width: 150,
    editable: true,
    renderCell: (params) => {
        return(
            <img src={params.row.image} alt="image" style={{width: "80px", height: "40px"}}/>
        )
    }
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
    width: 150,
    editable: true,
    renderCell: (params) => {
      return (
        <>
          <button
            onClick={() => {
              console.log(params.data);
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              console.log(params.data);
            }}
          >
            Edit
          </button>
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
    </div>
  );
}

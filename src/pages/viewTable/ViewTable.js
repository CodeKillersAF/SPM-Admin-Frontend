import axios from "axios";
import React, { useEffect, useState } from "react";
import ViewDetailsBody from "../../components/viewDetailsBody/ViewDetailsBody";

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
    width: 150,
    editable: true,
  },
  {
    field: "width",
    headerName: "Width",
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

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
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
    </div>
  );
}

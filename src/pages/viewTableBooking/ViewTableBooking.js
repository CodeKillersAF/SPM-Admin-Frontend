import React, { useEffect } from "react";
import { Edit, Delete } from "@material-ui/icons";
import { Button, IconButton } from "@material-ui/core";
import ViewDetailsBody from "../../components/viewDetailsBody/ViewDetailsBody";
import axios from "axios";

export default function ViewTableBooking() {
    const [tableBooking, setTableBooking] = React.useState([]);
  useEffect(() => {
      getAllTableBooking();
  }, []);
  const onClickCreate = () => {
      console.log("hello");
    };


  const getAllTableBooking = () => {
    try {
        
      axios
        .get("http://localhost:8000/api/tableBook/")
        .then((res) => {
            setTableBooking(res.data);
            console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickOpen = () => {
    console.log("Clicked");
  };

  const columns = [
    { field: "_id", headerName: "ID", minWidth: 300 },
    {
      field: "tableId",
      headerName: "Table ID",
      minWidth: 200,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      minWidth: 200,
    },
    {
      field: "orderedTime",
      headerName: "Booked Time",
      minWidth: 400,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 400,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      minWidth: 400,
      editable: true,
    },
    {
      field: "date",
      headerName: "date",
      minWidth: 400,
      editable: true,
    },
    {
      field: "time",
      headerName: "Time",
      minWidth: 400,
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
              //   onClick={() => onClickEdit(params.row)}
            >
              Edit
            </Button>
            {/* <IconButton onClick={() => handleClickOpen(params.row._id)}>
              <Delete color="secondary" />
            </IconButton> */}
          </>
        );
      },
    },
  ];
  return (
    <div>
      <ViewDetailsBody
      columns={columns}
      rows={tableBooking}
      onClickCreate={onClickCreate}
      />
    </div>
  );
}

import React, { useEffect ,useState } from "react";
import { Edit, Delete } from "@material-ui/icons";
import { Button, IconButton } from "@material-ui/core";
import ViewDetailsBody from "../../components/viewDetailsBody/ViewDetailsBody";
import axios from "axios";
import BookingTableForm from "../../components/bookingTableForm/BookingTableForm";
import Popup from "../../components/popup/Popup";
import DialogBoxConfirm from "../../components/dialogBoxConfirm/DialogBoxConfirm";

export default function ViewTableBooking() {
  const [booking, setBooking] = useState({
    tableId: "",
    tableName: "",
    date: new Date(),
    time: new Date().getHours() + ":" + new Date().getMinutes(),
    numberOfPeople: "",
    customerName: "",
    email: "",
    phone: "",
  });
  const [tableBooking, setTableBooking] = React.useState([]);
  useEffect(() => {
    getAllTableBooking();
    getAllTable();
  }, []);
  const onClickCreate = () => {
    console.log("hello");
  };

  const getAllTableBooking = () => {
    try {
      axios.get("http://localhost:8000/api/tableBook/").then((res) => {
        setTableBooking(res.data);
        
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [tables, setTables] = useState();
  const getAllTable = () => {
    try {
      axios.get("http://localhost:8000/api/table/allTable").then((res) => {
        setTables(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
 

  const [openPopup, setOpenPopup] = useState(false);

  const onClickEdit = (details) => {
    console.log(details);
    setBooking(details);
    setOpenPopup(true);
  };

  const updateTableBooking = (e) => {
    e.preventDefault();
    console.log(booking);
    axios
      .put(`http://localhost:8000/api/tableBook/${booking._id}`, booking)
      .then((res) => {
        getAllTableBooking();
        setOpenPopup(false);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onBookingChange = (e) => {
    setBooking({  ...booking, [e.target.name]: e.target.value });
  };

  const [tableBookingID, setTableBookingID] = useState("");
  const [ConfirmPopupOpen, setConfirmPopupOpen] = useState(false);

  const handleClickOpen = (bookingID) => {
    setTableBookingID(bookingID);
    setConfirmPopupOpen(true);
  };

  const onClickDelete = () => {
    axios
      .delete(`http://localhost:8000/api/tableBook/${tableBookingID}`)
      .then((res) => {
        console.log(res);
        getAllTableBooking();
        setConfirmPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const columns = [
    { field: "_id", headerName: "ID", minWidth: 150 },
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
      minWidth: 200,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      minWidth: 200,
      editable: true,
    },
    {
      field: "date",
      headerName: "date",
      minWidth: 200,
      editable: true,
    },
    {
      field: "time",
      headerName: "Time",
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
              <Delete color="secondary" />
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
        rows={tableBooking}
        onClickCreate={onClickCreate}
      />
      <Popup
        openPopup={openPopup}
        title="Edit Table Booking"
        form={
          <BookingTableForm
            buttonTitle="Update"
            booking={booking}
            onSubmit={updateTableBooking}
            onChange={onBookingChange}
            onClose={() => setOpenPopup(false)}
            tables={tables}
          
          />
        }
      />
      <DialogBoxConfirm
        open={ConfirmPopupOpen}
        handleClose={() => setConfirmPopupOpen(false)}
        handleClickOpen={handleClickOpen}
        onClickDelete={onClickDelete}
        message={"This will delete category permanently!"}
      />
    </div>
  );
}

import React , {useEffect , useState} from 'react';
import axios from 'axios';
// import Popup from "../../components/popup/Popup";
// import TableForm from "../../components/tableForm/TableForm";
import ViewDetailsBody from "../../components/viewDetailsBody/ViewDetailsBody";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import DialogBoxConfirm from "../../components/dialogBoxConfirm/DialogBoxConfirm";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import ViewOrder from '../../components/viewOrder/viewOrder';
import Popup from '../../components/popup/Popup';
import './orders.css'

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));



export default function Orders() {
  const pdfExportComponent = React.useRef(null);
    const classes = useStyles();
    const [displayTrigger, setDisplayTrigger] = useState(1);
    const [deliveryOrders, setDeliveryOrders] = useState([]);
    const [takeAwayOrders, setTakeAwayOrders] = useState([]);
    const [delivery, setDelivery] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([]);
    

  const [openPopup, setOpenPopup] = useState(false);  

  
  const exportPDFWithComponentDelivery = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  const openPopupClick = (e) => {
    e.preventDefault();
    setOpenPopup(false)
  }
  // const onClickCreate = (e) => {​​​​​ setOpenPopup(true); }​​​​​;

    const viewFullOrder = (e, order) => {
      e.preventDefault();
      setOpenPopup(true);
      setSelectedOrder(order)

    }

    const sendEmail = (payload) => {
      axios.post('/send-mail', payload)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    }

    const getOnlineDeliveryOrders = () => {
        axios.get('/delivery-order/get-all-orders')
        .then(response => {
            console.log('delivery', response.data.data);
            setDeliveryOrders(response.data.data);
        })
        .catch(error => {
            console.log(error)
        })
    }

    const getOnlineTakeAwayOrders = () => {
        axios.get('/takeaway-order/get-all-orders')
        .then(response => {
            console.log('take away', response.data.data);
            setTakeAwayOrders(response.data.data);
            setDelivery(response.data.data);
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    const displayTakeAway = () => {
        // setDisplayTrigger(0)
        setDelivery(takeAwayOrders)
        setDisplayTrigger(2);
        console.log(displayTrigger)
    }

    const displayDelivery = () => {
        // setDisplayTrigger(0);
        setDelivery(deliveryOrders);
        setDisplayTrigger(1);
        console.log(displayTrigger);
    }

    const completeOrders = (object) =>{
      console.log(object)

      var email_payload = {
        to: object.email,
        total_price: object.total_price
      }

      if (displayTrigger === 1){
        axios.put(`/delivery-order/set-as-completed/${object._id}`)
        .then(response => {
          console.log('delivery order', response.data.data);
          sendEmail(email_payload);
          alert('Delivery order is completed');
        })
        .catch(error => {
          console.log(error);
        });
      }

      else if (displayTrigger === 2){
        axios.put(`/takeaway-order/set-as-completed/${object._id}`)
        .then(response => {
          console.log('takeaway order', response.data.data);
          sendEmail(email_payload);
          alert('Takeaway order is completed');
        })
        .catch(error => {
          console.log(error);
        })
      }

      else {
        alert('Something went wrong');
      }
    }

    const deleteOrders = (id,is_completed) => {

      if (displayTrigger === 1 && is_completed === true){
        axios.delete(`http://localhost:8000/api/admin/delivery-order/delete-complete/${id}`)
        .then(response => {
          console.log(response.data.data)
          alert('Delivery order is deleted')
        })
        .catch(error => {
          console.log(error);
        });
      }
      else if (displayTrigger === 2 && is_completed === true){
        axios.delete(`http://localhost:8000/api/admin/takeaway-order/delete-complete/${id}`)
        .then(response => {
          console.log(response.data.data)
          alert('Takeaway order is deleted');
        })
        .catch(error => {
          console.log(error);
        });
        
      }
      else {
        alert('something went wrong');
      }
    }

    useEffect(() => {
        getOnlineDeliveryOrders();
        getOnlineTakeAwayOrders();
    }, [])

    const columns = [
        { field: "_id", headerName: "ID", width: 160 },
        // {
        //   field: "image",
        //   headerName: "Image",
        //   width: 150,
        //   editable: true,
        //   renderCell: (params) => {
        //     return (
        //       <img
        //         src={params.row.image}
        //         alt="image"
        //         style={{ width: "80px", height: "40px" }}
        //       />
        //     );
        //   },
        // },
        {
          field: "first_name",
          headerName: "First Name",
          width: 150,
          editable: true,
        },
        {
          field: "last_name",
          headerName: "Last Name",
          width: 150,
          editable: true,
        },
        {
          field: "email",
          headerName: "Email",
          width: 170,
          editable: true,
        },
        {
          field: "telephone",
          headerName: "Telephone",
          width: 170,
          editable: true,
        },
        {
          field: "is_completed",
          headerName: "Is Completed",
          width: 170,
          editable: true,
        },
        // {
        //   field: "view_order",
        //   headerName: "View Order",
        //   width: 200,
        //   editable: true,
        // },
        // {
        // field: "complete",
        // headerName: "Complete",
        // width: 200,
        // editable: true,
        // },
        {
          field: "action",
          headerName: "Action",
          width: 300,
          editable: false,
          renderCell: (params) => {
            return (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CheckCircleOutlineIcon />}
                  onClick = {() => completeOrders(params.row)}
                  style={{ marginLeft: "20px", marginRight: "30px" }}
               
                >
                  Complete
                </Button>
                <IconButton>
                  <DeleteIcon color="secondary" onClick={() => deleteOrders(params.row._id, params.row.is_completed)} />
                </IconButton>
                <IconButton>
                  <DeleteIcon color="secondary" onClick={(e) => viewFullOrder(e,params.row)} />
                </IconButton>
              </>
            );
          },
        },
      ];

    return (
        <div>
    <button className="generateRate" onClick={exportPDFWithComponentDelivery}> Generate Reports </button>
    <div className={classes.root}>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button onClick = {displayTakeAway}>Take Away Orders</Button>
        <Button onClick = {displayDelivery}>Delivery Orders</Button>
      </ButtonGroup>

    </div>
        <ViewDetailsBody
            columns={columns}
            rows={delivery}
            // onClickCreate={}
        />
     <PDFExport ref={pdfExportComponent} paperSize="A4">
            
            <div className="imgReport">
              {/* <img src={logo} alt="image" width="80px" height="80px" /> */}
            </div>
              <div className="reportTitle">Your Popularity Report</div>
              <div className="reportAddress">No.3, Baththaramulla Road,</div>
              <div className="reportAddress">Colombo</div> <br/>
              <table className="rateTable">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Price</th>
                  <th>quantity</th>
                  <th>items</th>
                </tr>
                {deliveryOrders.map((al) => (
                <tr>
                  {/* <td>{al._id}</td> */}
                  <td>{al.first_name}</td>
                  <td>{al.last_name}</td>
                  <td>{al.total_price}</td>
                  <td>{al.quantity.map((a) => (
                    <p>{a}</p>
                  ))}</td>
                  <td>{al.order_items_names.map((a) => (
                    <p>{a}</p>
                  ))}</td>
                </tr>
                ))}
                <h5 style={{display:"flex", alignItems:"center", justifyContent:"center"}}>Takeaway orders</h5>
              {takeAwayOrders.map((al) => (
                <tr>
                  {/* <td>{al._id}</td> */}
                  <td>{al.first_name}</td>
                  <td>{al.last_name}</td>
                  <td>{al.total_price}</td>
                  <td>{al.quantity.map((a) => (
                    <p>{a}</p>
                  ))}</td>
                  <td>{al.order_items_names.map((a) => (
                    <p>{a}</p>
                  ))}</td>
                </tr>
                ))}

              </table>
      </PDFExport>
    <Popup
      openPopup={openPopup}
      title="Order Details"
      form={<ViewOrder title="Add Food"
      openPopupClick={openPopupClick}
      order = {selectedOrder}
    />}
    />

    </div>

    )
}

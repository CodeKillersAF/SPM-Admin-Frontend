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
    const classes = useStyles();
    const [deliveryOrders, setDeliveryOrders] = useState([]);
    const [takeAwayOrders, setTakeAwayOrders] = useState([]);

    const [delivery, setDelivery] = useState([]);
    

    const getOnlineDeliveryOrders = () => {
        axios.get('http://localhost:8000/api/admin/delivery-order/get-all-orders')
        .then(response => {
            console.log('delivery', response.data.data);
            setDeliveryOrders(response.data.data);
        })
        .catch(error => {
            console.log(error)
        })
    }

    const getOnlineTakeAwayOrders = () => {
        axios.get('http://localhost:8000/api/admin/takeaway-order/get-all-orders')
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
        setDelivery(takeAwayOrders)
    }

    const displayDelivery = () => {
        setDelivery(deliveryOrders);
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
                  style={{ marginLeft: "20px", marginRight: "30px" }}
               
                >
                  Complete
                </Button>
                <IconButton>
                  <DeleteIcon color="secondary" />
                </IconButton>
              </>
            );
          },
        },
      ];

    return (
        <div>
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
        </div>
    )
}

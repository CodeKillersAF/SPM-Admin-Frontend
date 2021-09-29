import React, { useState } from "react";
// import "./tableForm.css";
import {
  Grid,
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  Button,
} from "@material-ui/core";
import { storage } from "../../firebase.js";
import { BorderAll } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: theme.spacing(2),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  },
}));

export default function TableForm({openPopupClick, order}) 
{
    
 const [orderValues, setOrderValues] = useState(order)
 const [itemQuantity, setItemQuantity] = useState([orderValues.quantity]);
 const classes = useStyles();
 const [open, setOpen] = React.useState(false);   
  return (
    <div>
      
        <form className={classes.root}>
        <Grid container>
            {/* <p>Order ID : {orderValues._id}</p><br/>
            <p>First Name : {orderValues.first_name}</p><br />
            <p>Last Name : {orderValues.last_name}</p><br/> 
            <p>Telephone : {orderValues.telephone}</p><br />
            <p>Address : {orderValues.address}</p><br />
            <p>Total Price : {orderValues.total_price}</p><br /> */}
            <Grid item xs={6} >
            {itemQuantity.map((q) => ( 
                <p>{q}</p> 
              ))}
            </Grid>

            <Grid item xs={6}>
            {orderValues.items.map((q) => ( 
                  <p>{q}</p>
              ))}
            </Grid>
              <button onClick={openPopupClick}>close</button>
              </Grid>
            
        </form>
     
    </div>
  );
}

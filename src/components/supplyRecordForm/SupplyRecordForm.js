import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { storage } from '../../firebase';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, TextField, makeStyles, FormControl, InputLabel, Select as MuiSelect, Button, MenuItem } from "@material-ui/core";
import './SupplyRecord.css';
import 'date-fns';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root: {
        "& .MuiFormControl-root": {
            width: "90%",
            margin: theme.spacing(2),
        },
    },
}))


export default function SupplyRecordForm({ openPopupClick, handleAlertCreate }) {

    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const [supplier_name, setsupplier_name] = useState([]);
    const [supply_item, setsupply_item] = useState([]);

    const [date, setDate] = useState('');
    const [qty, setqty] = useState();
    const [bill_amount, setBill_amount] = useState();

    // file states
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [fileUploaded, setfileUploaded] = useState(false);


    const getAllSupplier = async () => {
        const data = await axios.get("/supplier")
        console.log(data.data.data);
        setsupplier_name(data.data.data);
    }

    const getAllSupplyItem = async () => {
        const data = await axios.get("/supply-item")
        console.log(data.data.data);
        setsupply_item(data.data.data);
    }

    useEffect(() => {
        getAllSupplier();
        getAllSupplyItem();
    }, []);

    const [supplierValue, setSupplierValue] = useState('');

    const selectedSupplier = (e) => {
        setSupplierValue(e.target.value);
    }

    const [itemValue, setItemValue] = useState('');
    const [itemName, setItemName] = useState('');

    const [total, setTotal] = useState();
    const [price, setprice] = useState();

    const selectedItem = (e) => {
        setItemValue(e.target.value);
        // console.log(e.target.value);
        axios.get(`/supply-item/${e.target.value}`)
            .then((res) => {
                console.log(res.data.data);
                setprice(res.data.data.unit_price);
                setItemName(res.data.data.item_name);
                
                const unit = res.data.data.unit_price;
                const tot = qty*unit;
                setTotal(tot);
            })
            .catch((error) => {
                console.log(error);
            })
    }


    async function addSupplyRecord(e) {
        e.preventDefault();

        if (fileUploaded) {
            let supplyRecord = {
                supplier_name: supplierValue,
                supply_item: itemName,
                date: date,
                qty: qty,
                unit_price: price,
                total_price: total,
                url: url
            }

            // console.log(supplyRecord);

            await axios.post("/supply-record", supplyRecord)
                .then((response) => {
                    console.log(response.data.data);
                    console.log("data added suessfully");
                    setfileUploaded(false);
                    openPopupClick();
                    handleAlertCreate();
                })
                .catch((error) => {
                    console.log(error);
                    alert('please fill all fields');
                });
        }
        else {
            alert('Please Upload image');
        }
    }

    function onFileSelect(e) {
        setFile(e.target.files[0]);
        uploadfile(e.target.files[0]);
    }

    async function uploadfile(image) {
        setOpen(!open);

        if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
            alert('Selecte an valid image type');
            setOpen(false);
        }
        else {
            let bucketName = "foodImages";
            let uploadTask = storage.ref(`${bucketName}/${image.name}`).put(image);

            console.log("File Name : " + image.name);

            await uploadTask.on(
                "state_changed",
                (snapshot) => {
                    console.log(snapshot);
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    storage.ref("foodImages").child(image.name).getDownloadURL()
                        .then((firebaseURl) => {
                            setUrl(firebaseURl);
                            console.log(firebaseURl);
                            setfileUploaded(true);
                            setOpen(false);
                        });
                }
            )
        }
    }

    return (

        <div>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
                {" "}Uploading....
            </Backdrop>

            <form className={classes.root}>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField variant="outlined" name="qty" label="Quantity"
                            value={qty} onChange={(e) => setqty(e.target.value)} 
                            />

                            <FormControl variant="outlined">

                            <InputLabel>Supply Item</InputLabel>
                            <MuiSelect
                                name="name"
                                label="Supply Item"
                                value={itemValue}
                                onChange={selectedItem} 
                                >

                                <MenuItem value="">None</MenuItem>
                                {supply_item.map((item) => (
                                    <MenuItem key={item._id} value={item._id}>
                                        {item.item_name}
                                    </MenuItem>))}
                            </MuiSelect>

                            </FormControl>

                        <TextField variant="outlined" name="qty" label="Bill Amount"
                            value={bill_amount} onChange={(e) => setBill_amount(e.target.value)} 
                            />

                        <TextField variant="outlined" name="total_price" label="Total Amount"
                            value={total || ''} 
                            contentEditable={false}
                            />

                        <TextField variant="outlined" name="unit_price" label="Unit Price"
                            value={price || ''} 
                            contentEditable={false}
                        />

                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined">

                            <InputLabel>Supply Name</InputLabel>
                            <MuiSelect
                                name="name"
                                label="Supply Item"
                                value={supplierValue}
                                onChange={selectedSupplier} 
                            >

                                <MenuItem value="">None</MenuItem>
                                {supplier_name.map((item) => (
                                    <MenuItem key={item._id} value={item.supplier_name}>
                                        {item.supplier_name}
                                    </MenuItem>))}
                            </MuiSelect>

                        </FormControl>

                        <input type="date" 
                            className="dateInput"
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                        />

                        <div style={{ position: "relative", width: "200px", height: "200px" }} >
                            <img
                                style={{ marginLeft: "120px", borderRadius: "10px" }}
                                width="180px"
                                height="150px"
                                src={url} />
                        </div>
                        <div className="fileInputBrowse">
                            <input type="file" id="formFile" onChange={onFileSelect} />
                        </div>

                        <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginRight: "20px", marginLeft: "100px" }}
                                onClick={addSupplyRecord}
                            >
                                Create
                            </Button>
                            <Button variant="contained" onClick={openPopupClick} color="secondary">
                                Cancel
                            </Button>

                        </div>
                    </Grid>
                </Grid>
            </form>

        </div>

    )
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { storage } from '../../firebase';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, TextField, makeStyles, FormControl, InputLabel, Select as MuiSelect, Button, MenuItem } from "@material-ui/core";
import './SupplyRecord.css';


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

    const [supplier_name, setsupplier_name] = useState('');
    const [supply_item, setsupply_item] = useState('');
    const [date, setdate] = useState('');
    const [qty, setqty] = useState('');
    const [unit_price, setunit_price] = useState('');
    const [total_price, settotal_price] = useState('');

    // file states
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [fileUploaded, setfileUploaded] = useState(false);


    const getAllSupplier = async () => {
        const data = await axios.get("/admin/supplier")
        console.log(data.data.data);
        setsupplier_name(data.data.data);
    }

    const getAllSupplyItem = async () => {
        const data = await axios.get("/admin/supply-item")
        console.log(data.data.data);
        setsupply_item(data.data.data);
    }

    useEffect(() => {
        getAllSupplier();
        getAllSupplyItem();
    }, []);

    const [supplier_nameValue, setsupplier_nameValue] = useState('');
    const [supply_itemValue, setsupply_itemValue] = useState('');

    const selectedSupplier_name = (e) => {
        setsupplier_nameValue(e.target.value);
    }

    const selectedSupply_item = (e) => {
        setsupplier_nameValue(e.target.value);
    }

    async function addSupplyRecord(e) {
        e.preventDefault();

        if (fileUploaded) {
            let supplyRecord = {
                supplier_name: supplier_name,
                supply_item: supply_item,
                date: date,
                qty: qty,
                unit_price: unit_price,
                total_price: total_price,
                url: url
            }

            console.log(supplyRecord);

            await axios.post("/supply-record", supplyRecord)
                .then((response) => {
                    console.log(response.data.data);
                    setfileUploaded(false);

                    const getId = response.data.data._id;

                    let newFoods = {
                        foodItems: [getId],
                    }

                    // axios.put(`/category/update-category/${categoryValue}`, newFoods)
                    //     .then((response) => {
                    //         console.log(response.data.data);
                    //         console.log('Updated Successfully');
                    //         openPopupClick();
                    //         // reloadForForms();
                    //         handleAlertCreate();
                    //     })
                    //     .catch((error) => {
                    //         console.log(error);
                    //     })
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
                        <div style={{ position: "relative", width: "200px", height: "200px" }} >
                            <img
                                style={{ marginLeft: "100px", borderRadius: "10px" }}
                                width="200px"
                                height="180px"
                                src={url} />
                        </div>
                        <div className="fileInputBrowse">
                            <input type="file" id="formFile" onChange={onFileSelect} />
                        </div>

                        <TextField variant="outlined" name="qty" label="Quantity"
                            value={qty} onChange={(e) => setqty(e.target.value)} />

                        <TextField variant="outlined" name="total_price" label="Bill Amount"
                            value={total_price} onChange={(e) => settotal_price(e.target.value)} />

                        <TextField variant="outlined" name="unit_price" label="Unit Price"
                            value={unit_price} onChange={(e) => setunit_price(e.target.value)} />

                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined">

                            <InputLabel>Supply Item</InputLabel>
                            <MuiSelect
                                name="name"
                                label="Supply Item"
                                value={supply_itemValue}
                                onChange={selectedSupply_item} >

                                <MenuItem value="">None</MenuItem>
                                {/* {supply_item.map((item) => (
                                    <MenuItem key={item.id} value={item._id}>
                                        {item.supply_item}
                                    </MenuItem>))} */}
                            </MuiSelect>

                            <InputLabel>Supplier</InputLabel>
                            <MuiSelect
                                name="name"
                                label="Supplier Name"
                                value={supplier_nameValue}
                                onChange={selectedSupplier_name} >

                                <MenuItem value="">None</MenuItem>
                                {/* {supplier_name.map((supplier) => (
                                    <MenuItem key={supplier.id} value={supplier._id}>
                                        {supplier.supplier_name}
                                    </MenuItem>))} */}
                            </MuiSelect>

                        </FormControl>



                        <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginRight: "20px", marginLeft: "20px" }}
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
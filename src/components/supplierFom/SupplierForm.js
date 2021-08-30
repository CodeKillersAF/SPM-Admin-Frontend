import React, { useEffect, useState } from "react";
import { Grid, TextField, makeStyles, Button, IconButton, } from "@material-ui/core";
import axios from "axios";
import Select from 'react-select';
import './supplierForm.css'

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFormControl-root": {
            width: "90%",
            margin: theme.spacing(2),
        },
    },
}));

export default function SupplierForm({
    supply,
    openEditPopup
}) {
    const [values, setValues] = useState(supply);

    const handleInputChnage = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    let allSupplyItemArray = [];
    supply.supplyItems.map((i, index) => {
        let allSupplyItem = {
            value: i._id,
            label: i.item_name
        }
        allSupplyItemArray.push(allSupplyItem);
    });

    const onUpdate = (e) => {
        e.preventDefault();
        axios
            .put("http://localhost:8000/api/admin/supplier/" + values._id, values)
            .then((res) => {
                openEditPopup();
            });
    };

    const classes = useStyles();

    return (
        <form className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        name="supplier_name"
                        label="Name"
                        value={values.supplier_name}
                        onChange={handleInputChnage}
                    />
                    <TextField
                        variant="outlined"
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChnage}
                    />
                    <TextField
                        variant="outlined"
                        name="contact"
                        label="Contact"
                        value={values.contact}
                        onChange={handleInputChnage}
                    />
                    <TextField
                        variant="outlined"
                        name="address"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChnage}
                    />
                    {/* <TextField
                        id="outlined-textarea"
                        label="Items"
                        placeholder="Items"
                        multiline
                        variant="outlined"
                        maxRows={8}
                        minRows={8}
                        name="supplyItems"
                        value={values.supplyItems}
                        onChange={handleInputChnage}
                    /> */}
                    <Select
                        className="basic-single"
                        // options={allSupplyItemArray}
                        // onChange={selectedSupplyItem}
                        defaultValue={allSupplyItemArray}
                        isMulti
                        required
                    />
                    <div
                        style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginRight: "20px", marginLeft: "330px" }}
                            type="submit"
                            onClick={onUpdate}
                        >
                            Update
                        </Button>
                        <Button variant="contained" color="secondary">
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

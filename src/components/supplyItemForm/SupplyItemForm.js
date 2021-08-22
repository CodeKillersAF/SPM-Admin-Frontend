import React, { useEffect, useState } from "react";
import { Grid, TextField, makeStyles, Button, IconButton, } from "@material-ui/core";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFormControl-root": {
            width: "90%",
            margin: theme.spacing(2),
        },
    },
}));

export default function SupplyItemForm({
    supply,
    openEditPopup
}) {
    const [values, setValues] = useState(supply);

    const handleInputChnage = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const onUpdate = (e) => {
        e.preventDefault();
        axios
            .put("http://localhost:8000/api/admin/supply-item/" + values._id, values)
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
                        name="item_name"
                        label="Name"
                        value={values.item_name}
                        onChange={handleInputChnage}
                    />
                    <TextField
                        variant="outlined"
                        name="unit_price"
                        label="Unit Price"
                        value={values.unit_price}
                        onChange={handleInputChnage}
                    />
                    <TextField
                        id="outlined-textarea"
                        label="Description"
                        placeholder="Description"
                        multiline
                        variant="outlined"
                        maxRows={8}
                        minRows={8}
                        name="desc"
                        value={values.desc}
                        onChange={handleInputChnage}
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

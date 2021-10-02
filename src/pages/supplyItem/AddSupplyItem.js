import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "./supplyItem.css";
import SnackbarFeddback from '../../components/snackbarFeedback/SnackbarFeedback';

export default function AddSupplyItem() {

    const history = useHistory();
    const [item_name, setitem_name] = useState("");
    const [unit_price, setunit_price] = useState("");
    const [desc, setdesc] = useState("");
    // For alert box
    const [addedSuccess, setaddedSuccess] = useState(false);

    function delay() {
        setTimeout(onClickBack, 1000);
    }
    const onClickBack = () => {
        history.push("/supplyItem")
    }

    // For alert box
    const handleEditClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setaddedSuccess(false);
    };

    async function addItem(e) {
        e.preventDefault();

        let suupplyItem = {
            item_name: item_name,
            unit_price: unit_price,
            desc: desc
        };
        console.log(suupplyItem);

        await axios
            .post("/supply-item", suupplyItem)
            .then((response) => {
                console.log(response.data);
                // alert("Supply item added successfully")
                setaddedSuccess(true);//For alert
                delay();
            })
            .catch((error) => {
                console.log(error);
            });

    }
    return (
        <div className="addNewTable">
            <div className="addNewTable-wrapper">
                <h1>New Supply Item</h1>
                <form onSubmit={addItem} className="addTableForm">

                    <div className="addTableItem">
                        <label htmlFor="item_name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="item_name"
                            name="item_name"
                            placeholder="Name of item"
                            value={item_name}
                            onChange={(e) => setitem_name(e.target.value)}
                            required
                        />
                    </div>

                    <div className="addTableItem">
                        <label htmlFor="unit_price" className="form-label">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="unit_price"
                            name="unit_price"
                            pattern='[0-9]+(\\.[0-9][0-9]?)?'
                            placeholder="Unit price per quantity"
                            value={unit_price}
                            onChange={(e) => setunit_price(e.target.value)}
                            required
                        />
                    </div>

                    <div className="addTableItem">
                        <label htmlFor="desc" className="form-label">Description</label>
                        {/* <input
                            type="text"
                            className="form-control"
                            id="desc"
                            name="desc"
                            value={desc}
                            onChange={(e) => setdesc(e.target.value)}
                            required
                        /> */}
                        <textarea
                            className="form-control"
                            name="desc"
                            cols="40"
                            rows="5"
                            placeholder="Description of supply item "
                            value={desc}
                            onChange={(e) => setdesc(e.target.value)}
                            required>
                        </textarea>
                    </div>
                    <br />
                    <div className="addTableItem">
                        <button type="submit" className="addTableButton">Submit</button>
                    </div>
                    {/* For alert  */}
                    <div className="addTableItem">
                        <SnackbarFeddback
                            open={addedSuccess}
                            message="Supply Item successfully added!"
                            onClose={handleEditClose}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

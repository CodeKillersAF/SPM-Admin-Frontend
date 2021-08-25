import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "./supplyItem.css";

export default function AddSupplyItem() {

    const history = useHistory();
    const [item_name, setitem_name] = useState("");
    const [unit_price, setunit_price] = useState("");
    const [desc, setdesc] = useState("");

    const onClickBack = () => {
        history.push("/supplyItem")
    }

    async function addItem(e) {
        e.preventDefault();

        let suupplyItem = {
            item_name: item_name,
            unit_price: unit_price,
            desc: desc
        };
        console.log(suupplyItem);

        await axios
            .post("http://localhost:8000/api/admin/supply-item", suupplyItem)
            .then((response) => {
                console.log(response.data);
                alert("Supply item added successfully")
                onClickBack();
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
                            type="text"
                            className="form-control"
                            id="unit_price"
                            name="unit_price"
                            placeholder="Unit price"
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
                            onChange={(e) => setdesc(e.target.value)}>
                        </textarea>
                    </div>
                    <br />
                    <div className="addTableItem">
                        <button type="submit" className="addTableButton">Submit</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

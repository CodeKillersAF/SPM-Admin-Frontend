import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "./supplyItem.css";

export default function AddSupplyItem() {

    const history = useHistory();
    const [item_name, setitem_name] = useState("");
    const [unit_price, setunit_price] = useState("");
    const [desc, setdesc] = useState("");


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
            })
            .catch((error) => {
                console.log(error);
            });

    }
    return (
        <div className="addNewTable">
            <div className="addNewTable-wrapper">
                <form onSubmit={addItem} className="addTableForm">

                    <div className="addTableItem">
                        <label htmlFor="item_name" className="form-label">Item Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="item_name"
                            name="item_name"
                            value={item_name}
                            onChange={(e) => setitem_name(e.target.value)}
                            required
                        />
                    </div>

                    <div className="addTableItem">
                        <label htmlFor="unit_price" className="form-label">Unit Price</label>
                        <input
                            type="text"
                            className="form-control"
                            id="unit_price"
                            name="unit_price"
                            value={unit_price}
                            onChange={(e) => setunit_price(e.target.value)}
                            required
                        />
                    </div>

                    <div className="addTableItem">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="desc"
                            name="desc"
                            value={desc}
                            onChange={(e) => setdesc(e.target.value)}
                            required
                        />
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

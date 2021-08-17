import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';

export default function AddSupplyItem() {

    const history = useHistory();
    const [item_name, setitem_name] = useState("");
    const [unit_price, setunit_price] = useState("");

    async function addItem(e) {
        e.preventDefault();

        let keynote = {
            item_name: item_name,
            unit_price: unit_price
        };
        console.log(keynote);

        await axios
            .post("http://localhost:8000/api/admin/supply-item", keynote)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }
    return (
        <div className="container">
            <form onSubmit={addItem}>

                <div className="mb-3">
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

                <div className="mb-3">
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
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>

            </form>

        </div>
    )
}

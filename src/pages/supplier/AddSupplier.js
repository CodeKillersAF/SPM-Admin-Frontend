import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import "./supplier.css";
import { useHistory } from "react-router-dom";


export default function AddSupplier() {

    const [supplier_name, setsupplier_name] = useState("");
    const [email, setemail] = useState("");
    const [contact, setcontact] = useState("");
    const [address, setaddress] = useState("");
    const [supplyItems, setsupplyItems] = useState([]);

    const history = useHistory();
    const onClickBack = () => {
        history.push("/supplier")
    }


    const getAllSupplyItem = async () => {
        const data = await axios.get("http://localhost:8000/api/admin/supply-item")
        console.log(data.data.data);
        setsupplyItems(data.data.data);
    }

    useEffect(() => {
        getAllSupplyItem();
    }, []);

    let allSupplyItemArray = [];
    supplyItems.map((i, index) => {
        let allSupplyItem = {
            value: i._id,
            label: i.item_name
        }
        allSupplyItemArray.push(allSupplyItem);
    });

    const [supplyItemValue, setSupplyItemValue] = useState();

    const selectedSupplyItem = (e) => {
        setSupplyItemValue(Array.isArray(e) ? e.map(item => item.value) : []);
    }

    async function addItem(e) {
        e.preventDefault();

        let supplier = {
            supplier_name: supplier_name,
            email: email,
            contact: contact,
            address: address,
            supplyItems: supplyItemValue
        };
        console.log(supplier);

        await axios
            .post("http://localhost:8000/api/admin/supplier", supplier)
            .then((response) => {
                console.log(response.data);
                alert("Supplier detail added successfully");
                onClickBack();

            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <div className="addNewTable">
            <div className="addNewTable-wrapper">
                <h1>New Supplier</h1>
                <form onSubmit={addItem} className="addTableForm">

                    <div className="addTableItem">
                        <label htmlFor="supplier_name" className="form-label">Supplier Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="supplier_name"
                            name="supplier_name"
                            placeholder="Enter the name of the supplier"
                            value={supplier_name}
                            onChange={(e) => setsupplier_name(e.target.value)}
                            required
                        />
                    </div>

                    <div className="addTableItem">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter a valid email address"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="addTableItem">
                        <label htmlFor="contact" className="form-label">Contact</label>
                        <input
                            type="text"
                            className="form-control"
                            id="contact"
                            name="contact"
                            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                            placeholder="Enter a valid phone number"
                            value={contact}
                            onChange={(e) => setcontact(e.target.value)}
                            required
                        />
                    </div>
                    <div className="addTableItem">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            placeholder="Permanent address of the supplier"
                            value={address}
                            onChange={(e) => setaddress(e.target.value)}
                            required
                        />
                    </div>
                    <br />
                    <div className="addTableItem">
                        <label htmlFor="item" className="form-label">Item</label>
                        <Select
                            className="basic-single"
                            options={allSupplyItemArray}
                            onChange={selectedSupplyItem}
                            isMulti
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

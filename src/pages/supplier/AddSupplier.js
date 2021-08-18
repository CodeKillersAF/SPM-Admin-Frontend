import React from 'react';;
import Select from 'react-select'

export default function AddSupplier() {

    const [supplier_name, setsupplier_name] = useState("");
    const [email, setemail] = useState("");
    const [contact, setcontact] = useState("");
    const [address, setaddress] = useState("");
    const [supplyItems, setsupplyItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);


    async function addItem(e) {
        e.preventDefault();

        let supplier = {
            supplier_name: supplier_name,
            email: email,
            contact: contact,
            address: address,
            supplyItems: supplyItems
        };
        console.log(supplier);

        await axios
            .post("http://localhost:8000/api/admin/supply-item", supplier)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    function handleSelectChange(event) {
        setSelectedItem(event.target.value);
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
                <Select value={selectedItem} onChange={handleSelectChange}>
                    <option value="one">One</option>
                    <option value="two">Two</option>
                    <option value="three">Three</option>
                </Select>
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>

            </form>

        </div>

    )
}

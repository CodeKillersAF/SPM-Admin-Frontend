import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "../../components/popup/Popup";
import TableForm from "../../components/tableForm/TableForm";
import ViewDetailsBody from "../../components/viewDetailsBody/ViewDetailsBody";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";
import Button from "@material-ui/core/Button";

const columns = [
    // { field: "_id", headerName: "ID", width: 160 },
    {
        field: "supplier_name",
        headerName: "Name",
        width: 150,
        editable: true,
    },
    {
        field: "email",
        headerName: "Email",
        width: 150,
        editable: true,
    },
    {
        field: "contact",
        headerName: "Contact",
        width: 150,
        editable: true,
    },
    {
        field: "address",
        headerName: "Address",
        width: 150,
        editable: true,
    },
    // {
    //     field: "supplyItems:{item_name}",
    //     headerName: "Items",
    //     width: 150,
    //     editable: true,
    // },
];

export default function ViewSupplier() {
    const [supplier, setsupplier] = useState([]);

    useEffect(() => {
        getSupplier();
    }, []);

    const getSupplier = () => {
        axios.get("http://localhost:8000/api/admin/supplier").then((res) => {
            setsupplier(res.data.data);
            console.log(res.data.data);
        });
    };
    return (
        <div className="viewTable">
            <ViewDetailsBody columns={columns} rows={supplier} />
        </div>
    );
}


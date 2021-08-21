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
        editable: false,
    },
    {
        field: "email",
        headerName: "Email",
        width: 150,
        editable: false,
    },
    {
        field: "contact",
        headerName: "Contact",
        width: 150,
        editable: false,
    },
    {
        field: "address",
        headerName: "Address",
        width: 150,
        editable: false,
    },
    {
        field: "action",
        headerName: "Action",
        width: 200,
        editable: true,
        renderCell: (params) => {
            return (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Edit />}
                        style={{ marginLeft: "20px", marginRight: "30px" }}
                    >
                        Edit
                    </Button>
                    <DeleteIcon color="secondary" />
                </>
            );
        },
    },
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


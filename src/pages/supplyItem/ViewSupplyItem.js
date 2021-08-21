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
        field: "item_name",
        headerName: "Name",
        width: 150,
        editable: true,
    },
    {
        field: "unit_price",
        headerName: "Unit Price",
        width: 150,
        editable: true,
    },
    {
        field: "desc",
        headerName: "Description",
        width: 150,
        editable: true,
    },
    // {
    //     field: "action",
    //     headerName: "Action",
    //     width: 200,
    //     editable: true,
    //     renderCell: (params) => {
    //         return (
    //             <>
    //                 <Button
    //                     variant="contained"
    //                     color="primary"
    //                     startIcon={<Edit />}
    //                     style={{ marginLeft: "20px", marginRight: "30px" }}
    //                 >
    //                     Edit
    //                 </Button>
    //                 <DeleteIcon color="secondary" />
    //             </>
    //         );
    //     },
    // },
];

export default function ViewSupplyItem() {
    const [supplyItem, setsupplyItem] = useState([]);

    useEffect(() => {
        getSupplyDetails();
    }, []);

    const getSupplyDetails = () => {
        axios.get("http://localhost:8000/api/admin/supply-item").then((res) => {
            setsupplyItem(res.data.data);
            console.log(res.data.data);
        });
    };
    return (
        <div className="viewTable">
            <ViewDetailsBody columns={columns} rows={supplyItem} />
            {/* <Popup openPopup={true} title="Add new table" form={<TableForm />} /> */}
        </div>
    );
}


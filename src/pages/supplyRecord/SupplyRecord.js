import React, { useEffect, useState } from "react";
import axios from 'axios';
import ViewDetailsBody from "../../components/viewDetailsBody/ViewDetailsBody";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Popup from "../../components/popup/Popup";
import SupplyRecordForm from "../../components/supplyRecordForm/SupplyRecordForm";


export default function SupplyRecord() {

    const [offer, setoffer] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);

    const getAllSupplyRecords = () => {
        axios.get("http://localhost:8000/api/admin/supply-record").then((res) => {
            setoffer(res.data.data);
            console.log(res.data.data);
        });
    };

    useEffect(() => {
        getAllSupplyRecords();
    });


    const openPopupClick = () => {
        setOpenPopup(false);
    }

    const onClickCreate = (e) => {
        setOpenPopup(true);
    };



    const columns = [
        {
            field: "url",
            headerName: "Image",
            width: 150,
            editable: false,
            renderCell: (params) => {
                return (
                    <img
                        src={params.row.url}
                        alt="image"
                        style={{ width: "80px", height: "40px" }}
                    />
                );
            },
        },
        {
            field: "supply_item",
            headerName: "Name",
            width: 150,
            editable: false,
        },
        {
            field: "unit_price",
            headerName: "Unit Price",
            width: 150,
            editable: false,
        },
        {
            field: "qty",
            headerName: "Quantity",
            width: 150,
            editable: false,
        },
        {
            field: "total_price",
            headerName: "Bill Amount",
            width: 150,
            editable: false,
        },
        {
            field: "supplier_name",
            headerName: "Supplier Name",
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
                        // onClick={() => handleEditOpen(params.row)}
                        >
                            Edit

                        </Button>
                        <DeleteIcon
                            // onClick={() => handleClickOpen(params.row._id)}
                            // onClick={getOneCate}
                            color="secondary" />
                    </>
                );
            },
        },
    ];

    return (
        <div>

            <div className="viewTable">
                <ViewDetailsBody columns={columns} rows={offer}
                    onClickCreate={onClickCreate}
                />
                <Popup
                    openPopup={openPopup}
                    title="Add new Promotion"
                    form={<SupplyRecordForm title="Add Promotion"
                        openPopupClick={openPopupClick}
                    // handleAlertCreate={handleAlertCreate}
                    />}
                />
            </div>

        </div>
    )


}
import React, { useEffect, useState } from "react";
import axios from 'axios';
import ViewDetailsBody from "../../components/viewDetailsBody/ViewDetailsBody";
// import DeleteIcon from "@material-ui/icons/Delete";
// import { Edit } from "@material-ui/icons";
// import Button from "@material-ui/core/Button";
import Popup from "../../components/popup/Popup";
import SupplyRecordForm from "../../components/supplyRecordForm/SupplyRecordForm";
import SnackbarFeddback from '../../components/snackbarFeedback/SnackbarFeedback';



export default function SupplyRecord() {

    const [offer, setoffer] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [reload, setReload] = useState();

    const [addedCreateSuccess, setaddedCreateSuccess] = useState(false);

    const handleAlertCreate = () => {
        setaddedCreateSuccess(true);
      }
  
      const handleCreateClose = () => {
        setaddedCreateSuccess(false);
      }

    const getAllSupplyRecords = () => {
        axios.get("/supply-record").then((res) => {
            setoffer(res.data.data);
            setReload(res.data.data);
            // console.log(res.data.data);
        });
    };

    useEffect(() => {
        getAllSupplyRecords();
    }, [reload]);


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
        
    ];

    return (
        <div>

            <div className="viewTable">
                <ViewDetailsBody columns={columns} rows={offer}
                    onClickCreate={onClickCreate}
                />
                <Popup
                    openPopup={openPopup}
                    title="Add new Supplier Record"
                    form={<SupplyRecordForm title="Add Promotion"
                        openPopupClick={openPopupClick}
                        handleAlertCreate={handleAlertCreate}
                    />}
                />

                <SnackbarFeddback
                    open={addedCreateSuccess}
                    message="Record successfully added!"
                    onClose={handleCreateClose}
                />
            </div>

        </div>
    )


}
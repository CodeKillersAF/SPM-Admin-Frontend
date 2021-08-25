import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "../../components/popup/Popup";
import ViewDetailsBody from "../../components/viewDetailsBody/ViewDetailsBody";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import DialogBoxConfirm from "../../components/dialogBoxConfirm/DialogBoxConfirm";
import SupplyItemForm from "../../components/supplyItemForm/SupplyItemForm";


export default function ViewSupplyItem() {

    const [supplyItem, setsupplyItem] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [tableID, setTableID] = useState("");

    const [reload, setReload] = useState(false)
    // const [openPopup, setOpenPopup] = useState(false);

    const openEditPopup = () => {
        setopenForm(false);
    }

    useEffect(() => {
        getSupplyDetails();
    }, [setOpen, reload]);

    const getSupplyDetails = () => {
        axios.get("http://localhost:8000/api/admin/supply-item").then((res) => {
            setsupplyItem(res.data.data);
            console.log(res.data.data);
        });
    };

    const history = useHistory()
    const onClickCreate = () => {
        history.push("/addsupplyItem")
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = (tableID) => {
        setTableID(tableID);
        setOpen(true);
    };

    const [openForm, setopenForm] = useState(false);
    const [selectSupplyItem, setselectSupplyItem] = useState([]);

    const handleOpenEditForm = (supplyItem) => {
        setopenForm(true);
        setselectSupplyItem(supplyItem);
    }

    const onClickDelete = () => {
        console.log(tableID);
        axios
            .delete("http://localhost:8000/api/admin/supply-item/" + tableID)
            .then((res) => {
                console.log("deleted");
                setOpen(false);
                setReload(!reload)
            });
    };

    const columns = [
        // { field: "_id", headerName: "ID", width: 160 },
        {
            field: "item_name",
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
            field: "desc",
            headerName: "Description",
            width: 150,
            editable: false,
        },
        {
            field: "action",
            headerName: "Action",
            width: 200,
            editable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Edit />}
                            style={{ marginLeft: "20px", marginRight: "30px" }}
                            onClick={() => handleOpenEditForm(params.row)}
                        >
                            Edit
                        </Button>
                        <IconButton onClick={() => handleClickOpen(params.row._id)}>
                            <DeleteIcon color="secondary" />
                        </IconButton>
                    </>
                );
            },
        },
    ];



    return (
        <div className="viewTable">
            <ViewDetailsBody columns={columns} rows={supplyItem} onClickCreate={onClickCreate} />
            <DialogBoxConfirm
                open={open}
                handleClose={handleClose}
                handleClickOpen={handleClickOpen}
                onClickDelete={onClickDelete}
            />
            <Popup
                openPopup={openForm}
                title="Update Supply Item"
                form={
                    <SupplyItemForm supply={selectSupplyItem} buttonTitle="Update" openEditPopup={openEditPopup} />
                }
            />
        </div>
    );



}

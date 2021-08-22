import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "../../components/popup/Popup";
import TableForm from "../../components/tableForm/TableForm";
import ViewDetailsBody from "../../components/viewDetailsBody/ViewDetailsBody";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DialogBoxConfirm from "../../components/dialogBoxConfirm/DialogBoxConfirm";
import SupplierForm from "../../components/supplierFom/SupplierForm";

export default function ViewSupplier() {

    const [supplier, setsupplier] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [tableID, setTableID] = useState("");

    const openEditPopup = () => {
        setopenForm(false);
    }

    useEffect(() => {
        getSupplier();
    }, [setOpen]);

    const getSupplier = () => {
        axios.get("http://localhost:8000/api/admin/supplier").then((res) => {
            setsupplier(res.data.data);
            console.log(res.data.data);
        });
    };

    const history = useHistory()
    const onClickCreate = () => {
        history.push("/addsupplier")
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = (tableID) => {
        setTableID(tableID);
        setOpen(true);
    };

    const onClickDelete = () => {
        console.log(tableID);
        axios
            .delete("http://localhost:8000/api/admin/supplier/" + tableID)
            .then((res) => {
                console.log("deleted");
                setOpen(false);
            });
    };

    const [openForm, setopenForm] = useState(false);
    const [selectSupplyItem, setselectSupplyItem] = useState([]);

    const handleOpenEditForm = (supplyItem) => {
        setopenForm(true);
        setselectSupplyItem(supplyItem);
    }

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
            <ViewDetailsBody columns={columns} rows={supplier} onClickCreate={onClickCreate} />
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
                    <SupplierForm supply={selectSupplyItem} buttonTitle="Update" openEditPopup={openEditPopup} />
                }
            />
        </div>
    );
}

